<template>
  <div>
    <l-map
      id="map-view"
      ref="map"
      class="map-view"
      :class="{'low-resolution': $lowResolution, 'extra-low-resolution': $xlResolution, 'click-to-pick': clickToPickActive}"
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

      <!-- draw tool bar is added programatically via map-view.js setAvoidPolygonDrawingTool method -->
      <!-- <l-draw-toolbar :options="drawingOptions" position="topright"/> -->

      <l-marker v-for="(marker, index) in markers"
        @click="markerClicked(marker.place, $event)"
        @move="markerMoved" :draggable="markerIsDraggable"
        :lat-lng="marker.position"
        :key="index+'-marker'"
        :icon="marker.icon">
        <l-popup v-if="showMarkerPopup">
          <div >
            {{marker.label}} 
            <div style="width=:100%;height:1px"></div>
            <v-btn outline small fab v-if="markerIsRemovable" :title="$t('mapView.removePlace')"  @click="removePlace($event, index)" > <v-icon >delete</v-icon> </v-btn>
            <v-btn outline small fab v-if="directIsAvailable(index)" :title="$t('mapView.toggleDirect')"  @click="marAsDirectfromHere($event, index)" > 
              <v-icon :color="marker.place.direct? 'primary' : 'dark'">settings_ethernet</v-icon> 
            </v-btn>
          </div>
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
      <template  v-for="(alternativeRoute, index) in alternativeRoutes">
        <template>
          <ors-l-polyline :key="index" not-active
            :color="alternativeRouteColor"
            @click="alternativeRouteIndexSelected(alternativeRoute.index, $event)"            
            :lat-lngs="alternativeRoute.polyline" >
          </ors-l-polyline>
        </template>
      </template>
       <template v-if="showActivRouteData">
        <ors-l-polyline :draggable="isInDirectionsMode"
          @followPolyline="followPolyline" 
          :focused-poly-index="highlightedRoutePointIndex"
          @addStopViaPolylineDrag="addStopViaPolylineDrag" 
          :route="activeRouteData" 
          :tooltip-icon="routingProfileIcon">
        </ors-l-polyline>
      </template>
      <l-control-layers v-if="showControls" :position="layersPosition" :collapsed="true"/>
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          :token="tileProvider.token"
          layer-type="base"/>
      <v-btn fab small @click.stop="toggleAcessibleMode" 
        :title="$t('maps.turnOnAcessibleMode')" 
        :class="{'extra-low-resolution': $xlResolution}"
        class="do-not-trigger-close-bottom-nav accessibility-btn" > 
        <v-icon large :color="$store.getters.mapSettings.acessibleModeActive? 'primary': 'default'" >accessibility</v-icon>
      </v-btn>
      <v-btn fab small v-if="canFitFeatures && showControls" 
        class="fit-all-features"
        :title="$t('mapView.fitAllFeatures')"
        :class="{'extra-low-resolution': $xlResolution}" 
        @click.stop="fitAllFeatures()" > 
        <v-icon large >all_out</v-icon> 
      </v-btn>

       <!-- highlight extra info polyline -->
      <extra-info-highlight @closed="extraInfo = null" @beforeOpen="isAltitudeModalOpen = false" v-if="extraInfo" :extra-info="extraInfo" :polyline-data="activeRouteData.geometry.coordinates"/>
      <l-height-graph v-if="isAltitudeModalOpen" @closed="closeAltitudeInfo" lg8 sm11 :data="localMapViewData.rawData" :options="lHeightGraphOptions"/>
      <my-location class="my-location-btn" :active="myLocationActive" @updateLocation="updateMyLocation"></my-location>
      <img class="over-brand" v-if="showBrand" src="@/assets/img/heigit-and-hd-uni.png" :alt="$t('global.brand')" :title="$t('global.brand')">
    </l-map>
    <v-btn v-if="$store.getters.embed" small :title="$t('mapView.viewOnORS')" class="view-on-ors" target="_blank" :href="nonEmbedUrl" > {{$t('mapView.viewOnORS')}} <v-icon right small >open_in_new</v-icon> </v-btn>
    <map-right-click v-if="!$store.getters.embed" :map-view-data="mapViewData" @closed="clickLatlng = null" @rightClickEvent="handleRightClickEvent"></map-right-click>
    <map-left-click :current-zoom="zoom" @closed="clickLatlng = null" @directionsToPoint="directionsToPoint"></map-left-click>

    <div v-if="$store.getters.mapSettings.acessibleModeActive">
      <v-btn fab small @click="moveMapCenter('left')" :title="$t('mapView.moveMapPositionToLeft')" class="move-map-arrow left do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_back</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('up')" :title="$t('mapView.moveMapPositionToUp')" class="move-map-arrow up do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_upward</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('right')" :title="$t('mapView.moveMapPositionToRight')" class="move-map-arrow right do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_forward</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('down')" :title="$t('mapView.moveMapPositionToDown')" class="move-map-arrow down do-not-trigger-close-bottom-nav" :style="{top: acessibilityBtnTopPosition}" > <v-icon large color="primary" >arrow_downward</v-icon> </v-btn>      
    </div>
  </div>
</template>

<script src="./map-view.js"></script>
<style scoped src="./map-view.css"></style>
<style src="./map-view-polyline-measurer.css"></style>
<style src="./map-view-measurer.css"></style>
<style src="./map-view-draw.css"></style>
<style scoped src="./map-view-leaflet.css"></style>




