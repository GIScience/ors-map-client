<template>
  <div class="printing-template directions-template">
    <h2 v-html="contentTitle"></h2>
    <b>{{humanizedSummary(activeRoute.summary).distance}} </b> &#38; <b>{{humanizedSummary(activeRoute.summary).duration}} </b>
    <br /><br />

    <img alt="Map print view" width="auto" height="400" :src="mapViewImage" />
    <template v-for="(segment, segmentIndex) in activeRoute.properties.segments">
      <h3 :key="segmentIndex + 'header' "> {{$t('print.segment')}} {{Number(segmentIndex) + 1}} </h3>
        <div :key="segmentIndex" v-if="activeRoute.properties.segments.length > 1">
          <b>{{humanizedSummary(segment).distance}} </b> &#38;
          <b>{{humanizedSummary(segment).duration}} </b>
          <br /><br />
        </div>
      <template v-for="(step, stepIndex) in segment.steps">
        <div :key="segmentIndex + '_' + stepIndex">
          <div v-if="step.distance && step.duration" >
            ({{getGlobalStepCounter(segmentIndex, stepIndex)}})
            <span style="font-size:24px" v-html="getStepSymbol(step)"></span>
            <span v-html="step.instruction"></span>
            <br />&nbsp;&nbsp;&origof;
            <b>{{humanizedSummary(step).distance}} </b> &#38;
            <b>{{humanizedSummary(step).duration}} </b>
            <br />
          </div>
          <div v-else >
            <span style="font-size:24px">&odot;</span>
            <b v-html="step.instruction"></b>
            <br /><br />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script src="./print-directions.js"></script>
