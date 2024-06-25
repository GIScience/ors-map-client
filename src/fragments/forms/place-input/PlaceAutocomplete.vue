<template>
  <div>
    <v-text-field class="locationInput"
                  v-model="model.placeName"
                  :persistent-hint="true"  :hint="'Location'"
                  @click="setFocus(true)"
                  @keyup="locationInputChanged($event)">
      <template v-slot:append-outer>
        <v-btn v-if="appendBtn === 'map'" icon small flat class="append-input-btn" :title="$t('placeInput.clickOnTheMapBtnToPickAPlace')"
               @click="pickPlaceMapClick($event)"
               v-smart-tooltip="{text: $t('placeInput.clickOnTheMapBtnToPickAPlace'), position: 'bottom', dark: true, showOnce: true, name: 'pickAPlaceOnTheMap'}">
          <v-icon left>map</v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <box background="white" v-if="placeSuggestions.length !== 0">
      <v-list-tile class="place-suggestion" :class="{'raw-coord': placeSuggested.rawCoordinate}" @click="selectSuggestion(placeSuggested)" :key="placeSuggested.id" v-for='placeSuggested in placeSuggestions'
                   :title="placeSuggested.placeName.trim()">
        <v-list-tile-action class="hidden-sm-and-down">
          <v-icon v-if="placeSuggested.properties.layer === 'locality' || placeSuggested.properties.layer === 'city' || placeSuggested.properties.layer === 'county'">location_city</v-icon>
          <img alt="Icon or image for suggested place" width="25px" v-else-if="showAreaIcon(placeSuggested)" :src="getImgSrc('countryIconImgSrc')" height="auto" />
          <v-icon v-else>place</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :title="placeSuggested.placeName.trim()">
            <v-btn style="min-width: fit-content" flat small @click.stop="selectSuggestion(placeSuggested)" class="no-padding no-margin no-capitalize">
              {{highlightedName(placeSuggested.placeName)}}
            </v-btn>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ getLayerTranslation(placeSuggested.properties.layer) }}
            <span v-if="placeSuggested.properties.locality"> - {{ placeSuggested.properties.locality }} </span>
            <span v-if="placeSuggested.properties.country"> - {{ placeSuggested.properties.country }} </span>
            <span class="approximate-distance" :title="$t('placeInput.approximateDistance')">
                                ~{{distance(placeSuggested)}}
                                {{$t('global.units.' + $store.getters.mapSettings.unit)}}
                              </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </box>
  </div>
</template>

<script src="./place-autocomplete.js"></script>
<style scoped src="./place-autocomplete.css"></style>
