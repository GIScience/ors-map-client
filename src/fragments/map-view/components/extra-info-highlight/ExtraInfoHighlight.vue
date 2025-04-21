<template>
  <div>
    <template v-if="highlightedPolylines" >
      <template v-for="(polyline) in highlightedPolylines">
        <l-polyline :lat-lngs="polyline.polylines" :weight="10" :color="'white'" :opacity="highlightedPolylines.length === 1 ? 1 : 0"></l-polyline>
        <l-polyline :lat-lngs="polyline.polylines" :weight="highlightedPolylines.length === 1 ? 6 : 4" :color="polyline.color">
        <l-tooltip v-html="polyline.label"></l-tooltip>
      </l-polyline>
        <l-polyline :lat-lngs="polyline.polylines" :weight="2" :color="'white'" :opacity="highlightedPolylines.length === 1 ? 1 : 0" dash-array="1 4"></l-polyline>
      </template>
    </template>

    <template v-if="highlightedPolylines">
      <v-snackbar class="segments-highlight-snack" @click.stop="" style="cursor:grab;z-index: 1001" :style="{marginLeft: $lowResolution ? '' : '405px'}"
        v-model="highlightedPolylineSnack"
        :bottom="true"
        :auto-height="true"
        color="white"
        :left="true"
        :timeout="0" >
        <div class="snack-highlighted-content">
          <v-btn class="snack-highlighted-close" location="right" variant="text" @click.stop="removeHighlightedSegments()">
            <v-icon size="large" :title="$t('global.close')" color="black" >close</v-icon>
          </v-btn>
          <span class="highlight-intro">
            {{$t('mapView.highlighting')}} {{ extraInfo.sectionTitle }}:
          </span>
          <span class="section-highlighted" :style="highlightedSectionStyle(polyline.color)" :key="sectionKey" v-for="(polyline, sectionKey) in highlightedPolylines">{{polyline.label}}</span>
        </div>
      </v-snackbar>
    </template>
  </div>
</template>

<script src="./extra-info-highlight.js"></script>
<style scoped src="./extra-info-highlight.css"></style>
