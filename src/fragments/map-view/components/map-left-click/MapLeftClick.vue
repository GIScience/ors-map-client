<template>
 <box background="white" no-border ref="placeInfoBox" closable @closed="closePlaceInfo" v-show="showLeftClickPopup" noTopBorder customClass="left-context-menu" >
    <div slot="header">{{placeInfoTitle}}</div>
    <div slot="content" >
      <template v-if="hasPlaceInfo && clickInsidePolygon">
        {{$t('mapView.polygonArea')}}: <b>{{placeInfo.containerArea}}</b><br/>
      </template>
      <template v-if="hasPlaceInfo && placeInfo.placeName">
        <b>{{placeInfo.placeName}}</b><br/>
      </template>
      <template v-if="hasPlaceInfo">
        {{$t('mapView.lat')}},{{$t('mapView.lng')}}:
        {{placeInfo.latlng.lat.toFixed(6)}}, {{placeInfo.latlng.lng.toFixed(6)}} <br/>
        <v-btn :title="$t('mapView.copyLatlng')" flat small color="primary" icon class="copy-inverted" @click="copyLatlng()" > <v-icon>file_copy</v-icon> </v-btn>
        <v-btn :title="$t('mapView.copyLnglat')" flat small icon  @click="copyLnglat()" > <v-icon>file_copy</v-icon> </v-btn>
      </template>
    </div>
  </box>
</template>
<script src="./map-left-click.js"></script>
<style scoped src="./map-left-click.css"></style>
