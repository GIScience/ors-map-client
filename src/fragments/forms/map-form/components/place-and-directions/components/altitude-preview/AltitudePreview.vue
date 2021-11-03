<template>
  <box background="white" no-shadow>
    <div slot="header">
      <v-btn style="float:right; margin-top:0" class="expand-altitude-btn" small icon :title="$t('altitudePreview.expandAltitudeChart')" @click="openAltitudeBox()"><v-icon>open_in_new</v-icon></v-btn>
      <h3>{{$t('altitudePreview.altitude')}}</h3>
    </div>
    <altitude :height="height" :map-view-data="mapViewData"></altitude>
  </box>
</template>

<script src="./altitude-preview.js"></script>
