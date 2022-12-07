<template>
  <div>
    <v-btn style="float:right; margin-top:0" small icon :title="$t('print.print')" @click="generateAndPrintView()">
      <v-icon>print</v-icon>
    </v-btn>
    <div ref="printableElement" style="display:none">
      <h1>{{title}}</h1>
      <b>{{hostname}}</b>
      <div v-html="modePrintingHtml"></div>
    </div>
  </div>
</template>

<script src="./print.js"></script>
