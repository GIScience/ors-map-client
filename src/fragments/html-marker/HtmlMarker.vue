<template>
  <div>
    <div :style="{background: color}" class="custom-html-icon-div">
      <img alt="Map marker icon"v-if="markerImg" class="custom-html-icon-img" :src="markerImg">
      <div v-else-if="markerNumber" class="custom-html-icon-txt" :class="{'double-digit-text': doubleDigitText, 'triple-digit-text': tripleDigitText, 'four-digit-text': fourDigitText}">{{markerNumber}} </div>
    </div>
  </div>
</template>
<script src="./html-marker.js"></script>
<style src="./html-marker.css"></style>
