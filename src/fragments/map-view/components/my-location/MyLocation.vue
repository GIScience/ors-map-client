<template>
<div style="height:0">
  <v-menu border-radius location="top" style="box-shadow:none" transition="slide-y-transition"
          v-model="menuOpen"
          close-on-click
          close-on-content-click>
    <template #activator="{ props }">
      <v-btn v-if="locationActive"
             v-bind="props"
             size="small"
             class="my-location-btn" @click.stop="activatorClicked()"
             :title="$t('myLocation.stopShowingCurrentLocation')">
        <v-icon size="large" :color="continuously === true ? 'primary' : 'dark'" >my_location</v-icon>
      </v-btn>
      <v-btn @click.stop="activatorClicked()"
             v-bind="props"
             v-else
             size="small" class="my-location-btn"
             :title="$t('myLocation.showCurrentLocation')">
        <v-icon size="large" color="dark" >person_pin_circle</v-icon>
      </v-btn>
    </template>
    <v-list v-if="!locationActive" light style="border-radius: 20px" class="input-pop-up-list">
      <v-list-item key="1" @click="setLocationFromBrowser(true)">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <div class="list-item-content" v-bind="props">
              <div class="list-item-title" v-text="$t('myLocation.continuously')"/>
            </div>
          </template>
          <span>{{$t('myLocation.continuouslyLocation')}}</span>
        </v-tooltip>
        <template #prepend>
          <v-icon color="primary">autorenew</v-icon>
        </template>
      </v-list-item>
      <v-list-item key="2" @click="setLocationFromBrowser()">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <div class="list-item-content" v-bind="props">
              <div class="list-item-title" v-text="$t('myLocation.onlyOnce')"/>
            </div>
          </template>
          <span>{{$t('myLocation.onlyOnceLocation')}}</span>
        </v-tooltip>
        <template #prepend>
          <v-icon color="primary">play_for_work</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</div>

</template>
<style scoped src="./my-location.css"></style>
<script src="./my-location.js"></script>
