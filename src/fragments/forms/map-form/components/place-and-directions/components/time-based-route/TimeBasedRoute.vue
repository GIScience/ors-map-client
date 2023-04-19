<template>
  <div>
    <v-layout row>
      <!-- {{$t('timeBasedRoute.time')}} -->
      <v-select :label="$t('timeBasedRoute.hour')" :items="timesOfTheDayLabel"
        item-text="label"
        item-value="value"
        v-model="selectedHour" v-on:change="departHourChange()"></v-select>
      <!-- <div style="float:right;">
        <v-btn small icon @click="subtracthour()"><v-icon>mdi-minus-thick</v-icon></v-btn>
        {{ selectedHour }}
        <v-btn small icon @click="addHour()"><v-icon>add</v-icon></v-btn>
        {{$t('timeBasedRoute.hour')}}
      </div> -->
      <!-- <div>{{$t('timeBasedRoute.hour')}}</div> -->
    </v-layout>
    <!-- <v-btn class="form-actions" flat :title="$t('timeBasedRoute.now')" @click="route('now')">{{$t('timeBasedRoute.now')}}</v-btn>
    <v-divider></v-divider>
    <v-btn class="form-actions" flat :title="$t('timeBasedRoute.inFewHours')" @click="route('1Hours')">{{$t('timeBasedRoute.inFewHours')}}</v-btn> -->
    <v-divider></v-divider>
    <v-btn class="form-actions" flat :title="$t('timeBasedRoute.hotDays')" @click="routeOnHotDays()">{{$t('timeBasedRoute.hotDays')}}</v-btn>
  </div>
</template>

<script src="./time-based-route.js"></script>
