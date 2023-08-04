<template>
  <box background="white" no-shadow>
    <div slot="header">
      <share :url="shareUrl"></share>
      <print :map-view-data="mapViewData"></print>
      <h3>{{$t('placeDetails.placeDetails')}}</h3>
    </div>
    <div>
      <template v-if="$highResolution">
        <v-img :src="imagePath" :lazy-src="imageUrlFallBack" :title="place.placeName + ' - ' + $t('placeDetails.satelliteView') "  style="width:100%;max-height:250px"></v-img>
        <br>
      </template>
      <div>
        <div v-if="place.placeName">{{$t('placeDetails.placeName')}}: <b>{{place.placeName}}</b></div>
        <div v-if="place.properties.country">{{$t('global.layers.country')}}: <b>{{place.properties.country}}</b></div>
        <div>{{$t('placeDetails.layer')}}: <b>{{ $t('global.layers.'+ place.properties.layer) }}</b></div>
        <div>{{$t('placeDetails.lon')}}: <b>{{place.lng}}</b></div>
        <div>{{$t('placeDetails.lat')}}: <b>{{place.lat}}</b></div>
        <v-btn :title="$t('placeDetails.copyLnglat')" flat small icon  @click="copyLngLat()" > <v-icon>content_copy</v-icon> </v-btn>
        <v-btn :title="$t('placeDetails.copyLatlng')" flat small color="primary" icon class="copy-inverted" @click="copyLatLng()" > <v-icon>content_copy</v-icon></v-btn>
      </div>
    </div>
  </box>
</template>

<script src="./place-details.js"></script>

<style scoped src="./place-details.css"></style>
