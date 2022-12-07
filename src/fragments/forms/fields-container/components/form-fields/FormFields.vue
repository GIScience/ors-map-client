<template>
  <div class="form-fields">
    <template v-if="formParameters">
      <template v-for="(parameter, index) in formParameters">
        <v-layout v-if="showField(parameter)" :key="index" row class="field-row" :style="{'padding-left': (level * 5) + 'px'}" >
          <v-flex v-bind="{[parameter.type === constants.filterTypes.wrapper ? 'sm12': 'sm11']: true}">
            <v-autocomplete v-if="parameter.isEnum || parameter.items" :ref="'field'+ index"
              class="field-input no-input-details form-fields-autocomplete"
              :class="{'multi-select': parameter.multiSelect}"
              :required="parameter.required"
              @change="multiSelectChanged({index: index, value: $event, parameter: parameter})"
              :items="getSelectableItems(parameter)"
              v-model="formParameters[index].value"
              item-text="itemText"
              item-value="itemValue"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              :clearable="!parameter.notClearable"
              autocomplete
              :search-input.sync="parameter.searchInput"
              :multiple="parameter.multiSelect"
              :menu-props="{contentClass: 'form-fields-autocomplete-menu'}"
              :chips="parameter.multiSelect"
              deletable-chips>
            </v-autocomplete>

            <v-text-field v-else-if="parameter.type === constants.filterTypes.text" :ref="'field'+ index"
              class="field-input no-input-details"
              :type="parameter.inputType"
              :step="parameter.inputTypeStep"
              @keyup="debounceTextFieldChange(index)"
              :min="parameter.min"
              :max="parameter.max"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              v-model="formParameters[index].value"
              :required="parameter.required">
            </v-text-field>

            <v-text-field v-else-if="parameter.type === constants.filterTypes.random" :ref="'field'+ index"
              class="field-input random-input no-input-details"
              readonly
              :type="parameter.inputType"
              :step="parameter.inputTypeStep"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              v-model="formParameters[index].value"
              :required="parameter.required">
              <template slot="append">
                <v-icon style="cursor:pointer" class="generate-random" @click="setNewRandomValue(index)">autorenew</v-icon>
              </template>
            </v-text-field>

            <template v-else-if="parameter.type === constants.filterTypes.steps" :ref="'field'+ index">
              <slider-combo @change="(newVal) => sliderComboUpdated(index, newVal)" :filter="comboFilterParameter(index)" :label="buildLabel(parameter)" ></slider-combo>
            </template>

            <template v-else-if="parameter.type === constants.filterTypes.boolean" :ref="'field'+ index">
              <v-checkbox class="pt-0 top-0 form-fields-checkbox"
              v-model="formParameters[index].value" :label="buildLabel(parameter)"
              @change="fieldUpdated({index: index, parameter: parameter})">
              </v-checkbox>
            </template>

            <v-switch class="form-switch" v-else-if="parameter.type === constants.filterTypes.switch"
              :label="buildLabel(parameter)" @change="fieldUpdated({index: index, parameter: parameter})" v-model="formParameters[index].value"
            ></v-switch>

            <v-expansion-panel v-else-if="parameter.type === constants.filterTypes.wrapper" :value="showPanelExpanded(parameter)" class="fields-panel">
              <v-expansion-panel-content style="background: transparent">
                <div slot="header"><h4>{{buildLabel(parameter)}}</h4></div>
                <template>
                  <form-fields :level="level + 1" :parent-index="index" :parameters="parameter.props" @fieldUpdated="fieldUpdated"></form-fields>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-flex sm1 class="txt-right top-15" v-if="parameter.type !== constants.filterTypes.wrapper">
            <v-btn :title="buildDescription(parameter)" flat icon class="help-btn" @click="infoDialog(buildLabel(parameter), buildDescription(parameter), {markdown: true, resizable: true})">
              <v-icon class="pointer">help</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </template>
    </template>
  </div>
</template>
<script src="./form-fields.js"></script>
<style scoped src="./form-fields.css"></style>
<style src="./form-fields-autocomplete.css"></style>
