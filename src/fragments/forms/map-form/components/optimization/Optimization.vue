<template>
  <div>
    <v-form @submit.prevent style="background:white">
      <template>
        <template v-if="mapViewData">
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
      <job-list :jobs="jobs"></job-list>
      <div class="optimization-heading">
        {{ $t('optimization.vehicles') }} (Max: 3)
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
