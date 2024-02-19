<template>
  <div>
    <v-dialog v-model="isVehiclesOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" closable @closed="closeVehiclesModal()">
        <h3 slot="header" style="padding-right: 55px">
          {{ $t('optimization.manageVehicles') }}  {{ `editing ${editId}`}}
          <v-btn class="edit-vehicles-btn" flat :style="{background: 'white'}" @click="exportVehicles()" :title="$t('optimization.exportVehicleFile')">
            <v-icon color="primary">cloud_download</v-icon>
          </v-btn>
          <v-btn class="edit-vehicles-btn" flat :style="{background: 'white'}" @click="importVehicles()" :title="$t('optimization.importVehicleFile')">
            <v-icon color="primary">cloud_upload</v-icon>
          </v-btn>
          <v-btn class="edit-vehicles-btn" flat :style="{background: 'white', 'padding-right':'15px'}" @click="saveVehicles()" :title="$t('optimization.saveVehicles')">
            <v-icon color="success">save</v-icon>
          </v-btn>
          <v-btn class="edit-vehicles-btn" flat :style="{}" @click="addVehicle()" :title="$t('optimization.addVehicle')">
            <v-icon color="info">add</v-icon>
          </v-btn>
        </h3>
        <v-card @click="editId = i+1" elevation="3" style="margin: 5px;cursor: pointer" v-for="(v, i) in editVehicles" :key="i">
          <v-card-title style="padding-bottom: 0;">
            <div><b>Vehicle {{ v.id }}</b></div>
            <v-btn v-if="editId === v.id" class="edit-btn" flat small :style="{background: 'white'}" @click.stop="editId = 0" :title="$t('optimization.editVehicle')">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn class="remove-btn" small icon :style="{background: 'white'}" @click.stop="removeVehicle(v.id)" :title="$t('optimization.removeVehicle')">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="v.start && editId !== v.id">Start: {{ v.start[0].toPrecision(8) }}, {{ v.start[1].toPrecision(8) }} -
              End: {{ v.end[0].toPrecision(8) }}, {{ v.end[1].toPrecision(8) }}</div>
            <div v-else>
              <div v-if="!v.start">
                <v-text-field class="locationInput"
                              v-model="model.placeName"
                              :persistent-hint="true"  :hint="'Location'"
                              @click="setFocus(true)"
                              @keyup="locationInputChanged($event)">
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
                        <v-btn v-html="highlightedName(placeSuggested.placeName)" style="min-width: fit-content" flat small @click.stop="selectSuggestion(placeSuggested)" class="no-padding no-margin no-capitalize">
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
                <v-text-field v-if="onlyStartPoint" v-model="editVehicles[i].end" :persistent-hint="true" :hint="'End'"></v-text-field>
              </div>
              <div v-else-if="newEndPoint">
                <v-text-field v-model="editVehicles[i].start" :persistent-hint="true" :hint="'Start'"></v-text-field>
                <v-text-field class="locationInput"
                              v-model="model.placeName"
                              :persistent-hint="true"  :hint="'End'"
                              @click="setFocus(true)"
                              @keyup="locationInputChanged($event)">
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
                        <v-btn v-html="highlightedName(placeSuggested.placeName)" style="min-width: fit-content" flat small @click.stop="selectSuggestion(placeSuggested)" class="no-padding no-margin no-capitalize">
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
              <div v-else-if="sameStartEndPoint">
                <v-text-field v-model="editVehicles[i].start" :persistent-hint="true" :hint="'Start & End'" append-icon="search" @click:append="switchToSearch('start')"></v-text-field>
                <v-btn class="small-btn" small flat @click="addEndPoint">+ add different end point</v-btn>
              </div>
              <div v-else>
                <v-text-field v-model="editVehicles[i].start" :persistent-hint="true" :hint="'Start'" append-icon="search" @click:append="switchToSearch('start')"></v-text-field>
                <v-text-field v-model="editVehicles[i].end" :persistent-hint="true" :hint="'End'" append-icon="search" @click:append="switchToSearch('end')" append-outer-icon="delete" @click:append-outer="removeEndPoint(i)"></v-text-field>
              </div>
              <v-text-field v-model.number="editVehicles[i].capacity[0]" type="number" style="width: 50%" :persistent-hint="true" :hint="'Capacity'"></v-text-field>
              <v-text-field v-model="editVehicles[i].time_window" :persistent-hint="true" :hint="'Working time window (in seconds passed since 00:00 or timestamp)'"></v-text-field>
              <v-select v-model="editVehicles[i].skills" :items="vehicleSkills" :item-text="'name'" :item-value="'id'" return-object chips deletable-chips
                        :persistent-hint="true" :hint="'Skills this Vehicle has'" multiple :menu-props="{'closeOnContentClick':true}">
                <template v-slot:append-item>
                  <v-divider class="mt-2"></v-divider>
                  <v-btn @click="manageSkills">
                    <v-icon :title="$t('optimization.manageSkills')" color="dark" :medium="$lowResolution">settings</v-icon>
                    {{ 'manage Skills' }}
                  </v-btn>
                </template>
              </v-select>
            </div>
          </v-card-text>
        </v-card>
        <v-layout row :wrap="$lowResolution">
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <v-flex text-xs-right xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
            <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                   @click="closeVehiclesModal">{{$t('global.cancel')}}</v-btn>
          </v-flex>
          <v-flex text-xs-right xs12 sm3 md3 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
            <v-btn :block="$lowResolution" color="success" :title="$t('global.save')" @click="saveVehicles">
              {{$t('global.save')}}</v-btn>
          </v-flex>
        </v-layout>
      </box>
    </v-dialog>
    <edit-skills v-if="showSkillManagement" :skills="skills" @skillsChanged="skillsChanged" @close="showSkillManagement=false"></edit-skills>
    <v-dialog v-model="isImportOpen" max-width="500" :persistent="true" attach="body">
      <box background="white" closable @closed="closeImport()">
        <h3 slot="header" style="padding-right: 55px">
          {{ $t('optimization.importVehicleFile') }}
          <v-btn class="edit-vehicles-btn" flat :style="{background: 'white'}" @click="saveVehicleImport()" :title="$t('optimization.saveJobs')">
            <v-icon color="success">save</v-icon>
          </v-btn>
        </h3>
        <v-textarea v-model="pastedVehicles" :persistent-hint="true" :hint="'paste JSON here'" auto-grow :placeholder="JsonPlaceholder"></v-textarea>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./edit-vehicles.js"></script>
<style scoped src="./edit-vehicles.css"></style>
