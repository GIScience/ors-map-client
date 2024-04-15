<template>
  <div >
    <div class="step" v-for="(step, index) in steps" :key="'step-'+index">
      <template v-if="step.type">
        <div class="instruction" >
          <v-icon v-html="typeSymbol(step.type)"></v-icon> <span v-html="step.type"></span><b> {{step.id}} </b>
<!--          <v-btn :max-width="30" style="height:15px" fab icon small @click="stepClicked(step)" :title="$t('steps.gotoStep')">-->
<!--            <v-icon>remove_red_eye</v-icon>-->
<!--          </v-btn>-->
        </div>
      </template>
      <div v-if="step.distance">{{$t('global.distance')}}: <b>{{step.distance}} </b></div>
      <div v-if="step.duration"> <v-icon small>access_time</v-icon> <b>{{step.duration}} </b></div>
      <div v-if="step.service">{{$t('optimizationSteps.service')}}: <b>{{step.service}} </b></div>
      <div v-if="step.load">{{$t('optimizationSteps.load')}}<span v-if="['job','delivery','pickup'].includes(step.type)"> {{$t('optimizationSteps.after')}}</span> <b>{{step.load[0]}} </b></div>
      <div v-if="step.waiting_time">{{$t('optimizationSteps.waiting_time')}}: <b>{{step.waiting_time}} </b></div>
    </div>
  </div>
</template>
<script src="./optimization-steps.js"></script>
<style scoped src="./optimization-steps.css"></style>
