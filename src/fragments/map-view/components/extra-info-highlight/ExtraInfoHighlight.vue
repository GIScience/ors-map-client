<template>
  <div>
    <template v-if="highlightedPolylines" >
      <template v-for="(polyline, index) in highlightedPolylines">
        <l-polyline :lat-lngs="polyline.polylines" :weight="10" :color="'white'" :opacity="highlightedPolylines.length === 1 ? 1 : 0"></l-polyline>
        <l-polyline :key="index" :lat-lngs="polyline.polylines" :weight="8" :color="polyline.color">
        <l-tooltip v-html="polyline.label"></l-tooltip>
      </l-polyline>
        <l-polyline :lat-lngs="polyline.polylines" :weight="2" :color="'white'" :opacity="highlightedPolylines.length === 1 ? 1 : 0" dash-array="1 4"></l-polyline>
      </template>
    </template>
  </div>
</template>

<script src="./extra-info-highlight.js"></script>
<style scoped src="./extra-info-highlight.css"></style>
