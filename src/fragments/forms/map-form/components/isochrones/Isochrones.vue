<template>
  <div>
    <v-form @submit.prevent style="background:white">
      <template  v-if="places.length > 0">
          <ul class="place-inputs">
            <draggable v-model="places" @end="onReordered()" handle=".reorder-handle">
              <li :key="index" v-for="(place, index) in places">
                <v-layout row >
                  <v-flex xs1 v-if="$store.getters.mode === constants.modes.isochrones && places.length > 1">
                    <v-icon class="reorder-handle">reorder</v-icon>
                  </v-flex>
                  <v-flex v-bind="{[ $store.getters.mode === constants.modes.directions? 'xs11' : 'xs12']: true}">
                    <place-input :ref="'place'+index"
                      id-postfix="isochrones"
                      :support-directions="false"
                      :support-search="false"
                      :box="places.length === 1"
                      :index="index"
                      :model="places[index]"
                      pick-place-supported
                      :single="places.length === 1"
                      :is-last="(places.length -1) === index && index !== 0"
                      @selected="selectPlace"
                      @removeInput="removePlaceInput"
                      @addInput="addPlaceInput"
                      @cleared="placeCleared">
                    </place-input>
                  </v-flex>
                </v-layout >
              </li>
            </draggable>
          </ul>
        </template>
      <v-layout row class="form-actions-btns">
        <form-actions :place-inputs="places.length" :disabled-actions="disabledActions"
          @addPlaceInput="addPlaceInput"
          @clearPlaces="clearPlaces"
          @reverseRoute="reverseRoute"
          @contentUploaded="contentUploaded">
        </form-actions>
      </v-layout>
      <template v-if="mapViewData">
        <ischrones-details v-if="mapViewData && mapViewData.hasPlaces()" :map-view-data="mapViewData"></ischrones-details>
        <br>
      </template>
      <box v-if="$store.getters.mode === constants.modes.isochrones" background="white" no-shadow>
        <div slot="header">
          <h3>{{$t('global.parameters')}}</h3>
        </div>
        <fields-container @fieldUpdated="filterUpdated" :parameters="OrsMapFiltersAccessor"></fields-container>
        <br/>
      </box>
      <br>
    </v-form>
  </div>
</template>
<script src="./isochrones.js"></script>

<style scoped src="./isochrones.css"></style>
