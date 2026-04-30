<template>
  <div class="container">
    <v-select
      :label="$t('timeBasedRoute.month')"
      :items="monthsLabel"
      v-model="doy"
      v-on:change="departHourChange()"
      item-text="label"
      item-value="value"
    />
    <v-select :label="$t('timeBasedRoute.timeOfDay')" :items="timesOfTheDayLabel"
      item-text="label"
      item-value="value"
      v-model="selectedTOD" v-on:change="departHourChange()"
    />
  </div>
</template>

<script src="./time-based-route.js"></script>

<style scoped src="./time-based-route.css"></style>
