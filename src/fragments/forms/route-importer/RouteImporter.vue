<template>
  <div class="route-importer-container">
    <map-form-btn class="route-importer-btn" @clicked="openImporter()" :icon="'cloud_upload'" :title="$t('routeImporter.loadRouteFile')" ></map-form-btn>
    <v-dialog v-model="isImportModalOpen" max-width="600" :persistent="true" attach="body">
      <box customClass="route-importer-modal" v-model="isImportModalOpen" background="white" closable @closed="closeImporter()">
        <template v-slot:header>
          <h3>{{$t('routeImporter.loadRouteFile')}}</h3>
        </template>
        <vue-dropzone ref="importRouteDropzone" @vdropzone-file-added="fileAdded" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        <v-alert type="info" style="color:white" >
          {{$t('routeImporter.acceptedImportTypes')}}: <b>ors-json</b>, <b>GeoJSON</b>, <b>kml</b> {{$t('global.and')}} <b>gpx</b>
        </v-alert>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./route-importer.js"></script>
