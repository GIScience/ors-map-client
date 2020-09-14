<template>
  <div class="map-form-btn">
    <v-btn class="opt-btn" active-class="default-class btn-active" outline small fab :title="title" @click="$emit('clicked')">
      <v-icon :color="color">{{icon}}</v-icon>
    </v-btn>
    <p class="btn-legend">{{btnText}}</p>
  </div>
</template>

<style scoped src="./map-form-btn.css"></style>
<script src="./map-form-btn.js"></script>
