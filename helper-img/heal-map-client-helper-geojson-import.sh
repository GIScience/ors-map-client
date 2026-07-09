#!/bin/bash
# ORS heal-map-client-helper-geojson-import
########################################################################################################################
rclone config create heal s3 --non-interactive --quiet  \
  provider=Minio \
  access_key_id="$HEAL_KEY_ID" \
  secret_access_key="$HEAL_ACCESS_KEY" \
  endpoint="$HEAL_URL" \
  acl=private

echo "Downloading countries.json..."
rclone copyto heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/output/countries.json ./aois/countries.json --quiet

########################################################################################################################
echo "Downloading corresponding GeoJSON files..."
mkdir -p aois
while IFS= read -r country; do
  while IFS= read -r state; do
    while IFS= read -r city; do
      echo "  Downloading /aois/${country}/${state}/${city}.geojson..."
      rclone copyto \
        heal:/"$HEAL_BUCKET"/"$HEAL_PREFIX"/output/aois/"${country}"/"${state}"/"${city}".geojson \
        ./aois/"${country}"/"${state}"/"${city}".geojson --quiet
    done < <(jq -r --arg c "$country" --arg s "$state" '.[$c][$s][]' ./aois/countries.json)
  done < <(jq -r --arg c "$country" '.[$c] | keys[]' ./aois/countries.json)
done < <(jq -r 'keys[]' ./aois/countries.json)

find ./aois

echo "HEAL GeoJSON import completed successfully."
