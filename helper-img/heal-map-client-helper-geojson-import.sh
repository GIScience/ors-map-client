#!/bin/bash
# ORS heal-map-client-helper-geojson-import
########################################################################################################################
# Utility functions for colored output
# Success message in green.
function success() {
  echo -e "\e[32m✓ $1\e[0m"
  return 0
}
# Error message in red.
function error() {
  echo -e "\e[31m✗ $1\e[0m"
  return 0
}
########################################################################################################################
if [ -z "$HEAL_URL" ] || [ -z "$HEAL_KEY_ID" ] || [ -z "$HEAL_ACCESS_KEY" ] || [ -z "$HEAL_PREFIX" ] || [ -z "$HEAL_BUCKET" ]; then
  error "Required environment variables for HEAL S3 access not set."
  exit 1
fi


echo "Preparing S3 access for heal bucket..."
rclone config create heal s3 --non-interactive --quiet \
  provider=Minio \
  access_key_id="$HEAL_KEY_ID" \
  secret_access_key="$HEAL_ACCESS_KEY" \
  endpoint="$HEAL_URL" \
  acl=private
if [ $? -ne 0 ]; then
  error "Failed to set S3 alias for heal bucket."
  exit 1
else
  success "S3 alias for heal bucket set successfully."
fi

echo "Listing HEAL solar index CSV files..."
# List all CSVs under the solar_index directory structure and capture their paths
csv_paths=$(rclone lsf heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/output/solar_index/ \
  --recursive \
  --files-only \
  --include "*.csv")

if [ $? -ne 0 ] || [ -z "$csv_paths" ]; then
  error "Failed to list HEAL CSV files or no CSV files found."
  exit 1
else
  success "Successfully retrieved CSV file list."
fi

echo "Downloading corresponding GeoJSON files..."
mkdir -p aois
failed=0

while IFS= read -r csv_rel_path; do
  # csv_rel_path is relative to the solar_index/ prefix, e.g. {state}/{city}/solar_index/file.csv
  # Extract state and city from the path structure: {state}/{city}/solar_index/...
  state=$(echo "$csv_rel_path" | cut -d'/' -f1)
  city=$(echo "$csv_rel_path"  | cut -d'/' -f2)

  if [ -z "$state" ] || [ -z "$city" ]; then
    error "Could not parse state/city from path: $csv_rel_path — skipping."
    failed=$((failed + 1))
    continue
  fi

  geojson_remote="output/aois/${state}/${city}.geojson"
  geojson_local="./aois/${state}/${city}.geojson"

  echo "  Downloading aois/${state}/${city}.geojson..."
  rclone copyto heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/"$geojson_remote" "$geojson_local" --quiet
  if [ $? -ne 0 ]; then
    error "Failed to download GeoJSON for ${state}/${city}."
    failed=$((failed + 1))
  else
    success "Downloaded GeoJSON for ${state}/${city}."
  fi
done <<< "$csv_paths"

if [ $failed -gt 0 ]; then
  error "$failed GeoJSON download(s) failed."
  exit 1
fi

success "HEAL GeoJSON import completed successfully."
