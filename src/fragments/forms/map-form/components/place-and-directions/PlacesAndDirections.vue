<template>
  <div>
    <v-form style="background:white" @submit.prevent>
      <template >
        <ul class="place-inputs">
          <draggable v-model="places" @end="onReordered()" handle=".reorder-handle">
            <li :key="index" v-for="(place, index) in getPlaces">
              <v-layout row >
                <v-flex sm2 md1 v-if="$store.getters.mode === constants.modes.directions">
                  <v-btn class="reorder-handle" small flat icon :title="$t('placesAndDirections.reorder')">
                    <v-icon color="dark">reorder</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex v-bind="{[ $store.getters.mode === constants.modes.directions? 'sm10 md11' : 'sm12']: true}">
                  <place-input :ref="'place'+index"
                    id-postfix="places-and-directions"
                    :support-directions="inputSupportsDirections"
                    :directions-button-tooltip="$store.getters.isSidebarVisible && active"
                    directions-button-tooltip-position="right"
                    support-direct-routing
                    :pick-place-supported="places.length > 1"
                    :support-search="places.length === 1"
                    :box="places.length === 1"
                    :index="index"
                    :autofocus="autofocusEnabled(index)"
                    :model="places[index]"
                    :single="places.length === 1"
                    :is-last="(places.length -1) === index && index !== 0"
                    @selected="selectPlace"
                    @changedDirectPlace="changedDirectPlace"
                    @removeInput="removePlaceInput"
                    @startDirections="startDirections"
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
            @addPlaceInput="addInput"
            @clearPlaces="clearPlaces"
            @reverseRoute="reverseRoute"
            @toggleRoundTrip="toggleRoundTrip"
            @contentUploaded="contentUploaded">
          </form-actions>
      </v-layout>
      <br/>
      <template  v-if="showRouteDetails" >
        <route-details :map-view-data="mapViewData"></route-details>
        <br/>
      </template>
      <round-trip v-if="$store.getters.mode === constants.modes.roundTrip" @changed="roundTripFilterChanged"></round-trip>
      <box v-if="$store.getters.mode === constants.modes.directions" background="white" no-shadow>
        <div slot="header">
          <h3>{{$t('global.parameters')}}</h3>
        </div>
        <fields-container @fieldUpdated="filterUpdated" :parameters="OrsMapFiltersAccessor"></fields-container>
        <br/>
      </box>
      <template v-if="showAltitudePreview">
        <br>
        <altitude-preview :map-view-data="mapViewData" ></altitude-preview>
        <br/>
      </template>
      <place-details v-if="showPlaceDetails" :map-view-data="mapViewData"></place-details>
    </v-form>
  </div>
</template>

<script src="./places-and-directions.js"></script>
<style scoped src="./places-and-directions.css"></style>
<style src="./form-actions.css"></style>
