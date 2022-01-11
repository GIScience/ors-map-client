<template>
<div style="height:0">
  <v-menu class="my-location-floating-menu" style="box-shadow:none" transition="slide-y-transition" v-model="menuOpen" attach="body"
    :close-on-click="true"
    top offset-y
    :close-on-content-click="true" >

    <v-btn slot="activator" v-if="locationActive" 
      v-smart-tooltip="{show: toolTipVisible, text: $t('myLocation.myPositionToolTip'), position: 'left', dark: true, showOnce: true, name: 'useMyLocation', forceShow: showTooltip}" small fab 
      class="my-location-btn" @click.stop="activatorClicked()" 
      :title="$t('myLocation.stopShowingCurrentLocation')">
      <v-icon large :color="continuously === true ? 'primary' : 'dark'" >my_location</v-icon>
    </v-btn>
    <v-btn slot="activator" @click.stop="activatorClicked()"  v-else 
      small fab class="my-location-btn"
      v-smart-tooltip="{show: toolTipVisible, text: $t('myLocation.myPositionToolTip'), dark: true, showOnce: true, name: 'useMyLocation', forceShow: showTooltip}" 
      :title="$t('myLocation.showCurrentLocation')">
        <v-icon large color="dark" >person_pin_circle</v-icon> 
    </v-btn>

    <v-list  v-if="!locationActive" light style="background:transparent; box-shadow:none" class="input-pop-up-list">
      <div class="text-xs-right">
        <v-btn round style="text-transform:initial" :title="$t('myLocation.continuouslyLocation')" @click="setLocationFromBrowser(true)" >{{$t('myLocation.continuously')}}
          <v-icon color="primary" >autorenew</v-icon>
        </v-btn>
      </div>
      <div class="text-xs-right">
        <v-btn round style="text-transform:initial" :title="$t('myLocation.onlyOnceLocation')" @click="setLocationFromBrowser()" >{{$t('myLocation.onlyOnce')}}
          <v-icon color="primary" >play_for_work</v-icon>
        </v-btn>
      </div>
    </v-list>
  </v-menu>
</div>

</template>
<style scoped src="./my-location.css"></style>
<script src="./my-location.js"></script>
