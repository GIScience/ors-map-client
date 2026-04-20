<template>
  <div class="container">
    <v-select
      :label="$t('citySelector.state')"
      :items="states"
      item-text="text"
      item-value="value"
      v-model="selectedState"
    />
    <v-select
      :label="$t('citySelector.city')"
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
