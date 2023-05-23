<template>
<div style="height:0">
  <v-menu border-radius top offset-y style="box-shadow:none" transition="slide-y-transition"
          v-model="menuOpen"
          close-on-click
          close-on-content-click>
    <template #activator="{ on: menu }">
      <v-btn v-if="locationActive"
             v-on="menu"
             small fab
             class="my-location-btn" @click.stop="activatorClicked()"
             :title="$t('myLocation.stopShowingCurrentLocation')">
        <v-icon large :color="continuously === true ? 'primary' : 'dark'" >my_location</v-icon>
      </v-btn>
      <v-btn @click.stop="activatorClicked()"
             v-on="menu"
             v-else
             small fab class="my-location-btn"
             :title="$t('myLocation.showCurrentLocation')">
        <v-icon large color="dark" >person_pin_circle</v-icon>
      </v-btn>
    </template>
    <v-list v-if="!locationActive" light style="border-radius: 20px" class="input-pop-up-list">
      <v-list-tile key="1" @click="setLocationFromBrowser(true)">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-list-tile-content v-on="on">
              <v-list-tile-title v-text="$t('myLocation.continuously')"/>
            </v-list-tile-content>
          </template>
          <span>{{$t('myLocation.continuouslyLocation')}}</span>
        </v-tooltip>
        <v-list-tile-avatar>
          <v-icon color="primary">autorenew</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile key="2" @click="setLocationFromBrowser()">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-list-tile-content v-on="on">
              <v-list-tile-title v-text="$t('myLocation.onlyOnce')"/>
            </v-list-tile-content>
          </template>
          <span>{{$t('myLocation.onlyOnceLocation')}}</span>
        </v-tooltip>
        <v-list-tile-avatar>
          <v-icon color="primary">play_for_work</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-menu>
</div>

</template>
<style scoped src="./my-location.css"></style>
<script src="./my-location.js"></script>
