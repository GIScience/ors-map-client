<template>
  <div class="printing-template directions-template">
    <h2 v-html="place.placeName"></h2>
    <br /><br />

    <img alt="Map print view" width="auto" height="400" :src="mapViewImage" />
    <div>
      <div v-if="place.placeName">{{$t('placeDetails.placeName')}}: <b>{{place.placeName}}</b></div>
      <div v-if="place.properties.country">{{$t('global.layers.country')}}: <b>{{place.properties.country}}</b></div>
      <div>{{$t('placeDetails.layer')}}: <b>{{ $t('global.layers.'+ place.properties.layer) }}</b></div>
      <div>{{$t('placeDetails.lon')}}: <b>{{place.lng}}</b></div>
      <div>{{$t('placeDetails.lat')}}: <b>{{place.lat}}</b></div>
    </div>
  </div>
</template>

<script src="./print-place.js"></script>
