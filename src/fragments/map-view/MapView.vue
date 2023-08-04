<template>
  <div>
    <l-map
      :id="constants.mapViewElementId"
      ref="map"
      class="map-view"
      :class="{
        'low-resolution': $lowResolution,
        'extra-low-resolution': $xlResolution,
        'embedded': $store.getters.embed,
        'click-to-pick': clickToPickActive,
        'hide-controls': !showControls
        }"
      @click.right="mapRightClick"
      @zoomend="zoomed"
      @baselayerchange="baseLayerChanged"
      @click.exact="mapLeftClick"
      @dragend="mapMoved"
      :max-zoom="maxZoom"
      :min-zoom="2"
      :center="mapCenter"
      :zoom="zoom"
      :options="mapOptions"
      :style="{height: mapHeight + 'px'}">

      <l-control-polyline-measure v-if="showControls && distanceMeasureToolAvailable" :options="polylineMeasureOptions"/>

      <!-- draw tool bar is added programmatically via map-view.js setAvoidPolygonDrawingTool method -->
      <!-- <l-draw-toolbar :options="drawingOptions" position="topright"/> -->

      <map-view-markers :mode="mode" :markers="markers"
        @markerMoved="markerMoved"
        @markerClicked="markerClicked"
        @removePlace="removePlace"
        @markAsDirectFromHere="markAsDirectFromHere">
      </map-view-markers>

       <map-view-markers
        :mode="mode"
        :markers="pois"
        is-poi
        @markerClicked="markerClicked">
      </map-view-markers>

      <!--render polygons -->
      <template v-if="polygons">
        <template v-for="(polygon, index) in polygons">
          <l-polygon v-if="polygon.properties.visible"
            :key="index+'-polygon'"
            @click="isochroneClicked(index, polygon, $event)"
            :lat-lngs="polygon.latLngs"
            :opacity="polygon.properties.opacity"
            :fillOpacity="polygon.properties.fillOpacity"
            :fillColor="polygon.properties.fillColor"
            :color="polygon.properties.color">
            <l-popup v-if="polygon.properties.label">
              <div :ref="'isochronePopupContainer' + index" >
                {{polygon.properties.label}} {{$t('mapView.polygon')}} - {{polygon.properties.area}}
                <br/>
                <span v-if="polygon.properties.total_pop">{{$t('global.population')}}: {{polygon.properties.total_pop}}</span>
              </div>
            </l-popup>
          </l-polygon>
        </template>
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
      <template  v-for="(alternativeRoute) in alternativeRoutes">
        <ors-l-polyline :key="alternativeRoute.properties.index" not-active
          :color="alternativeRouteColor"
          @click="alternativeRouteIndexSelected(alternativeRoute.properties.index, $event)"
          :route="alternativeRoute" >
        </ors-l-polyline>
      </template>
      <template v-if="displayActiveRouteData">
        <ors-l-polyline :draggable="isPolylineDraggable"
          @rightClicked="mapRightClick"
          :focused-poly-index="highlightedRoutePointIndex"
          @addStopViaPolylineDrag="addStopViaPolylineDrag"
          :route="activeRouteData"
          :tooltip-icon="routingProfileIcon">
        </ors-l-polyline>
      </template>
      <l-control-layers :position="layersPosition" :collapsed="true"/>
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="tileProvider.token"
        :options="{maxZoom: tileProvider.maxZoom}"
        layer-type="base"/>
      <l-tile-layer
        v-for="layer in overlayerTileProviders"
        :key="layer.name"
        :name="layer.name"
        :visible="layer.visible"
        :url="layer.url"
        :attribution="layer.attribution"
        :token="layer.token"
        layer-type="overlay"/>
      <l-wms-tile-layer
        v-for="layer in wmsOverlayerTileProviders"
        :key="layer.name"
        :attribution="layer.attribution"
        :base-url="layer.baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        :max-zoom="layer.maxZoom"
        :version="layer.version"
        :format="layer.format"
        :transparent="true"
        :opacity="layer.opacity"
        layer-type="overlay"/>
      <v-btn fab small @click.stop="toggleAccessibleMode" v-if="accessibilityToolAvailable"
        :title="$t('maps.toggleAccessibleMode')"
        :class="{'extra-low-resolution': $xlResolution}"
        class="do-not-trigger-close-bottom-nav accessibility-btn" >
        <v-icon large :color="$store.getters.mapSettings.accessibleModeActive? 'primary': 'default'" >accessibility</v-icon>
      </v-btn>
      <v-btn fab small v-if="canFitFeatures && showControls"
        class="fit-all-features"
        :title="$t('mapView.fitAllFeatures')"
        :class="{'extra-low-resolution': $xlResolution}"
        @click.stop="fitAllFeatures()" >
        <v-icon large >all_out</v-icon>
      </v-btn>

      <!-- highlight extra info polyline -->
      <extra-info-highlight v-if="extraInfo" @closed="extraInfo = null" @beforeOpen="isAltitudeModalOpen = false" :extra-info="extraInfo" :polyline-data="activeRouteData.geometry.coordinates"/>

      <l-height-graph v-if="isAltitudeModalOpen" @closed="closeAltitudeInfo" lg8 sm11 :data="localMapViewDataRawData" :options="lHeightGraphOptions"/>
      <my-location v-if="showMyLocationControl" class="my-location-btn" :active="myLocationActive" @updateLocation="updateMyLocation"></my-location>
      <img class="over-brand" v-if="showBrand && showControls" :src="getImgSrc('brandLogoSrc')" :alt="$t('global.brand')" :title="$t('global.brand')">

      <!-- the container below might be used to to programmatically add controls/components -->
      <div ref="customMapControlsContainer" style="z-index: 501" class="custom-controls" ></div>
    </l-map>
    <v-btn v-if="$store.getters.embed" small :title="$t('mapView.viewOnORS')" class="view-on-ors" target="_blank" :href="nonEmbedUrl" > {{$t('mapView.viewOnORS')}} <v-icon right small >open_in_new</v-icon> </v-btn>
    <map-right-click v-if="!$store.getters.embed" :map-view-data="mapViewData" @closed="clickLatLng = null" @rightClickEvent="handleRightClickEvent"></map-right-click>
    <map-left-click :show="showControls && showClickPopups" :current-zoom="zoom" @closed="clickLatLng = null" @directionsToPoint="directionsToPoint"></map-left-click>

    <div v-if="$store.getters.mapSettings.accessibleModeActive">
      <v-btn fab small @click="moveMapCenter('left')" :title="$t('mapView.moveMapPositionToLeft')" class="move-map-arrow left do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_back</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('up')" :title="$t('mapView.moveMapPositionToUp')" class="move-map-arrow up do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_upward</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('right')" :title="$t('mapView.moveMapPositionToRight')" class="move-map-arrow right do-not-trigger-close-bottom-nav" > <v-icon large color="primary" >arrow_forward</v-icon> </v-btn>
      <v-btn fab small @click="moveMapCenter('down')" :title="$t('mapView.moveMapPositionToDown')" class="move-map-arrow down do-not-trigger-close-bottom-nav" :style="{top: accessibilityBtnTopPosition}" > <v-icon large color="primary" >arrow_downward</v-icon> </v-btn>
    </div>
  </div>
</template>

<script src="./map-view.js"></script>
<style scoped src="./map-view.css"></style>
<style src="./map-view-polyline-measurer.css"></style>
<style src="./map-view-measurer.css"></style>
<style src="./map-view-draw.css"></style>
<style scoped src="./map-view-leaflet.css"></style>
