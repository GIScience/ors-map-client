<template>
  <div>
    <v-dialog v-model="isImportOpen" max-width="600" :persistent="true" attach="body">
      <box background="white" closable @closed="closeImporter">
        <h3 slot="header" style="padding-right: 55px">
          {{ content.header }}
          <v-btn class="edit-btn" flat :style="{background: 'white'}" @click="savePastedJson" :title="content.saveImport">
            <v-icon color="success">save</v-icon>
          </v-btn>
        </h3>
        <v-textarea v-model="pastedData" style="margin-bottom: 10px" :persistent-hint="true" :hint="'paste JSON here'" auto-grow :placeholder="content.jsonPlaceholder"></v-textarea>
        <vue-dropzone ref="importRouteDropzone" @vdropzone-file-added="fileAdded" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        <v-alert v-if="expectedData === 'skills'" :value="true" type="info" style="color:white" >
          {{$t('optimizationImport.acceptedImportTypes')}}: <b>ors-json</b>
        </v-alert>
        <v-alert v-else :value="true" type="info" style="color:white" >
          {{$t('optimizationImport.acceptedImportTypes')}}: <b>ors-json</b>, <b>GeoJSON</b>, {{$t('global.and')}} <b>csv</b>
        </v-alert>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./optimization-import.js"></script>
<style scoped src="./optimization-import.css"></style>
