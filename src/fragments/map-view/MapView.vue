<template>
  <div>
    <v-alert :value="info" outline type="info" style="color:white" >{{ info }}</v-alert>
    <l-map
      id="map-view"
      ref="map"
      class="map-view"
      :class="{'low-resolution': $lowResolution, 'extra-low-resolution': $xlResolution}"
      @click.right="mapRightClick"
      @zoomend="zoomed"
      @baselayerchange="baseLayerChanged"
      @click.exact="mapLeftClick"
      @dragend="mapMoved"
      :max-zoom="maxZoom"
      :center="mapCenter"
      :zoom="zoom"
      :options="mapOptions"
      :style="{height: mapHeight + 'px'}">

      <l-control-polyline-measure v-if="showControls" :options="polylineMeasureOptions"/>

      <!--- draw tool bar is added programatically via ors-map.js setAvoidPolygonDrawingTool method --->
      <!-- <l-draw-toolbar :options="drawingOptions" position="topright"/> -->

      <l-marker v-for="(marker, index) in markers"
        @click="markerClicked(marker.place, $event)"
        @move="markerMove" :draggable="markerIsDraggable"
        :lat-lng="marker.position"
        :key="index+'-marker'"
        :icon="marker.icon">
        <l-popup v-if="showMarkerPopup">
          <div >{{marker.label}}</div>
        </l-popup>
      </l-marker>

      <template v-if="polygons">
        <l-polygon v-for="(polygon, index) in polygons"
          :key="index+'-polygon'"
          :lat-lngs="polygon.latlngs"
          :fillColor="polygon.color"
          :color="polygon.color">
          <l-popup v-if="polygon.label">
            <div >
              {{polygon.label}}
            </div>
          </l-popup>
        </l-polygon>
      </template>

      <l-circle-marker v-if="circleMarker" :weight="2" color="#1D1D1E" :fill="true" fillColor="#fff" :fillOpacity="0.9"
        :lat-lng="circleMarker.center"
        :radius="circleMarker.radius"/>

       <l-circle-marker v-if="highlightedRoutePoint" :weight="2" color="#000" :fill="true" fillColor="#fff" :fillOpacity="0.9"
        :lat-lng="highlightedRoutePoint"
        :radius="5">
        </l-circle-marker>

      <l-circle-marker v-if="myPositionMarker" :weight="2" color="#1D1D1E" :fill="true" fillColor="#1C97F3" :fillOpacity="myPositionMarker.opacity"
        :lat-lng="myPositionMarker.center"
        :radius="myPositionMarker.radius">
        <l-popup>
          <div>
            {{$t('mapView.yourCurrentLocation')}} <br>
            {{$t('mapView.accuracy')}}:
            {{myPositionMarker.accuracy.toFixed(1)}} {{$t('global.units.m')}}
          </div>
        </l-popup>
      </l-circle-marker>


      <template  v-for="(routePolyline, index) in alternativeRoutesData">
        <template v-if="index !== $store.getters.activeRouteIndex">
          <!-- background polyline to create a white outline -->
          <l-polyline :key="index + '_bg'" :lat-lngs="routePolyline" :weight="11" color="#fff"></l-polyline>

          <l-polyline @click="setActiveRouteIndex(index, $event)" :key="index"  :lat-lngs="routePolyline" :weight="7" :color="alternativeRouteColor">
            <l-tooltip @click="setActiveRouteIndex(index, $event)" :content="routeToolTip(index)"></l-tooltip>
          </l-polyline>
        </template>
      </template>

       <template v-if="activeRouteData && showActiveRouteData">
        <!-- background polyline to create a white outline -->
        <l-polyline :lat-lngs="activeRouteData" :weight="11" color="#fff"></l-polyline>

        <l-polyline :lat-lngs="activeRouteData" :weight="7" :color="mainRouteColor">
          <l-tooltip :content="routeToolTip($store.getters.activeRouteIndex)"></l-tooltip>
        </l-polyline>
      </template>

      <!-- highlight extra info polyline -->
      <extra-info-highlight @closed="extraInfo = null" @beforeOpen="isAltitudeModalOpen = false" v-if="extraInfo" :extra-info="extraInfo" :polyline-data="activeRouteData"></extra-info-highlight>

      <altitude-info v-if="isAltitudeModalOpen" @beforeOpen="extraInfo = null" @close="isAltitudeModalOpen = false" :map-view-data="localMapViewData" ></altitude-info>

      <l-control-layers v-if="showControls" :position="layersPosition" :collapsed="true" />

      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="tileProvider.token"
        layer-type="base"/>
    </l-map>

    <img class="over-brand" v-if="showBrand" src="@/assets/img/heigit-and-hd-uni.png" :alt="$t('global.brand')" :title="$t('global.brand')">

    <my-location :active="myLocationActive" @updateLocation="updateMyLocation"></my-location>

    <!-- <v-btn v-else small fab class="my-location-btn" @click="setLocationFromBrowser()" :title="$t('mapView.showCurrentLocation')"><v-icon large color="dark" >person_pin_circle</v-icon> </v-btn> -->
    <v-btn fab small v-if="canFitFeatures && showControls" :title="$t('mapView.fitAllFeatures')" class="fit-all-features" @click="fitAllFeatures()" > <v-icon large >all_out</v-icon> </v-btn>

    <map-right-click :map-view-data="mapViewData" @closed="clickLatlng = null" @rightClickEvent="handleRightClickEvent"></map-right-click>
    <map-left-click :current-zoom="zoom" @closed="clickLatlng = null" ></map-left-click>
  </div>
</template>

<script src="./map-view.js"></script>
<style scoped src="./map-view.css"></style>
<style src="./map-view-polyline-measurer.css"></style>
<style src="./map-view-measurer.css"></style>
<style src="./map-view-draw.css"></style>
<style scoped src="./map-view-leaflet.css"></style>




