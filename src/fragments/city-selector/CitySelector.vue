<template>
  <div class="container">
    <v-select
      label="State"
      :items="states"
      item-text="text"
      item-value="value"
      v-model="selectedState"
      @change="selectedCity = null"
    />
    <v-select
      label="City"
      :items="cities"
      item-text="text"
      item-value="value"
      v-model="selectedCity"
      :disabled="!selectedState"
      v-on:change="changeCity"
    />
  </div>
</template>

<script src="./city-selector.js"></script>
<style scoped src="./city-selector.css"></style>
