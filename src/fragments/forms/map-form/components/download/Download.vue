<template>
  <div class="download-container" ref="downloadContainer">
    <v-btn v-if="mapViewData" class="open-download-btn" style="float:right; margin-top:0" small icon :title="$t('download.download')" @click="openDownload()"><v-icon>cloud_download</v-icon></v-btn>
    <v-btn v-else-if="data" class="edit-btn" flat style="background:white; margin-top:0" :title="$t('download.download')" @click="openDownload()"><v-icon color="primary">cloud_download</v-icon></v-btn>
    <v-dialog v-model="isDownloadModalOpen" max-width="600" attach="body" :persistent="true">
      <box customClass="download-modal" v-model="isDownloadModalOpen" background="white" closable @closed="closeDownload()">
        <h3 v-if="mapViewData" slot="header">{{$t('download.downloadRoute')}}</h3>
        <h3 v-else slot="header">
          {{ $t('download.download') + ' ' + editProp }}
          <v-btn :style="{background: 'white'}" flat small icon @click="copyToClipboard" :title="$t('download.copyToClipboard')">
            <v-icon color="primary">content_copy</v-icon>
          </v-btn>
        </h3>
        <v-text-field class="export-file-name" :label="$t('download.downloadFileName')" v-model="downloadFileName" :required="true"></v-text-field>
        <v-select class="download-format" :label="$t('download.downloadFormat')" :items="availableDownloadFormats" v-model="downloadFormat"></v-select>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6>
            <v-btn class="download" color="primary" style="float:right; margin-top:0" :title="$t('download.download')" @click="download()">{{$t('download.download')}}</v-btn>
          </v-flex>
        </v-layout>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./download.js"></script>
<style scoped src="./download.css"></style>
