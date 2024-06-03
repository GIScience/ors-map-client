<template>
  <div>
    <v-dialog v-model="isEditOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" closable @closed="closeEditModal()">
        <h3 slot="header" style="padding-right: 55px">
          <download :download-formats-supported="['json', 'geojson', 'csv']" :data="editData" :edit-prop="editProp"></download>
          <v-btn class="edit-header-btn" flat :style="{background: 'white'}" @click="isImportOpen=true" :title="content.import">
            <v-icon color="primary">cloud_upload</v-icon>
          </v-btn>
          <v-btn class="edit-header-btn" flat :style="{}" @click="addItem()" :title="content.add">
            <v-icon color="info">add</v-icon>
          </v-btn>
          {{ headerText }}
        </h3>
        <v-btn v-if="this.editData.length === 0" style="margin-top: 10px" color="info" block :title="content.fromMap" @click="addItem(true)">
          <v-icon style="margin-right: 5px;">map</v-icon>
          {{ content.fromMap }}
        </v-btn>
        <v-alert v-if="editData.length > content.maxLength" :value="true" type="warning" style="color:black" >
          {{ content.maxWarning }}
        </v-alert>
        <v-card @click="editId = i+1" elevation="3" style="margin: 5px;cursor: pointer" v-for="(d, i) in editData" :key="i">
          <v-card-title style="padding-bottom: 0;">
            <div v-if="jobsBox"><b>Job {{ d.id }} - {{ d.location ? d.location[0].toPrecision(8) + ',' + d.location[1].toPrecision(8) : 'please add Location'}}</b></div>
            <div v-else><b><v-icon :color="vehicleColors(d.id)" class="pr-5">{{vehicleIcon(d.profile)}}</v-icon>{{ content.item }} {{ d.id }}</b></div>
            <v-btn v-if="editId === d.id" class="edit-btn" small icon :style="{background: 'white'}" @click.stop="editId = 0" :title="$t('editDialog.keepEdits')">
              <v-icon color="success">check</v-icon>
            </v-btn>
            <v-btn v-else class="edit-btn" small icon :style="{background: 'white'}" @click.stop="editId = d.id" :title="content.edit">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn class="edit-btn" small icon :style="{background: 'white'}" @click.stop="duplicateItem(d.id)" :title="content.duplicate">
              <v-icon color="info">content_copy</v-icon>
            </v-btn>
            <v-btn class="edit-btn" small icon :style="{background: 'white'}" @click.stop="removeItem(d.id)" :title="content.remove">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="editId !== d.id && jobsBox">
              <span v-for="(v, k) in d" :key="k">
                <v-chip v-if="['service'].includes(k) && v !== 0">{{ $t(`optimization.${k}`) }}: {{v}}</v-chip>
                <v-chip v-else-if="['delivery', 'pickup'].includes(k) && v[0] !== 0">{{ $t(`optimization.${k}`) }}: {{v[0]}}</v-chip>
                <v-chip v-else-if="k === 'skills' && v.length">{{ $t(`optimization.${k}`) }}: {{skillNames(d)}}</v-chip>
              </span>
            </div>
            <div v-else-if="editId !== d.id && d.start">
              Start: {{ d.start[0].toPrecision(8) }}, {{ d.start[1].toPrecision(8) }} - End: {{ d.end[0].toPrecision(8) }}, {{ d.end[1].toPrecision(8) }}
            </div>
            <div v-else>
              <div v-if="jobsBox && !d.location">
                <place-autocomplete v-if="jobsBox" :jobs="editData" :edit-id="editId" :show-edit-box="isEditOpen"></place-autocomplete>
              </div>
              <div v-else-if="vehiclesBox && !d.start">
                <place-autocomplete :vehicles="editData" :edit-id="editId" :show-edit-box="isEditOpen" :new-end-point="newEndPoint" :only-start-point="onlyStartPoint"></place-autocomplete>
                <v-text-field v-if="onlyStartPoint" v-model="editData[i].end" :persistent-hint="true" :hint="'End'"></v-text-field>
              </div>
              <div v-else-if="vehiclesBox && newEndPoint">
                <v-text-field v-model="editData[i].start" :persistent-hint="true" :hint="'Start'"></v-text-field>
                <place-autocomplete :vehicles="editData" :edit-id="editId" :show-edit-box="isEditOpen" :new-end-point="newEndPoint" :only-start-point="onlyStartPoint"></place-autocomplete>
              </div>
              <div v-else-if="jobsBox">
                <v-text-field v-model="editData[i].location" :persistent-hint="true" :hint="'Location'" append-icon="search" @click:append="switchToSearch"></v-text-field>
              </div>
              <div v-else-if="sameStartEndPoint">
                <v-text-field v-model="editData[i].start" :persistent-hint="true" :hint="'Start & End'" append-icon="search" @click:append="switchToSearch('start')" append-outer-icon="add" @click:append-outer="newEndPoint=true"></v-text-field>
              </div>
              <div v-else>
                <v-text-field v-model="editData[i].start" :persistent-hint="true" :hint="'Start'" append-icon="search" @click:append="switchToSearch('start')"></v-text-field>
                <v-text-field v-model="editData[i].end" :persistent-hint="true" :hint="'End'" append-icon="search" @click:append="switchToSearch('end')" append-outer-icon="delete" @click:append-outer="removeEndPoint(i)"></v-text-field>
              </div>

              <v-layout row-wrap>
                <v-text-field v-if="jobsBox" v-model.number="editData[i].delivery[0]" type="number" style="padding-right: 10px" :persistent-hint="true" :hint="$t('optimization.delivery')"></v-text-field>
                <v-text-field v-if="jobsBox" v-model.number="editData[i].pickup[0]" type="number" style="padding-left: 10px" :persistent-hint="true" :hint="$t('optimization.pickup')"></v-text-field>
                <v-item-group v-if="vehiclesBox" style="margin: 10px 15px 0 0; border: solid lightgray 1px; padding: 10px">
                  <v-layout class="profile-options-wrapper">
                    <v-item v-for="profile in profilesMapping" :key="profile.slug">
                      <v-flex style="min-width: 48px">
                        <profile-selector-option @profileSelected="profileSelected" :profile="profile"
                                                 :active-profile-slug="vehicleProfile(i)" :active-vehicle-type="editData[i].profile"
                                                 :is-vehicle="true">
                        </profile-selector-option>
                      </v-flex>
                    </v-item>
                  </v-layout>
                </v-item-group>
                <v-text-field v-if="vehiclesBox" v-model.number="editData[i].capacity[0]" type="number" style="width: 50%" :persistent-hint="true" :hint="'Capacity'"></v-text-field>
              </v-layout>
              <v-text-field v-if="jobsBox" v-model.number="editData[i].service" :persistent-hint="true" :hint="$t('editDialog.service')"></v-text-field>
              <v-layout row-wrap>
                <v-text-field v-if="vehiclesBox" v-model.number="editData[i].time_window[0]" style="padding-right: 10px" :persistent-hint="true" :hint="$t('editDialog.start') + $t('editDialog.timeWindow')"></v-text-field>
                <v-text-field v-if="vehiclesBox" v-model.number="editData[i].time_window[1]" style="padding-right: 10px" :persistent-hint="true" :hint="$t('editDialog.end') + $t('editDialog.timeWindow')"></v-text-field>
              </v-layout>

              <v-select v-model="editData[i].skills" :items="editSkills" :item-text="'name'" :item-value="'id'" return-object chips deletable-chips
                        :persistent-hint="true" :hint="content.skills" multiple :menu-props="{'closeOnContentClick':true}">
                <template v-slot:append-item>
                  <v-divider class="mt-2"></v-divider>
                  <v-btn @click="showSkillManagement = true">
                    <v-icon :title="$t('optimization.manage') + $t('optimization.skills')" color="dark" :medium="$lowResolution">settings</v-icon>
                    {{ 'manage Skills' }}
                  </v-btn>
                </template>
              </v-select>
            </div>
          </v-card-text>
        </v-card>
        <v-layout row :wrap="$lowResolution">
          <v-flex v-if="data.length" text-xs-left xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
            <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                   @click="clearData">{{ $t('optimization.clear') + content.expected }}</v-btn>
          </v-flex>
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <v-flex text-xs-right xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
            <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                   @click="closeEditModal">{{$t('global.cancel')}}</v-btn>
          </v-flex>
          <v-flex text-xs-right xs12 sm3 md3 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
            <v-btn :block="$lowResolution" color="success" :title="$t('global.save')" @click="saveItems">
              {{$t('global.save')}}
              <v-icon style="margin-left: 5px;">save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </box>
    </v-dialog>
    <edit-skills v-if="showSkillManagement" :skills="skills" :skills-in-use="editSkillsJson" @skillsChanged="skillsChanged" @close="showSkillManagement=false"></edit-skills>
    <optimization-import v-if="isImportOpen" :expected-data="content.expected" @saveOptimizationImport="saveImport"
                         @close="isImportOpen=false"></optimization-import>
  </div>
</template>

<script src="./edit-dialog.js"></script>
<style scoped src="./edit-dialog.css"></style>
