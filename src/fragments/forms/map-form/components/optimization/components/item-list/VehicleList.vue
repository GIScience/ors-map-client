<template>
  <div data-cy="vehicle-inputs" class="vehicle-inputs">
    <v-expansion-panel data-cy="vehicle-list" class="no-shadow" :value="vehicleExtended" :expand="true">
      <v-expansion-panel-content style="background: transparent;" v-for="(v, i) in vehicles" :key="i">
        <div slot="header" style="padding-bottom: 0;"><v-icon :color="vehicleColors(v.id)" style="padding: 0 5px 0 0">{{vehicleIcon(v.profile)}}</v-icon><b>Vehicle {{v.id}} ({{v.profile}})</b></div>
      <v-card-text>
          <template v-for="prop in ['capacity','skills','time_window']">
            <v-chip v-if="prop === 'time_window' && v[prop].length && v[prop].every(e => e != null) " style="flex: auto">{{
                $t(`optimization.${prop}`)
              }}: {{ timeWindow(v[prop]) }}</v-chip>
            <v-chip v-else-if="prop === 'capacity' && v[prop]" style="flex: auto">{{ $t(`optimization.${prop}`) }}: {{ v[prop][0] }}</v-chip>
            <v-chip v-else-if="prop === 'skills' && v[prop].length" style="flex: auto">
              {{ $t(`optimization.${prop}`) }}: {{ skillIds(v) }}
            </v-chip>
          </template>
        </v-card-text>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script src="./vehicle-list.js"></script>
<style scoped src="./item-list.css"></style>
