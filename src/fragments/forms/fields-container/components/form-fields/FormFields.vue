<template>
  <div>
    <template v-if="formParameters">
      <template v-for="(parameter, index) in formParameters">
        <v-layout v-if="showField(parameter)" :key="index" row class="field-row" :style="{'padding-left': (level * 5) + 'px'}" >
          <v-flex v-bind="{[parameter.type === constants.filterTypes.wrapper ? 'sm12': 'sm11']: true}">
            <v-autocomplete v-if="parameter.isEnum || parameter.items" :ref="'field'+ index"
              class="field-input no-input-details form-fields-autocomplete"
              :required="parameter.required"
              @change="isModalMultiSelect(parameter) ? () => {} : fieldUpdated({index: index, value: $event})"
              :items="getSelectableItems(parameter)"
              v-model="formParameters[index].value"
              item-text="itemText"
              item-value="itemValue"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              :clearable="true"
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
              :append-icon="hasValidChildProps(parameter) ? 'edit' : ''"
              @click:append="maybeOpenAssistant(index)"
              @keyup="debounceTextFieldChange(index)"
              :min="parameter.min"
              :max="parameter.max"
              @focus="maybeOpenManualEdit(index)"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              v-model="formParameters[index].value"
              :required="parameter.required">
            </v-text-field>

            <v-text-field v-else-if="parameter.type === constants.filterTypes.random" :ref="'field'+ index"
              class="field-input no-input-details"
              readonly
              append-icon="autorenew"
              :type="parameter.inputType"
              :step="parameter.inputTypeStep"
              @click:append="setNewRandomValue(index)"
              :label="buildLabel(parameter)"
              :title="buildLabel(parameter)"
              v-model="formParameters[index].value"
              :required="parameter.required">
            </v-text-field>

            <template v-else-if="parameter.type === constants.filterTypes.steps" :ref="'field'+ index">
              <p>{{buildLabel(parameter)}}</p>
              <div>
                <v-text-field :ref="'field-text'+ index"
                  class="field-input form-felds-slider-text-input no-input-details"
                  type="number"
                  :step="parameter.step"
                  :min="parameter.min"
                  :max="parameter.max"
                  box
                  height="40px"
                  label=""
                  title=""
                  v-model="formParameters[index].value"
                  @keyup="debounceTextFieldChange(index)"
                  :required="parameter.required">
                </v-text-field>
                <v-slider class="form-felds-slider"
                  :min="parameter.min"
                  :max="parameter.max"
                  inverse-label
                  v-model="formParameters[index].value"
                  :title="buildLabel(parameter)"
                  :label="sliderLabel(index)"
                  @change="fieldUpdated({index: index, value: formParameters[index].value})"
                  :step="parameter.step"
                ></v-slider>
              </div>
            </template>

            <template v-else-if="parameter.type === constants.filterTypes.boolean" :ref="'field'+ index">
              <v-checkbox class="pt-0 top-0" v-model="formParameters[index].value" :label="buildLabel(parameter)" ></v-checkbox>
            </template>

            <v-switch class="form-switch" v-else-if="parameter.type === constants.filterTypes.switch"
              :label="buildLabel(parameter)" @change="fieldUpdated({index: index})" v-model="formParameters[index].value"
            ></v-switch>

            <v-expansion-panel v-else-if="parameter.type === constants.filterTypes.wrapper" :value="showPanelExpanded(parameter)" class="fields-panel">
              <v-expansion-panel-content style="background: transparent">
                <div slot="header"><h4>{{parameter.label}}</h4></div>
                <template>
                  <form-fields :level="level + 1" :parent-index="index" :parameters="parameter.props" @fieldUpdated="fieldUpdated"></form-fields>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-flex sm1 class="txt-right top-15" v-if="parameter.type !== constants.filterTypes.wrapper">
            <v-tooltip left>
              <v-icon @click="infoDialog(buildLabel(parameter), buildDescription(parameter), {markdown: true, resizable: true})"
                class="pointer" slot="activator">help
              </v-icon>
              <span v-html="$t('formFields.fieldHelp')"></span>
            </v-tooltip>
          </v-flex>
        </v-layout>

      </template>
    </template>
    <dialog-fields v-if="subPropsModalActive" :is-modal=true :title="subPropsModalTitle" :sub-props-index="subPropsModalIndex"
      :parameters="formParameters" @fieldUpdated="fieldUpdated" @modalConfirmed="onModalFieldAssistedConfirm">
    </dialog-fields>
    <v-dialog v-if="manualEditModalActive" v-model="manualEditModalActive" max-width="600" class="open-field-modal">
      <box v-if="manualEditModalActive" closable @closed="onEditModalOk" v-model="manualEditModalActive" :resizable="true"
        background="white">
        <div slot="header">
          <h3>{{subPropsModalTitle}}</h3>
        </div>
        <div slot="content">
          <v-text-field class="field-input no-input-details" :label="$t('formFields.paramJSONContent')" :multi-line="true"
            :title="buildLabel(manualEditingParameter)" v-model="manualEditingParameter.value"></v-text-field>
        </div>
        <div slot="footer" class="text-right">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="onEditModalOk">{{$t('global.ok')}}</v-btn>
        </div>
      </box>
    </v-dialog>
  </div>
</template>
<script src="./form-fields.js"></script>
<style scoped src="./form-fields.css"></style>
<style src="./form-fields-autocomplete.css"></style>
