<template>
  <div class="maps" :style="{height: viewHeight + 'px'}">
    <resize-observer @notify="setViewHeight()" />
    <simple-place-search :height="simpleMapSearcHeight" v-if="$store.getters.mapReady && !$store.getters.leftSideBarOpen"></simple-place-search>
    <v-btn round v-if="refreshSearchAvailable"
      :style="{top: mapHeight - 50 + 'px !important'}"
      :title="$t('maps.updateSearchAfterZoomOrCenterChange')"
      class="refresh-search-btn"
      @click="refreshSearch()" > {{$t('maps.updateSearch')}}
    </v-btn>
    <map-view
      :initial-zoom="zoom"
      :map-view-data="mapViewData"
      :center="mapViewCenter"
      :show-popups="(!$store.getters.leftSideBarOpen || $highResolution) && !showBottomNav"
      :height="mapHeight"
      :fit-bounds="fitMapBounds"
      :custom-tile-provider-url="$store.getters.mapSettings.customTileProviderUrl"
      :shrinked="$store.getters.leftSideBarPinned"
      :mode="$store.getters.mode"
      :supports-drawing-tool="supportsDrawingTool"
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
      @markerClicked="markerClicked">
    </map-view>

    <v-bottom-nav v-if="showBottomNav" :style="{height: bottomNavHeight + 'px !important', top: bottomNavTop + 'px !important'}" class="places-nav" absolute color="white" >
      <places-carousel
        :active-index="activeplaceIndex"
        :map-view-data="mapViewData"
        @closed="closedBottomNav"
        @placeSelected="placeIndexSelectedInBottomNav"
        @directionsToPoint="directionsToPoint">
      </places-carousel>
    </v-bottom-nav>

    <v-dialog v-model="isSettingsOpen" max-width="600" class="settings-modal" :persistent="true">
      <box background="white" v-if="isSettingsOpen" resizable closable @closed="closeSettingsModal()">
        <h3 slot="header">{{$t('maps.settings')}}</h3>
        <settings></settings>
      </box>
    </v-dialog>

    <v-dialog v-model="isAboutOpen" max-width="600" class="about-modal" :persistent="true">
      <box background="white" v-if="isAboutOpen" resizable closable @closed="closeAboutModal()">
        <h3 slot="header">{{$t('maps.about')}}</h3>
        <about></about>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./maps.js"></script>
<style src="./maps.css"></style>
