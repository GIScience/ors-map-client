<template>
  <div>
    <v-select
      :label="$t('timeBasedRoute.month')"
      :items="monthsLabel"
      v-model="month"
      v-on:change="departHourChange()"
      item-text="label"
      item-value="value"
    />
      <v-layout row>
      <v-select :label="$t('timeBasedRoute.timeOfDay')" :items="timesOfTheDayLabel"
        item-text="label"
        item-value="value"
        v-model="selectedTOD" v-on:change="departHourChange()"></v-select>
    </v-layout>
    <v-divider></v-divider>
  </div>
</template>

<script src="./time-based-route.js"></script>

<style scoped src="./time-based-route.css"></style>
