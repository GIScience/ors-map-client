<template>
  <div class="ors-l-polyline">
    <l-polyline :lat-lngs="coordinates" :opacity="routeOpacity" :weight="backgroundWeight" :color="backgroundColor"></l-polyline>
    <l-polyline ref="foregroundPolyline"
      @follow="followPolyline"
      @rightClicked="rightClicked"
      @click.exact="click($event)"
      @followMarkerClicked="click($event)"
      @addStop="addStopViaPolylineDrag"
      @add="openPopup"
      :options="options"
      :lat-lngs="coordinates"
      :weight="weight"
      :opacity="routeOpacity"
      :color="color">
    </l-polyline>
  </div>
</template>
<script src="./ors-l-polyline.js"></script>
<style src="./ors-l-polyline.css"></style>
