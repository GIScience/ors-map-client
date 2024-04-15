<template>
  <div>
    <v-form @submit.prevent style="background:white">
      <template>
        <template v-if="mapViewData">
          <optimization-details v-if="mapViewData.hasRoutes()" :map-view-data="mapViewData"></optimization-details>
          <div class="route-btn">
            <v-btn @click="optimizeJobs" color="success" fab small>
              <v-icon :title="'Calculate route(s)'">send</v-icon>
            </v-btn>
          </div>
          <br>
        </template>
        <div class="optimization-heading">
          {{ $t('optimization.jobs') }} (Max: 50)
        </div>
      </template>
      <div v-if="jobs.length === 0">
        <v-btn @click="addJobFromMap" color="success">
          <v-icon style="margin-right: 5px;">map</v-icon>
          {{ $t('optimization.addJobFromMap') }}
        </v-btn>
      </div>
      <job-list :jobs="jobs"></job-list>
      <div class="optimization-heading">
        {{ $t('optimization.vehicles') }} (Max: 3)
      </div>
      <div v-if="vehicles.length === 0">
        <v-btn @click="addVehicleFromMap" color="success">
          <v-icon style="margin-right: 5px;">map</v-icon>
          {{ $t('optimization.addVehicleFromMap') }}
        </v-btn>
      </div>
      <vehicle-list :vehicles="vehicles"></vehicle-list>
      <v-layout row class="form-actions-btns">
        <v-tooltip bottom style="float: right">
        </v-tooltip>
        <form-actions :place-inputs="jobs.length" :disabled-actions="disabledActions"
                      @addPlaceInput="addPlaceInput"
                      @clearPlaces="clearPlaces"
                      @reverseRoute="reverseRoute"
                      @contentUploaded="contentUploaded">
        </form-actions>
      </v-layout>
    </v-form>
  </div>
</template>

<script src="./optimization.js"></script>
<style scoped src="./optimization.css"></style>
