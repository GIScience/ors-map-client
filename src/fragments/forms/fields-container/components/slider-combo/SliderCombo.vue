<template>
  <div class="slider-combo">
    <p>{{label}} (<b>{{filter.min}}</b> - <b>{{filterMax}}</b>)</p>
    <v-layout>
      <v-flex xs4 sm3>
        <v-text-field hide-details class="field-input form-fields-slider-text-input no-input-details"
          type="number" box height="40px" label="" title="" v-model="textLocalModel"
          @keyup="debounceTextFieldChange()" :required="filter.required">
        </v-text-field>
      </v-flex >
      <v-flex sm8>
        <custom-slider ref="slider" class="form-fields-slider" :min="filterMin" :max="filterMax" inverse-label v-model="localModel"
          :thumb-size="localModel > 999 ? 32 : 24"
          :thumb-label="localModel > 0 ? 'always' : true"
          :label="buildUnit() " :title="label" @change="sliderValueChanged()" :step="filter.step"></custom-slider>
      </v-flex>
    </v-layout>
  </div>
</template>
<script src="./slider-combo.js"></script>
<style scoped src="./slider-combo.css"></style>
