<template>
<div style="height:0">
  <v-menu class="floating-menu" style="box-shadow:none" transition="slide-y-transition" v-model="menuOpen"
    :close-on-click="true"
    top offset-y
    :close-on-content-click="true" >

    <v-btn slot="activator" v-if="locationActive" small fab class="my-location-btn" @click="activatorClicked()" :title="$t('myLocation.stopShowingCurrentLocation')">
      <v-icon large :color="continously === true ? 'primary' : 'dark'" >my_location</v-icon>
    </v-btn>
    <v-btn slot="activator" @click="activatorClicked()"  v-else small fab class="my-location-btn" :title="$t('myLocation.showCurrentLocation')"><v-icon large color="dark" >not_listed_location</v-icon> </v-btn>

    <v-list  v-if="!locationActive" light style="background:transparent; box-shadow:none" class="input-pop-up-list">
      <div class="text-xs-right">
        <v-btn round style="text-transformation:initial" :title="$t('myLocation.continouslyLocation')" @click="setLocationFromBrowser(true)" >{{$t('myLocation.continously')}}
          <v-icon color="primary" >autorenew</v-icon>
        </v-btn>
      </div>
      <div class="text-xs-right">
        <v-btn round style="text-transformation:initial" :title="$t('myLocation.onlyOnceLocation')" @click="setLocationFromBrowser()" >{{$t('myLocation.onlyOnce')}}
          <v-icon color="primary" >play_for_work</v-icon>
        </v-btn>
      </div>
    </v-list>
  </v-menu>
  <div id="my-position-tooltip" v-if="toolTipVisible" role="tooltip">
    <v-btn @click="toolTipVisible = false" small flat icon class="close-tooltip"><v-icon small color="dark" >close</v-icon> </v-btn>
    <div class="tooltip-content">
      {{$t('myLocation.myPositionToolTip')}}
    </div>
    <div id="arrow" data-popper-arrow></div>
  </div>
</div>

</template>
<style scoped src="./my-location.css"></style>
<script src="./my-location.js"></script>
