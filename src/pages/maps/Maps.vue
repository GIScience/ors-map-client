<template>
  <div class="maps" :style="{height: viewHeight + 'px'}">
    <resize-observer @notify="setViewHeight()" />
    <simple-place-search :height="simpleMapSearchHeight" v-if="simpleSearchIsVisible"></simple-place-search>
    <v-btn round v-if="refreshSearchAvailable"
      :style="{top: mapHeight - 50 + 'px !important'}"
      :title="$t('maps.updateSearchAfterZoomOrCenterChange')"
      class="refresh-search-btn"
      @click="refreshSearch()" > {{$t('maps.updateSearch')}}
    </v-btn>
    <map-view
      ref="mapView"
      :initial-zoom="zoom"
      :avoid-polygons="avoidPolygons"
      :map-view-data="mapViewData"
      :center="mapViewCenter"
      :show-popups="showMapViewClickPopups"
      :height="mapHeight"
      :fit-bounds="fitMapBounds"
      :custom-tile-provider-url="$store.getters.mapSettings.customTileProviderUrl"
      :shrunk="$store.getters.leftSideBarOpen"
      :show-controls="showMapControls"
      :mode="$store.getters.mode"
      :supports-drawing-tool="supportsDrawingTool"
      :routing-profile-icon="currentProfileIcon"
      @mapReady="mapReady"
      @onCreate="orsMapCreated"
      @markerDragged="markerDragged"
      @directionsFromPoint="directionsFromPoint"
      @directionsToPoint="directionsToPoint"
      @addRouteStop="addRouteStop"
      @addDestinationToRoute="addDestinationToRoute"
      @avoidPolygonsChanged="avoidPolygonsChanged"
      @zoomChanged="zoomChanged"
      @mapCenterMoved="mapCenterMoved"
      @addAsIsochroneCenter="addAsIsochroneCenter"
      @removePlace="removePlace"
      @directChanged="directChanged"
      @mapCenterChanged="mapCenterChanged"
      @setInputPlace="setInputPlace"
      @markerClicked="markerClicked">
    </map-view>

    <v-bottom-nav v-if="showBottomNav && !$store.getters.embed" :style="{height: bottomNavHeight + 'px !important', top: bottomNavTop + 'px !important'}" class="places-nav" absolute color="white" >
      <places-carousel
        :active-index="activePlaceIndex"
        :map-view-data="mapViewData"
        @close="closedBottomNav"
        @placeSelected="placeIndexSelectedInBottomNav"
        @gotToPlace="gotToPlace"
        @directionsToPoint="directionsToPoint">
      </places-carousel>
    </v-bottom-nav>

    <v-dialog v-model="isSettingsOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" v-if="isSettingsOpen" class="settings-modal" resizable closable @closed="closeSettingsModal()">
        <h3 slot="header">{{$t('maps.settings')}}</h3>
        <settings @saved="closeSettingsModal"></settings>
      </box>
    </v-dialog>

    <v-dialog v-model="isAboutOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" v-if="isAboutOpen" class="about-modal" resizable closable @closed="closeAboutModal()">
        <h3 slot="header">{{$t('maps.aboutTitle')}}</h3>
        <about></about>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./maps.js"></script>
<style src="./maps.css"></style>
