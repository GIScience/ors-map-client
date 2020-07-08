<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent :max-width="confirmMaxWidth" :style="{zIndex: zIndex}">
      <box :resizable="resizable" v-model="show" background="white" closable @closed="onNo">
        <div slot="header">
          <h3>{{confirmTitle}}</h3>
        </div>
        <div slot="content">
          <pretty-code-viewer v-if="textIsMarkdown" :source="confirmText" max-height-minimized="100%"></pretty-code-viewer>
          <div v-else>{{confirmText}}</div>
          <div class="code-container" v-if="code">
            <pretty-code-viewer :level="3" :source="code" max-height-minimized="100%"></pretty-code-viewer>
          </div>
        </div>
        <div slot="footer" class="text-right">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="onNo">{{confirmNo}}</v-btn>
          <v-btn v-if="neverOption" color="primary" style="text-transform:initial" flat @click.native="onNever">{{confirmNever}}</v-btn>
          <v-btn color="success" flat @click.native="onYes">{{confirmYes}}</v-btn>
        </div>
      </box>
    </v-dialog>
  </v-layout>
</template>

<script src="./confirm.js"></script>

<style scoped>
  .markdown-container {
    padding: 10px;
  }
</style>
