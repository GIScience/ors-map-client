<template>
  <box ref="rightClickBox" class="right-click-box" background="white" closable @closed="closed" v-if="show" :style="{left: rightClickPopUpX, top: rightClickPopUpY}" customClass="right-context-menu" >
    <div slot="header">{{$t('mapRightClick.options')}}</div>
    <div slot="content">
      <v-btn v-if="canAddStop" flat block small :title="$t('mapRightClick.addDestinationToRoute')" @click="rightClickEvent('addDestinationToRoute')" class="right-click-btn" >{{$t('mapRightClick.addDestinationToRoute')}}</v-btn>
      <v-btn v-if="canRoute" flat small block  :title="$t('mapRightClick.directionsFromHere')" @click="rightClickEvent('directionsFromPoint')" class="right-click-btn" >{{$t('mapRightClick.directionsFromHere')}}</v-btn>
      <v-btn v-if="canRoute" flat small block :title="directionsToHereText" @click="rightClickEvent('directionsToPoint')" class="right-click-btn" >{{directionsToHereText}}</v-btn>
      <v-btn v-if="canAddStop" flat small block :title="$t('mapRightClick.addRouteStop')" @click="rightClickEvent('addRouteStop')" class="right-click-btn" >{{$t('mapRightClick.addRouteStop')}}</v-btn>
      <!-- <v-btn v-if="!canAddStop" flat small block :title="$t('mapRightClick.centerHere')" @click="rightClickEvent('centerHere')" class="right-click-btn" >{{$t('mapRightClick.centerHere')}}</v-btn> -->
      <v-btn v-if="canAddIsochroneCenter" block flat small :title="$t('mapRightClick.addAsIsochroneCenter')" @click="rightClickEvent('addAsIsochroneCenter')" class="right-click-btn" >{{$t('mapRightClick.addAsIsochroneCenter')}}</v-btn>
      <v-btn v-if="canShowInspector" block flat small :title="$t('mapRightClick.inspectDataOnOSM')" @click="inspectDataOnOSM()" class="right-click-btn" >{{$t('mapRightClick.inspectDataOnOSM')}}</v-btn>
    </div>
  </box>
</template>
<script src="./map-right-click.js"></script>
<style scoped src="./map-right-click.css"></style>
