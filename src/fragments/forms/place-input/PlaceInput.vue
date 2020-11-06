<template>
  <div v-click-outside="setFocus" :id="'place-input-container-' + index" >
    <v-layout row wrap >
      <v-flex v-bind="{[inputColumns]: true}">
        <v-text-field class="place-input"
          v-focus="getAutomaticFocus"
          v-model="model.placeName"
          clearable
          flat
          :box="box"
          :hide-details="hideDetails"
          :hint="hint"
          :persistent-hint="!hideDetails"
          :height="height"
          :style="{'margin-bottom': mb +'px'}"
          :disabled="disabled"
          :label="placeInputLabel"
          @click="setFocus(true)"
          @keyup="changed($event)"
          @click:clear="() => placeCleared(index)">
          <template v-slot:append>
            <v-btn v-if="appendIcon === 'map'" icon small flat class="append-input-btn" :title="$t('placeInput.clickOnTheMapBtnToPickAPlace')"
              @click="appendClick($event)"
              v-popper-tooltip="{show: model.isEmpty() && (getAutomaticFocus || isMobile), text: $t('placeInput.clickOnTheMapBtnToPickAPlace'), position: 'bottom', dark: true, saveClose: true, name: 'pickAPlaceOnTheMap'}">
              <v-icon left>map</v-icon>
            </v-btn>
            <v-btn v-else icon small flat class="append-input-btn" :title="$t('placeInput.clickToSearchAndShowResultsOnTheMap')"
              @click="appendClick($event)">
              <v-icon left>search</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex v-if="iconsBtnCounter > 0" v-bind="{[iconsColumns]: true}" class="input-btns">
        <v-btn flat class="input-btn" :class="{small: $mdAndUpResolution}" v-if="deleteAvailable && $mdAndUpResolution"  @click="deletePlace()">
          <v-icon :title="$t('placeInput.removeInput')" class="input-icon" >delete</v-icon>
        </v-btn>
        <v-btn flat class="input-btn" :class="{small: $mdAndUpResolution}" v-if="directIsAvailable && $mdAndUpResolution"  @click="toggleDirect()">
          <v-icon :color="this.model.direct? 'primary': 'dark'" :title="$t('placeInput.toggleDirect')" class="input-icon" >settings_ethernet</v-icon>
        </v-btn>

        <v-btn flat class="input-btn" :id="getNewGuid('directions')" :class="{small: $mdAndUpResolution}" 
          v-if="directionsAvailable" @click="startDirections()"
          v-popper-tooltip="{show: directionsButtonTooltip, text: $t('placeInput.goToDirectionsMode'), position: directionsButtonTooltipPosition, dark: true, showOnce: true, name: 'useDiretionsButton'}">
          <v-icon :title="$t('placeInput.directions')" color="dark" :large="$lowResolution" class="input-icon" >directions</v-icon>
        </v-btn>

        <v-btn flat class="input-btn" :class="{small: $mdAndUpResolution}" v-if="switchCoordsAvailable && ($mdAndUpResolution)" @click="switchCoords()">
          <v-icon :title="$t('placeInput.switchCoords')" color="dark" :large="$lowResolution" class="input-icon" >compare_arrows</v-icon>
        </v-btn>

        <v-menu class="floating-menu" transition="slide-y-transition" v-if="placeMenuAvailable" v-model="placeInputFloatingMenu"
          :close-on-click="true"
          :close-on-content-click="true"
          bottom >

          <v-btn slot="activator" flat class="floating-menu-activator no-padding">
            <v-icon  :title="$t('placeInput.openInputOptions')" style="font-size:29px" color="dark" large class="input-icon" >more_vert</v-icon>
          </v-btn>
          <v-list light style="background:white" class="input-pop-up-list">
            <v-list-tile @click.stop="deletePlace()" v-if="deleteAvailable">
              <v-list-tile-title>
                <v-btn flat class="no-padding">
                  <v-icon :title="$t('placeInput.removeInput')" color="dark" large >delete</v-icon>
                </v-btn>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="switchCoordsAvailable">
              <v-list-tile-title>
                <v-btn flat class="no-padding" @click.stop="switchCoords()">
                  <v-icon :title="$t('placeInput.switchCoords')" color="dark" large >compare_arrows</v-icon>
                </v-btn>
              </v-list-tile-title>
            </v-list-tile>
             <v-list-tile v-if="directIsAvailable">
              <v-list-tile-title>
                <v-btn flat class="input-btn" @click.stop="toggleDirect()">
                  <v-icon :color="this.model.direct? 'primary': 'dark'" :title="$t('placeInput.toggleDirect')" class="input-icon" >settings_ethernet</v-icon>
                </v-btn>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    <div class="suggestions shadow" :class="{'scrollable': $lowResolution && placeSuggestions.length > 0, 'multiple-input': !single && $lowResolution}"  v-if="showSuggestion">
      <v-layout row>
        <v-flex>
          <v-layout row>
            <v-flex xs10 sm10 md11>
              <v-list-tile  @click.stop="setLocationFromBrowser()" v-if="showBrowserLocationInPlacesList" :title="$t('placeInput.yourLocation')">
                <v-list-tile-action>
                  <v-icon>gps_fixed</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-btn flat small @click.stop="setLocationFromBrowser()" class="no-padding no-margin no-capitalize">
                      {{ $t('placeInput.yourLocation') }}
                    </v-btn>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{ $t('placeInput.fromYourBrowser') }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs2 sm2 md1 >
              <div>
                <v-btn flat small fab class="close-suggestions no-marging no-padding" style="width:40px" @click="setFocus(false)">
                  <v-icon :title="$t('global.close')" :large="$lowResolution" >close</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
          <v-list-tile @click.stop="suggestionClicked(placeSuggested)" :key="placeSuggested.id" v-for='placeSuggested in placeSuggestions'
            :title="placeSuggested.placeName">
            <v-list-tile-action class="hidden-sm-and-down">
              <v-icon>place</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :title="placeSuggested.placeName">
                <v-btn flat small @click.stop="suggestionClicked(placeSuggested)" class="no-padding no-margin no-capitalize">
                  {{ placeSuggested.placeName }}
                </v-btn>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ $t('global.layers.'+ placeSuggested.properties.layer) }}
                <span v-if="placeSuggested.properties.country"> - {{ placeSuggested.properties.country }} </span>
                <span class="approximate-distance" :title="$t('placeInput.approximateDistance')">
                  ~{{distance(placeSuggested)}}
                  {{$t('global.units.' + $store.getters.mapSettings.unit)}}
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>        
      </v-layout>
    </div>
  </div>
</template>

<script src="./place-input.js"></script>

<style scoped src="./place-input.scss"></style>

