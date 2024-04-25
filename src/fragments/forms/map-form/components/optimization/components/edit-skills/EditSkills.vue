<template>
  <div>
    <v-dialog v-model="isSkillsOpen" max-width="500" :persistent="true" attach="body">
      <box background="white" closable @closed="closeSkillsModal()">
        <h3 slot="header" style="padding-right: 55px">
          <download :download-formats-supported="['json']" :data="editSkills" :edit-prop="'skills'"></download>
          <v-btn class="edit-skills-btn" flat :style="{background: 'white'}" @click="isImportOpen=true" :title="$t('optimization.import') + $t('optimization.skills')">
            <v-icon color="primary">cloud_upload</v-icon>
          </v-btn>
          <v-btn class="edit-skills-btn" flat :style="{}" @click="addSkill(true)" :title="$t('optimization.add') + $t('optimization.skill')">
            <v-icon color="info">add</v-icon>
          </v-btn>
          {{ $t('optimization.manage') + $t('optimization.skills') }}
        </h3>
        <v-flex v-if="editSkills.length === 0">
          <v-btn style="margin-top: 10px" color="info" block :title="$t('optimization.add') + $t('optimization.skill')" @click="addSkill()">
            <v-icon style="margin-right: 5px;">map</v-icon>
            {{ $t('optimization.add') + $t('optimization.skill') }}
          </v-btn>
        </v-flex>
        <v-card @click="editId = i+1" elevation="3" style="margin: 5px;cursor: pointer" v-for="(skill, i) in editSkills" :key="i">
          <v-card-title style="padding-bottom: 0;">
            <div><b>Skill: {{ skill.name }}</b></div>
            <v-btn v-if="editId === skill.id" class="edit-btn" flat small :style="{background: 'white'}" @click.stop="editId = 0" :title="$t('optimization.edit') + $t('optimization.skill')">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn class="remove-btn" small icon :style="{background: 'white'}" @click.stop="removeSkill(skill.id)" :title="$t('optimization.remove') + $t('optimization.skill')">
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-text-field v-model="skill.name" style="padding: 15px" :persistent-hint="true" :hint="'Skill name'"></v-text-field>
        </v-card>
        <v-layout row :wrap="$lowResolution">
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <v-flex text-xs-right xs12 sm5 md7 :class="{'ml-2': $vuetify.breakpoint.smAndDown, 'mb-2': $lowResolution}">
            <v-btn :block="$lowResolution" color="primary" :title="$t('settings.restoreDefaults')"
                   @click="closeSkillsModal">{{$t('global.cancel')}}</v-btn>
          </v-flex>
          <v-flex text-xs-right xs12 sm5 md4 :class="{'ml-2': $vuetify.breakpoint.smAndDown}">
            <v-btn :block="$lowResolution" color="success" :title="$t('global.save')" @click="saveSkills">
              {{$t('global.save')}}
              <v-icon style="margin-left: 5px;">save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </box>
    </v-dialog>
    <optimization-import v-if="isImportOpen" :expected-data="'skills'" @saveOptimizationImport="saveSkillImport"
                         @close="isImportOpen=false"></optimization-import>
  </div>
</template>

<script src="./edit-skills.js"></script>
<style scoped src="./edit-skills.css"></style>
