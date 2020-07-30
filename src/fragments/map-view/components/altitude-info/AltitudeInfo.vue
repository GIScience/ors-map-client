<template>
  <v-snackbar class="altitude-snack" v-model="open"
    :style="{width: `${width}px` }"
    :bottom="true"
    :auto-height="true"
    :left="false"
    color="transparent"
    :right="true"
    :timeout="0" >
    <div class="altitude-snack-content">
      <box background="white" closable @closed="closeAltitudeModal">
        <h3 style="color:black" slot="header">{{$t('altitudeInfo.altitudeVariation')}}</h3>
        <altitude :height="height" :show-variations="false" :map-view-data="mapViewData"></altitude>
      </box>
    </div>
  </v-snackbar>
</template>

<script src="./altitude-info.js"></script>
<style scoped src="./altitude-info.css"></style>
