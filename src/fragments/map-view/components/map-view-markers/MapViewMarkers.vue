<template>
  <div>
    <v-marker-cluster v-if="supportsClusteredMarkers" :options="markersClusterOptions" ref="markerClusterRef">
      <div v-for="(marker, index) in localMarkers" :key="index+'-marker'">
        <l-marker v-if="show(index, true)" @click="markerClicked(index, marker, $event)" @move="markerMoved"
          :draggable="markerIsDraggable" :lat-lng="marker.position" :icon="marker.icon">
          <l-popup v-if="showMarkerPopup">
            <div :ref="'markerPopupContainer' + index">
              {{marker.label}}
              <div style="width:100%;height:1px"></div>
              <v-btn outline small fab v-if="markerIsRemovable" :title="$t('mapView.removePlace')"
                @click="removePlace(marker, index)">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn outline small fab v-if="directIsAvailable(index)" :title="$t('mapView.toggleDirect')"
                @click="markAsDirectFromHere(index)">
                <v-icon :color="marker.place.direct? 'primary' : 'dark'">settings_ethernet</v-icon>
              </v-btn>
            </div>
          </l-popup>
        </l-marker>
      </div>
    </v-marker-cluster>
    <div v-for="(marker, index) in localMarkers" :key="index+'-marker'">
      <l-marker v-if="show(index, false)" @click="markerClicked(index, marker, $event)" @move="markerMoved"
        :draggable="markerIsDraggable" :lat-lng="marker.position" :icon="marker.icon">
        <l-popup v-if="showMarkerPopup">
          <div :ref="'markerPopupContainer' + index">
            {{marker.label}}
            <template v-if="modeIsOptimization">
              <div style="width: 100%; height: auto" v-for="(j, i) in marker.job" :key="i">
                <div v-if="['amount','service','skills','time_window','amount'].includes(i)">
                  <v-chip v-if="j && j.length && i !== 'skills'">{{i}}: {{j}}</v-chip>
                  <v-chip v-if="j && j.length && i === 'skills'">{{i}}: {{ skillIds(j) }}</v-chip>
                </div>
              </div>
              <div style="width: 100%; height: auto" v-for="(v, i) in marker.vehicle" :key="i">
                <div v-if="['amount','service','skills','time_window','profile','capacity', 'description'].includes(i)">
                  <v-chip v-if="v && v.length && i !== 'skills'">{{i}}: {{v}}</v-chip>
                  <v-chip v-if="v && v.length && i === 'skills'">{{i}}: {{ skillIds(v) }}</v-chip>
                </div>
              </div>
            </template>
            <div style="width:100%;height:1px"></div>
            <v-btn outline small fab v-if="markerIsRemovable" :title="$t('mapView.removePlace')"
              @click="removePlace(index)">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn outline small fab v-if="modeIsOptimization" :title="$t('mapView.editDetails')"
                   @click="editPlace(index)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn outline small fab v-if="directIsAvailable(index)" :title="$t('mapView.toggleDirect')"
              @click="markAsDirectFromHere(index)">
              <v-icon :color="marker.place.direct? 'primary' : 'dark'">settings_ethernet</v-icon>
            </v-btn>
          </div>
        </l-popup>
      </l-marker>
    </div>
  </div>
</template>

<script src="./map-view-markers.js"></script>
