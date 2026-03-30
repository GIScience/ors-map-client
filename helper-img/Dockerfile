FROM rclone/rclone:sha-233fef5

RUN apk update && apk add bash~=5.3.3-r1 curl~=8.17.0-r1 jq~=1.8.1-r0

WORKDIR '/home/heal'

COPY heal-map-client-helper-geojson-import.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
