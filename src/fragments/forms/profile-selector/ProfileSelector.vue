<template>
  <div>
    <v-item-group>    
       <v-layout>  
        <v-item v-for="profile in profilesMapping" :key="profile.slug">        
          <v-flex>
            <profile-selector-option @profileSelected="profileSelected" :profile="profile" :active-profile="currentProfile" :nested-item-active="nestedProfileActive"></profile-selector-option>
          </v-flex>              
        </v-item>
       </v-layout>  
    </v-item-group>
    
    <div v-if="vehicleType">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: {{($t('orsMapFilters.profiles.' + vehicleType)).toLowerCase()}}
      </v-chip>
    </div>
    <div v-else-if="currentProfile">
      <v-chip outline small disabled color="primary">
        {{$t('global.profile')}}: {{($t('orsMapFilters.profiles.' + currentProfile)).toLowerCase()}}
      </v-chip>
    </div>
  </div>
</template>
<script src="./profile-selector.js"></script>

<style scoped src="./profile-selector.css"></style>
