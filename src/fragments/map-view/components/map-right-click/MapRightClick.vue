<template>
  <box class="right-click-box" background="white" closable @closed="closed" v-if="show" :style="{left: rightClickPopUpX, top: rightClickPopUpY}" customClass="right-context-menu" >
    <div slot="header">{{$t('mapRightClick.options')}}</div>
    <div slot="content">
      <v-btn flat v-if="canAddStop" small :title="$t('mapRightClick.addDestinationToRoute')" @click="rightClickEvent('addDestinationToRoute')" class="right-click-btn" >{{$t('mapRightClick.addDestinationToRoute')}}</v-btn><br v-if="canAddStop">
      <v-btn flat small :title="$t('mapRightClick.directionsFromHere')" @click="rightClickEvent('directionsFromPoint')" class="right-click-btn" >{{$t('mapRightClick.directionsFromHere')}}</v-btn><br>
      <v-btn flat small :title="directionsToHereText" @click="rightClickEvent('directionsToPoint')" class="right-click-btn" >{{directionsToHereText}}</v-btn><br>
      <v-btn flat v-if="canAddStop" small :title="$t('mapRightClick.addRouteStop')" @click="rightClickEvent('addRouteStop')" class="right-click-btn" >{{$t('mapRightClick.addRouteStop')}}</v-btn><br v-if="canAddStop">
      <v-btn flat v-if="!canAddStop" small :title="$t('mapRightClick.centerHere')" @click="rightClickEvent('centerHere')" class="right-click-btn" >{{$t('mapRightClick.centerHere')}}</v-btn><br v-if="!canAddStop">
      <v-btn flat v-if="canAddIsochroneCenter" small :title="$t('mapRightClick.addAsIsochroneCenter')" @click="rightClickEvent('addAsIsochroneCenter')" class="right-click-btn" >{{$t('mapRightClick.addAsIsochroneCenter')}}</v-btn>

    </div>
  </box>
</template>
<script src="./map-right-click.js"></script>
<style scoped src="./map-right-click.css"></style>
