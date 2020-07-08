<template>
  <box background="white" no-shadow>
    <div slot="header">
      <share></share>
      <h3>{{$t('placeDetails.placeDetails')}}</h3>
    </div>
    <div>
      <template v-if="$highResolution">
        <v-img :src="imagePath" :lazy-src="imageUrlFallBack"  style="width:100%"></v-img>
        <br>
      </template>
      <div>
        <h3 class="headline mb-0">{{place.label}}</h3>
        <div v-if="place.properties.country">{{$t('placeDetails.country')}}: <b>{{place.properties.country}}</b></div>
        <div>{{$t('placeDetails.layer')}}: <b>{{ $t('global.layers.'+ place.properties.layer) }}</b></div>
        <div>{{$t('placeDetails.lat')}}: <b>{{place.lat}}</b></div>
        <div>{{$t('placeDetails.lon')}}: <b>{{place.lng}}</b></div>
      </div>
    </div>
  </box>
</template>

<script src="./place-details.js"></script>

<style scoped src="./place-details.css"></style>


