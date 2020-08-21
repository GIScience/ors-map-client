<template>
  <div>
    <v-form style="background:white" @submit.prevent>
      <template >
        <ul class="place-inputs">
          <draggable v-model="places" @end="onReordered()" handle=".reorder-handle">
            <li :key="index" v-for="(place, index) in getPlaces">
              <v-layout row >
                <v-flex xs1 v-if="$store.getters.mode === constants.modes.directions">
                  <v-icon class="reorder-handle">drag_indicator</v-icon>
                </v-flex>
                <v-flex v-bind="{[ $store.getters.mode === constants.modes.directions? 'xs11' : 'xs12']: true}">
                  <place-input :ref="'place'+index"
                    :support-directions="$store.getters.mode === constants.modes.place || $store.getters.mode === constants.modes.directions"
                    :box="places.length === 1"
                    :index="index"
                    :autofocus="autofocusEnabled(index)"
                    :model="places[index]"
                    :single="places.length === 1"
                    :is-last="(places.length -1) === index && index !== 0"
                    @selected="selectPlace"
                    @delete="removePlaceInput"
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
         <form-actions :place-inputs="places.length"
            @addPlaceInput="addInput"
            @clearPlaces="clearPlaces"
            @reverseRoute="reverseRoute"
            @toggleRoundTrip="toggleRoundTrip"
            @contentUploaded="contentUploaded">
          </form-actions>
      </v-layout>
      <br/>
      <template  v-if="showRouteDetails" >
        <route-details  :map-view-data="mapViewData"></route-details>
        <br/>
      </template>
      <template v-if="showAltitudePreview">
        <altitude-preview :map-view-data="mapViewData" ></altitude-preview>
        <br/>
      </template>
      <round-trip v-if="$store.getters.mode === constants.modes.roundTrip" @changed="roundTripFilterChanged"></round-trip>
      <template v-if="$store.getters.mode === constants.modes.directions">
        <fields-container @fieldUpdated="filterUpdated" :parameters="OrsMapFiltersAccessor"></fields-container>
        <br/>
      </template>
      <place-details v-if="showPlaceDetails" :map-view-data="mapViewData"></place-details>
    </v-form>
  </div>
</template>

<script src="./places-and-directions.js"></script>
<style scoped src="./places-and-directions.css"></style>
<style src="./form-actions.css"></style>
