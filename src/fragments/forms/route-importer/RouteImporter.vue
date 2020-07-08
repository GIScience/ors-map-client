<template>
  <div>
    <map-form-btn @clicked="openImporter()" :icon="'cloud_upload'" :title="$t('routeImporter.loadRouteFile')" ></map-form-btn>
    <v-dialog v-model="isImportModalOpen" max-width="600" :persistent="true">
      <box v-model="isImportModalOpen" background="white" closable @closed="closeImporter()">
        <h3 slot="header">{{$t('routeImporter.loadRouteFile')}}</h3>
        <vue-dropzone ref="importRouteDropzone" @vdropzone-file-added="fileAdded" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        <v-alert :value="true" type="info" style="color:white" >
          {{$t('routeImporter.acceptedFileTypes')}}: <b>kml</b>, <b>gpx</b> and <b>ors-json</b>
        </v-alert>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./route-importer.js"></script>
