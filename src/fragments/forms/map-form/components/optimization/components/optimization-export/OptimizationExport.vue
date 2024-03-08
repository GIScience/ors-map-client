<template>
  <div>
    <v-dialog v-model="isExportOpen" max-width="355" :persistent="true" attach="body">
      <box background="white"  closable @closed="closeExporter">
        <h3 slot="header" style="padding-right: 55px">
          {{ content.header }}
        </h3>
        <v-flex xs12 sm6>
          <v-btn class="export-btn" :style="{background: 'white'}" @click="copyToClipboard" :title="$t('optimizationExport.copyToClipboard')">
            <v-icon color="primary">content_copy</v-icon>
          </v-btn>
          <div v-if="expectedData === 'jobs'">
            <download :download-formats-supported="['json', 'geojson']" :job-data="editJobs"></download>
          </div>
          <div v-if="expectedData === 'vehicles'">
            <download :download-formats-supported="['json', 'geojson']" :vehicle-data="editVehicles"></download>
          </div>
          <v-btn class="export-btn" :style="{background: 'white'}" @click="downloadCsv" :title="$t('optimizationExport.downloadAsCsv')">
            <v-icon color="primary">CSV</v-icon>
          </v-btn>
        </v-flex>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./optimization-export.js"></script>
<style scoped src="./optimization-export.css"></style>
