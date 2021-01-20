<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" :max-width="infoMaxWidth" :style="{zIndex: zIndex}" :persistent="persistent">
      <box closable @closed="onOk" v-model="show" :fillHeight="true" :resizable="resizable" background="white">
        <div slot="header">
          <h3>{{infoTitle}}</h3>
          </div>
        <div slot="content" >
          <pretty-code-viewer v-if="textIsMarkdown" :source="infoText" max-height-minimized="100%"></pretty-code-viewer>
          <div v-else v-html="infoText"></div>
          <div class="code-container" v-if="code">
            <pretty-code-viewer :level="3" :source="code" max-height-minimized="100%"></pretty-code-viewer>
          </div>
        </div>
        <div slot="footer" class="text-right">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="onOk">{{infoOk}}</v-btn>
        </div>
      </box>
    </v-dialog>
  </v-layout>
</template>

<script src="./info.js"></script>

<style scoped>
.markdown-container {
  padding:10px;
}
.vue-json-pretty {
  word-wrap: break-word;
}
</style>

