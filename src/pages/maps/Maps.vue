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
      :show-popups="(!$store.getters.leftSideBarOpen || $highResolution) && !showBottomNav"
      :height="mapHeight"
      :fit-bounds="fitMapBounds"
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
      @markerClicked="markerClicked">
    </map-view>

    <v-bottom-nav v-if="showBottomNav" :style="{height: bottomNavHeight + 'px !important', top: bottomNavTop + 'px !important'}" class="places-nav" absolute color="white" >
      <places-carousel
        :active-index="activeplaceIndex"
        :map-view-data="mapViewData"
        @closed="closedBottomNav"
        @placeSelected="placeIndexSelectedInBottomNav"
        @directionsFromPoint="directionsFromPoint"
        @directionsToPoint="directionsToPoint">
      </places-carousel>
    </v-bottom-nav>

    <v-dialog v-model="isAltitudeModalOpen" max-width="600" class="props-modal" :persistent="true">
      <box background="white" v-if="isAltitudeModalOpen" resizable closable @closed="closeAltitudeModal()">
        <h3 slot="header">{{$t('maps.altitude')}}</h3>
        <altitude :height="200" :map-view-data="mapViewData"></altitude>
      </box>
    </v-dialog>

    <v-dialog v-model="isSettingsOpen" max-width="600" class="props-modal" :persistent="true">
      <box background="white" v-if="isSettingsOpen" resizable closable @closed="closeSettingsModal()">
        <h3 slot="header">{{$t('maps.settings')}}</h3>
        <settings></settings>
      </box>
    </v-dialog>

    <v-dialog v-model="isAboutOpen" max-width="600" class="props-modal" :persistent="true">
      <box background="white" v-if="isAboutOpen" resizable closable @closed="closeAboutModal()">
        <h3 slot="header">{{$t('maps.about')}}</h3>
        <about></about>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./maps.js"></script>
<style src="./maps.css"></style>
