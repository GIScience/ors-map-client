#!/bin/bash
# ORS heal-map-client-helper-geojson-import
########################################################################################################################
rclone config create heal s3 --non-interactive --quiet \
  provider=Minio \
  access_key_id="$HEAL_KEY_ID" \
  secret_access_key="$HEAL_ACCESS_KEY" \
  endpoint="$HEAL_URL" \
  acl=private

echo "Downloading index.json..."
rclone copyto heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/output/index.json ./aois/index.json --quiet

########################################################################################################################
echo "Downloading corresponding GeoJSON files..."
mkdir -p aois

while IFS= read -r state; do
  while IFS= read -r city; do
    echo "  Downloading germany/aois/${state}/${city}.geojson..."
    rclone copyto \
      heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/output/aois/germany/"${state}"/"${city}".geojson \
      ./aois/"${state}"/"${city}".geojson --quiet
  done < <(jq -r --arg s "$state" '.[$s][]' ./aois/index.json)
done < <(jq -r 'keys[]' ./aois/index.json)

find ./aois

echo "HEAL GeoJSON import completed successfully."
