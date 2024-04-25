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
          <v-tooltip bottom style="float: right">
            <template v-slot:activator="{ on }">
              <v-btn class="no-padding"
                     icon small @click="manageJobs">
                <v-icon :title="$t('optimization.manageJobs')" color="dark" :medium="$lowResolution">settings</v-icon>
              </v-btn>
            </template>
            {{ $t('optimization.manageJobs') }}
          </v-tooltip>
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
        <v-tooltip bottom style="float: right">
          <template v-slot:activator="{ on }">
            <v-btn class="no-padding"
                   icon small @click="manageVehicles">
              <v-icon :title="$t('optimization.manageVehicles')" color="dark" :medium="$lowResolution">settings</v-icon>
            </v-btn>
          </template>
          {{ $t('optimization.manageVehicles') }}
        </v-tooltip>
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
    <edit-dialog v-if="showEditDialog" :edit-prop="editProp" :data="editData" :skills="skills"
                 @jobsChanged="jobsChanged" @vehiclesChanged="vehiclesChanged" @skillsChanged="skillsChanged"
                 @close="showEditDialog=false"></edit-dialog>
  </div>
</template>

<script src="./optimization.js"></script>
<style scoped src="./optimization.css"></style>
