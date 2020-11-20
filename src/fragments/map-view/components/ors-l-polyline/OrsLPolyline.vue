<template>
  <div class="ors-l-polyline">
    <l-polyline :lat-lngs="latLngs" :weight="backgroundWeight" :color="backgroundColor"></l-polyline>
    <l-polyline ref="foregroundPolyline"
      @follow="followPolyline" 
      @click.exact="click($event)"
      @followMarkerClicked="click($event)"
      @addstop="addStopViaPolylineDrag"
      @add="openPopup"
      :options="options" 
      :lat-lngs="latLngsCoordinates" 
      :weight="weight" 
      :color="color">
      <l-popup v-if="!notActive" :content="popupContent" :options="{ autoClose: false, closeOnClick: true }"></l-popup>
    </l-polyline>
  </div>
</template>
<script src="./ors-l-polyline.js"></script>
<style src="./ors-l-polyline.css"></style>
