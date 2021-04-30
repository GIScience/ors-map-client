<template>
  <div>
    <p>{{label}} (<b>{{filter.min}}</b> - <b>{{filter.max}}</b>)</p>
    <v-layout>
      <v-flex xs4 sm3>        
        <v-text-field hide-details class="field-input form-felds-slider-text-input no-input-details"
          type="number" box height="40px" label="" title="" v-model="textLocalModel"
          @keyup="debounceTextFieldChange()" :required="filter.required">
        </v-text-field>
      </v-flex >
      <v-flex sm8>
        <v-slider class="form-felds-slider" :min="filter.min" :max="filter.max" inverse-label v-model="localModel"
          :label="sliderValue + ' ' + buildUnit() " :title="label" @change="sliderValueChanged()" :step="filter.step"></v-slider>
      </v-flex>
    </v-layout>    
  </div>
</template>
<script src="./slider-combo.js"></script>
<style scoped src="./slider-combo.css"></style>