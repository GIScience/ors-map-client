<template>
 <box background="white" no-border ref="placeInfoBox" closable @closed="closePlaceInfo" v-show="showLeftClickPopup" noTopBorder customClass="left-context-menu" >
    <div slot="header">{{placeInfoTitle}}</div>
    <div slot="content" ref="placeInfoContainer">
      <template v-if="hasPlaceInfo && clickInsidePolygon">
        {{$t('mapLeftClick.polygonArea')}}: <b>{{placeInfo.containerArea}}</b><br/>
      </template>
      <template v-if="hasPlaceInfo && placeInfo.placeName">
        <b>{{placeInfo.placeName}}</b><br/>
      </template>
      <template v-if="hasPlaceInfo">
        {{$t('global.units.lng')}}, {{$t('global.units.lat')}}:
        {{placeInfo.latLng.lng.toFixed(6)}}, {{placeInfo.latLng.lat.toFixed(6)}} <br/>
        <div v-if="placeInfo.customHtml" v-html="placeInfo.customHtml"></div>
        <v-btn flat icon v-if="!placeInfo.hideDirectionsTo"
          v-smart-tooltip="{show: true, text: $t('mapLeftClick.directionsToClickedPoint'), position: $lowResolution? 'top' : 'left', dark: true, saveClose: true, name: 'directionsToClickedPoint'}"
          @click="directionsToPoint(placeInfo)"><v-icon
          :title="$t('mapLeftClick.directionsToClickedPoint')" color="dark" >directions</v-icon>
        </v-btn>
        <v-btn :title="$t('mapLeftClick.copyLnglat')" flat small icon  @click="copyLngLat()" > <v-icon>content_copy</v-icon> </v-btn>
        <v-btn :title="$t('mapLeftClick.copyLatlng')" flat small color="primary" icon class="copy-inverted" @click="copyLatLng()" > <v-icon>content_copy</v-icon> </v-btn>
      </template>
    </div>
  </box>
</template>
<script src="./map-left-click.js"></script>
<style scoped src="./map-left-click.css"></style>
