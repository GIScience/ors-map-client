<template>
  <div class="vehicle-inputs">
    <v-card elevation="3" style="margin: 5px;" v-for="(v, i) in vehicles" :key="i">
      <v-card-title style="padding-bottom: 0;"><v-icon :color="vehicleColors(v.id)" style="padding: 0 5px 0 0">{{vehicleIcon(v.profile)}}</v-icon><b>Vehicle {{v.id}} ({{v.profile}})</b></v-card-title>
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
      </v-card>
  </div>
</template>

<script src="./vehicle-list.js"></script>
<style scoped src="./vehicle-list.css"></style>
