<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" attach="body" :max-width="infoMaxWidth" :style="{zIndex: zIndex}" :persistent="persistent">
      <box closable @closed="onOk" v-model="show" :fillHeight="true" :resizable="resizable" background="white">
        <template v-slot:header>
          <h3>{{infoTitle}}</h3>
          </template>
        <template v-slot:content >
          <div v-html="infoText"></div>
        </template>
        <template v-slot:footer>
          <div class="text-right">
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="onOk($event)">{{infoOk}}</v-btn>
          </div>
        </template>
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
