<template>
  <div>
    <div :style="{background: color}" class="custom-html-icon-div">
      <img v-if="iconImg" class="custom-html-icon-img" :src="iconImg">
      <div class="custom-html-icon-txt" :class="{'double-digit-text': doubleDigitText, 'triple-digit-text': tripleDigitText, 'four-digit-text': fourDigitText}" v-else>{{iconNumber}} </div>
    </div>
  </div>
</template>
<script src="./html-marker.js"></script>
<style src="./html-marker.css"></style>
