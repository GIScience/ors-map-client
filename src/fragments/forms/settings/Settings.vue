<template>
  <v-container fluid>
    <v-form @keyup.native.enter="saveAll">
      <v-slide-y-transition mode="out-in">
        <div>
          <br>
          <v-expansion-panel slot="content" :value="0">
            <v-expansion-panel-content class="panel-content" style="background: transparent;">
              <div slot="header">
                <h4>{{$t('settings.language')}}</h4>
              </div>
              <v-list>
                <v-list dense>
                  <div style="padding:0 0 0 10px">
                    <v-layout row>
                      <v-spacer></v-spacer>
                      <v-flex sm6>
                        <v-select :label="$t('settings.appLocale')" :items="appLocales"
                          v-model="mapSettingsTransient.locale"></v-select>
                      </v-flex>
                      <v-flex sm6>
                        <v-select :label="$t('settings.unit')" :items="availableUnits"
                          v-model="mapSettingsTransient.unit"></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-spacer></v-spacer>
                      <v-flex sm6>
                        <v-select :label="$t('settings.routeInstructions')" :items="routingLocales"
                          v-model="mapSettingsTransient.routingInstructionsLocale"></v-select>
                      </v-flex>
                      <v-flex sm6>
                        <v-select :label="$t('settings.areaUnit')" :items="availableAreaUnits"
                          v-model="mapSettingsTransient.areaUnit"></v-select>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-list>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <br>
          <v-expansion-panel slot="content" :value="null">
            <v-expansion-panel-content class="panel-content" style="background: transparent;">
              <div slot="header">
                <h4>{{$t('settings.mapSettings')}}</h4>
              </div>
              <v-list>
                <v-list dense>
                  <v-container fluid style="padding-top: 0;padding-bottom: 0">
                    <h4>{{$t('settings.routeExtraInfo')}}</h4>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.elevationProfile"
                      :label="$t('settings.elevationProfile')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.steepness"
                      :label="$t('global.steepness')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.surface"
                      :label="$t('global.surface')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.waytype"
                      :label="$t('global.waytypes')"></v-checkbox>

                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.tollways"
                      :label="$t('global.tollways')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.waycategory"
                      :label="$t('global.waycategory')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.traildifficulty"
                      :label="$t('global.traildifficulty')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.roadaccessrestrictions"
                      :label="$t('global.roadaccessrestrictions')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.green" :label="$t('global.green')">
                    </v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.noise" :label="$t('global.noise')">
                    </v-checkbox>

                    <!-- options to be enabled when the features that use them are implemented -->
                    <!-- <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.distanceMarkers" :label="$t('settings.distanceMarkers')" ></v-checkbox> -->
                  </v-container>
                </v-list>
              </v-list>
              <v-list dense>
                <v-container fluid style="padding-top: 0;padding-bottom: 0">
                  <h4>{{$t('settings.mapViewOptions')}}</h4>
                  <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.alwaysFitBounds"
                    :label="$t('settings.alwaysFitBounds')"></v-checkbox>
                  <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.prioritizeSearchingForNearbyPlaces"
                    :label="$t('settings.prioritizeSearchingForNearbyPlaces')"></v-checkbox>
                  <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.autoFitHighlightedBounds"
                    :label="$t('settings.autoFitHighlightedBounds')"></v-checkbox>
                  <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.alternativeIsochroneColors"
                    :label="$t('settings.alternativeIsochroneColors')"></v-checkbox>
                  <v-select :label="$t('settings.defaultTilesProvider')" :items="availableTileServices"
                    v-model="mapSettingsTransient.defaultTilesProvider"></v-select>
                </v-container>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <br>
          <v-expansion-panel slot="content" :value="null">
            <v-expansion-panel-content class="panel-content" style="background: transparent;">
              <div slot="header">
                <h4>{{$t('settings.advanced')}}</h4>
              </div>
              <div style="padding:5px">
                <i>{{$t('settings.advancedSettingsWarning')}}</i>
              </div>
              <br>
              <v-list>
                <v-list dense>
                  <div style="padding:0 0 0 10px">
                    <v-text-field hide-details clearable required flat v-model="mapSettingsTransient.apiKey"
                      :type="customApiKey ? 'text' : 'password'" @change="setIsCustomApiKey"
                      :style="{'margin-bottom':'10px'}" :label="apiKeyLabel">
                    </v-text-field>
                  </div>
                  <div style="padding:0 0 0 10px">
                    <v-text-field hide-details clearable required flat v-model="mapSettingsTransient.apiBaseUrl"
                      :style="{'margin-bottom':'10px'}" :label="$t('settings.apiBaseUrl')">
                    </v-text-field>
                  </div>
                </v-list>
                <v-divider></v-divider>
                <v-list dense>
                  <div style="padding:0 0 0 10px">
                    <h4>{{$t('settings.endpointsSectionTitle')}}</h4>
                    <v-text-field v-for="(endpoint, key) in mapSettingsTransient.endpoints" :key="key" hide-details
                      clearable required flat v-model="mapSettingsTransient.endpoints[key]"
                      :style="{'margin-bottom': '10px'}" :label="$t('settings.endpointsTitle.' + key)">
                    </v-text-field>

                    <v-text-field clearable flat v-model="mapSettingsTransient.customTileProviderUrl"
                      :style="{'margin-bottom':'10px'}" :hint="$t('settings.customTileProviderUrlHint')"
                      :placeholder="$t('settings.customTileProviderUrlHint')"
                      :label="$t('settings.customTileProviderUrl')">
                    </v-text-field>

                    <v-text-field clearable flat v-model="mapSettingsTransient.customOverlayerTileProviderUrl"
                      :style="{'margin-bottom':'10px'}" :hint="$t('settings.customTileProviderUrlHint')"
                      :placeholder="$t('settings.customTileProviderUrlHint')"
                      :label="$t('settings.customOverlayerTileProviderUrl')">
                    </v-text-field>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.useStopOptimization"
                      :label="$t('settings.useStopOptimization')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0"
                      v-model="mapSettingsTransient.convertStopAfterRouteEndingToDestination"
                      :label="$t('settings.convertStopAfterRouteEndingToDestination')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.compressDataUrlSegment"
                      :label="$t('settings.compressDataUrlSegment')"></v-checkbox>
                    <v-checkbox class="pt-0 top-0" v-model="mapSettingsTransient.skipAllSegments"
                      :label="$t('global.rawRouting') + ' - ' + $t('settings.skipAllSegments')"></v-checkbox>

                  </div>
                </v-list>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <br>
          <v-layout row :wrap="$lowResolution">
            <v-flex>
              <v-checkbox v-model="mapSettingsTransient.saveToLocalStorage" :label="$t('settings.saveToLocalStorage')">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox v-model="resetShownOnceTooltips" :label="$t('settings.resetShownOnceTooltips')"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row :wrap="$lowResolution">
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <v-flex text-xs-right xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
              <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                @click="restoreDefaultMapSettings">{{$t('settings.restoreDefaults')}}</v-btn>
            </v-flex>
            <v-flex text-xs-right xs12 sm3 md3 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
              <v-btn :block="$lowResolution" color="primary" :title="$t('global.save')" @click="saveAll">
                {{$t('global.save')}}</v-btn>
            </v-flex>
          </v-layout>
          <br>
        </div>
      </v-slide-y-transition>
    </v-form>
  </v-container>
</template>

<script src="./settings.js"></script>
<style scoped src="./settings.css"></style>
