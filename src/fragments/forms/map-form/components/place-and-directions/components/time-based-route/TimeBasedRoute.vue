<template>
  <div>
    <v-btn-toggle
      v-model="today_toggle"
      mandatory
      v-on:change="departHourChange()"
    >
      <v-btn :value="'r'" flat>
        {{$t('timeBasedRoute.today')}}
      </v-btn>
      <v-btn :value="'t'" flat>
        {{$t('timeBasedRoute.typicalHotDay')}}
      </v-btn>
    </v-btn-toggle>
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
