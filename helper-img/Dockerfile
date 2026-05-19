FROM rclone/rclone

RUN apk update && apk add bash curl jq

WORKDIR '/home/heal'

COPY --chmod=755 heal-map-client-helper-geojson-import.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
