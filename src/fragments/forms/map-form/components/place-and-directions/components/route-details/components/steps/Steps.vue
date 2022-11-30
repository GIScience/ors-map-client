<template>
  <div >
    <div class="step" v-for="(step, index) in steps" :key="index">
      <div class="on" v-if="step.name">{{$t('steps.on')}}:  <b>{{step.name}} </b></div>
      <template v-if="step.instruction">
        <div v-if="index !== steps.length -1" class="instruction" >
          <b style="font-size:20px" v-html="instructionSymbol(step.type)"></b> <span v-html="step.instruction"></span>
          <v-btn :max-width="30" style="height:15px" fab icon small @click="stepClicked(step, index)" :title="$t('steps.gotoStep')">
            <v-icon>remove_red_eye</v-icon>
          </v-btn>
        </div>
        <div v-else class="arrived" ><v-icon color="success">place</v-icon> <span   v-html="step.instruction"></span></div>
      </template>
      <div v-if="step.distance">{{$t('global.distance')}}:  <b>{{step.distance}} </b></div>
      <div v-if="step.duration"> <v-icon small>access_time</v-icon> <b>{{step.duration}} </b></div>
    </div>
  </div>
</template>

<script src="./steps.js"></script>

<style scoped src="./steps.css"></style>
