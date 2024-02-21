<template>
  <div>
    <v-dialog v-model="isJobsOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" closable @closed="closeJobsModal()">
        <h3 slot="header" style="padding-right: 55px">
          {{ $t('optimization.manageJobs') }}  {{ `editing ${editId}`}}
          <v-btn class="edit-jobs-btn" flat :style="{background: 'white'}" @click="exportJobs()" :title="$t('optimization.exportJobFile')">
            <v-icon color="primary">cloud_download</v-icon>
          </v-btn>
          <v-btn class="edit-jobs-btn" flat :style="{background: 'white'}" @click="importJobs()" :title="$t('optimization.importJobFile')">
            <v-icon color="primary">cloud_upload</v-icon>
          </v-btn>
          <v-btn class="edit-jobs-btn" flat :style="{background: 'white'}" @click="saveJobs()" :title="$t('optimization.saveJobs')">
            <v-icon color="success">save</v-icon>
          </v-btn>
          <v-btn class="edit-jobs-btn" flat :style="{}" @click="addJob()" :title="$t('optimization.addJob')">
            <v-icon color="info">add</v-icon>
          </v-btn>
        </h3>
        <v-card @click="editId = i+1" elevation="3" style="margin: 5px;cursor: pointer" v-for="(j, i) in editJobs" :key="i">
          <v-card-title style="padding-bottom: 0;">
            <div v-if="j.location"><b>Job {{ j.id }} - {{ j.location[0].toPrecision(8) }}, {{ j.location[1].toPrecision(8)}}</b></div>
            <div v-else><b>Job {{ j.id }} - please add Location</b></div>
            <v-btn v-if="editId === j.id" class="edit-btn" flat small :style="{background: 'white'}" @click.stop="editId = 0" :title="$t('optimization.editJob')">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn class="copy-btn" flat small :style="{background: 'white'}" @click.stop="copyJob(j.id)" :title="$t('optimization.copyJob')">
              <v-icon color="info">content_copy</v-icon>
            </v-btn>
            <v-btn class="remove-btn" small icon :style="{background: 'white'}" @click.stop="removeJob(j.id)" :title="$t('optimization.removeJob')">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="editId !== j.id">
              <div style="width: 100%; height: auto" v-for="(v, k) in j" :key="k">
                <div v-if="['service', 'skill', 'amount'].includes(k)">
                  <v-chip v-if="v && v.length">{{k}}: {{v}}</v-chip>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="!j.location">
                <place-autocomplete :jobs="editJobs" :edit-id="editId" :show-edit-box="isJobsOpen"></place-autocomplete>
              </div>
              <div v-else><v-text-field v-model="editJobs[i].location" :persistent-hint="true" :hint="'Location'" append-icon="search" @click:append="switchToSearch"></v-text-field></div>
              <v-layout row-wrap>
                <v-text-field v-model.number="editJobs[i].delivery[0]" type="number" style="padding-right: 10px" :persistent-hint="true" :hint="$t('optimization.delivery')"></v-text-field>
                <v-text-field v-model.number="editJobs[i].pickup[0]" type="number" style="padding-left: 10px" :persistent-hint="true" :hint="$t('optimization.pickup')"></v-text-field>
              </v-layout>
              <v-text-field v-model.number="editJobs[i].service" :persistent-hint="true" :hint="'Service time (in seconds)'"></v-text-field>
              <v-select v-model="editJobs[i].skills" :items="jobSkills" :item-text="'name'" :item-value="'id'" return-object chips deletable-chips
                        :persistent-hint="true" :hint="'Skills needed for this Job'" multiple :menu-props="{'closeOnContentClick':true}">
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
        <v-checkbox class="edit-jobs-checkbox" v-model="saveToLocalStorage" color="primary" :label="'Save Jobs to local storage'"></v-checkbox>
        <v-layout row :wrap="$lowResolution">
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <v-flex text-xs-right xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
            <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                   @click="closeJobsModal">{{$t('global.cancel')}}</v-btn>
          </v-flex>
          <v-flex text-xs-right xs12 sm3 md3 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
            <v-btn :block="$lowResolution" color="info" :title="$t('optimization.addJob')" @click="addJob(true)">
              {{$t('optimization.addJob')}}</v-btn>
          </v-flex>
          <v-flex text-xs-right xs12 sm3 md3 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
            <v-btn :block="$lowResolution" color="success" :title="$t('global.save')" @click="saveJobs">
              {{$t('global.save')}}</v-btn>
          </v-flex>
        </v-layout>
      </box>
    </v-dialog>
    <edit-skills v-if="showSkillManagement" :skills="skills" @skillsChanged="skillsChanged" @close="showSkillManagement=false"></edit-skills>
    <v-dialog v-model="isImportOpen" max-width="500" :persistent="true" attach="body">
      <box background="white" closable @closed="closeImport()">
        <h3 slot="header" style="padding-right: 55px">
          {{ $t('optimization.importJobFile') }}
          <v-btn class="edit-jobs-btn" flat :style="{background: 'white'}" @click="saveJobImport()" :title="$t('optimization.saveJobs')">
            <v-icon color="success">save</v-icon>
          </v-btn>
        </h3>
        <v-textarea v-model="pastedJobs" :persistent-hint="true" :hint="'paste JSON here'" auto-grow :placeholder="JsonPlaceholder"></v-textarea>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./edit-jobs.js"></script>
<style scoped src="./edit-jobs.css"></style>
