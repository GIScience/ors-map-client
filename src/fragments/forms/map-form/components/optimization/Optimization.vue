<template>
  <div>
    <v-form @submit.prevent style="background:white">
      <template>
        <template v-if="mapViewData">
          <optimization-details v-if="mapViewData.hasRoutes()" :map-view-data="mapViewData"></optimization-details>
        </template>
        <div class="optimization-heading" v-top-border:color="borderColor">
          {{ $t('optimization.jobs') }} (Max: 50)
          <v-tooltip bottom style="float: right">
            <template v-slot:activator="{ on }">
              <v-btn class="no-padding"
                     icon small @click="manageJobs">
                <v-icon size="1.5rem" :title="$t('optimization.manage') + $t('optimization.jobs')" color="dark" :medium="$lowResolution">edit</v-icon>
              </v-btn>
            </template>
            {{ $t('optimization.manage') + $t('optimization.jobs') }}
          </v-tooltip>
          <v-btn class="hide-button" icon small @click="jobsExpanded=!jobsExpanded">
            <v-icon v-if="jobsExpanded" color="info" :medium="$lowResolution">visibility_off</v-icon>
            <v-icon v-else color="info" :medium="$lowResolution">visibility</v-icon>
          </v-btn>
        </div>
      </template>
      <v-btn v-if="jobs.length === 0" @click="addJobFromMap" color="success">
        <v-icon style="margin-right: 5px;">map</v-icon>
        {{ $t('optimization.addFromMap') + $t('optimization.job') }}
      </v-btn>
      <!-- low priority TODO: more elegant solution for this? -->
      <job-list class="content-list" v-if="mapViewData.hasRoutes()" :jobs="jobs" :map-view-data="mapViewData"
                v-show="jobsExpanded"></job-list>
      <job-list class="content-list" v-else :jobs="jobs" v-show="jobsExpanded"></job-list>
      <v-card class="content-list" v-if="!jobsExpanded" @click="jobsExpanded=!jobsExpanded">
        <v-card-title>
          <v-icon style="padding: 0 5px 0 7px">work</v-icon>
          <b>{{ $t('optimization.savedJobs') + jobs.length }}</b>
        </v-card-title>
      </v-card>

      <div class="optimization-heading">
        {{ $t('optimization.vehicles') }} (Max: 3)
        <v-tooltip bottom style="float: right">
          <template v-slot:activator="{ on }">
            <v-btn class="no-padding"
                   icon small @click="manageVehicles">
              <v-icon size="1.5rem" :title="$t('optimization.manage') + $t('optimization.vehicles')" color="dark" :medium="$lowResolution">edit</v-icon>
            </v-btn>
          </template>
          {{ $t('optimization.manage') + $t('optimization.vehicles') }}
        </v-tooltip>
      </div>
      <div v-if="vehicles.length === 0">
        <v-btn @click="addVehicleFromMap" color="success">
          <v-icon style="margin-right: 5px;">map</v-icon>
          {{ $t('optimization.addFromMap') + $t('optimization.vehicle') }}
        </v-btn>
      </div>
      <vehicle-list class="content-list" :vehicles="vehicles"></vehicle-list>
      <v-layout row class="form-actions-btns">
        <v-tooltip bottom style="float: right">
          <template v-slot:activator="{ on }">
            <div class="skill-opt-btn">
              <v-btn class="skill-opt-btn"
                     outline small fab @click="manageSkills">
                <v-icon :title="$t('optimization.manage') + $t('optimization.skills')" color="dark" :medium="$lowResolution">edit</v-icon>
              </v-btn>
              <p class="skill-btn-legend">{{$t('optimization.manage') + $t('optimization.skills')}}</p>
            </div>
          </template>
        </v-tooltip>
        <form-actions :place-inputs="jobs.length"  :disabled-actions="disabledActions"
                      @clearPlaces="clearPlaces"
                      @reverseRoute="reverseRoute"
                      @contentUploaded="contentUploaded">
        </form-actions>
      </v-layout>
    </v-form>
    <edit-dialog v-if="showEditDialog" :edit-prop="editProp" :data="editData" :skills="skills" :index="editId"
                 @jobsChanged="jobsChanged" @vehiclesChanged="vehiclesChanged" @skillsChanged="skillsChanged"
                 @close="showEditDialog=false"></edit-dialog>
    <edit-skills v-if="showSkillManagement" :skills="skills" :skills-in-use="skillsInUse" @skillsChanged="skillsChanged" @close="showSkillManagement=false"></edit-skills>
    <optimization-import v-if="isImportOpen" :expected-data="expectedImport" @saveOptimizationImport="saveImport"
                         @close="isImportOpen=false"></optimization-import>
  </div>
</template>

<script src="./optimization.js"></script>
<style scoped src="./optimization.css"></style>
