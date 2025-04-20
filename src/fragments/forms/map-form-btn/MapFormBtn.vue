<template>
  <div class="map-form-btn">
    <v-btn class="opt-btn" selected-class="default-class btn-active" variant="outlined" size="small" :title="title" @click="$emit('clicked')">
      <v-icon :color="color">{{icon}}</v-icon>
    </v-btn>
    <p class="btn-legend">{{btnText}}</p>
  </div>
</template>

<style scoped src="./map-form-btn.css"></style>
<script src="./map-form-btn.js"></script>
