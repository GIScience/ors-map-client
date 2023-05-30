<template>
  <div>
    <v-layout row>
      <v-select :label="$t('timeBasedRoute.hour')" :items="timesOfTheDayLabel"
        item-text="label"
        item-value="value"
        v-model="selectedHour" v-on:change="departHourChange()"></v-select>
    </v-layout>
    <v-divider></v-divider>
<!--    <v-btn class="form-actions" flat :title="$t('timeBasedRoute.hotDays')" @click="routeOnHotDays()">{{$t('timeBasedRoute.hotDays')}}</v-btn>-->
  </div>
</template>

<script src="./time-based-route.js"></script>
