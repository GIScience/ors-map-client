<template>
  <div data-cy="job-inputs" class="job-inputs">
    <v-expansion-panel  data-cy="job-list" class="no-shadow" :expand="true">
      <v-expansion-panel-content style="background: transparent;" v-for="(j, i) in jobs" :key="i">
        <div v-if="localMapViewData === null || !unassignedIds.includes(j.id)" slot="header" style="padding-bottom: 0;"><v-icon style="padding: 0 5px 0 0">work</v-icon><b>Job {{j.id}} - {{ j.location[0].toPrecision(8) }}, {{ j.location[1].toPrecision(8)}}</b></div>
        <div v-else slot="header" style="padding-bottom: 0"><v-icon style="padding: 0 5px 0 0">work</v-icon><b>Job {{j.id}} - {{ j.location[0].toPrecision(8) }}, {{ j.location[1].toPrecision(8)}}
          <v-icon small class="warning-icon">priority_high</v-icon></b></div>
        <v-card-text>
          <template v-for="prop in ['delivery','pickup','skills','time_window','service']">
            <v-chip v-if="j[prop] && prop === 'service'" style="flex: auto">{{ $t(`optimization.${prop}`) }}: {{ humanisedTime(j[prop]) }}</v-chip>
            <v-chip v-else-if="j[prop] && prop !== 'skills' && j[prop][0] !== 0" style="flex: auto">{{ $t(`optimization.${prop}`) }}: {{ j[prop][0] }}</v-chip>
            <v-chip v-else-if="j[prop] && prop === 'skills' && j[prop].length" style="flex: auto">
              {{ $t(`optimization.${prop}`) }}: {{ skillIds(j) }}
            </v-chip>
          </template>
        </v-card-text>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script src="./job-list.js"></script>
<style scoped src="./item-list.css"></style>
