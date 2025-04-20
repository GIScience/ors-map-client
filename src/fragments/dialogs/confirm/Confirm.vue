<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent attach="body" :max-width="confirmMaxWidth" :style="{zIndex: zIndex}">
      <box :resizable="resizable" v-model="show" background="white" closable @closed="onNo">
        <template v-slot:header>
          <h3>{{confirmTitle}}</h3>
        </template>
        <template v-slot:content>
          <div v-html="confirmText"></div>
        </template>
        <template v-slot:footer>
          <div class="text-right">
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="onNo">{{confirmNo}}</v-btn>
            <v-btn v-if="neverOption" color="primary" style="text-transform:initial" variant="text" @click="onNever">{{confirmNever}}</v-btn>
            <v-btn color="success" variant="text" @click="onYes">{{confirmYes}}</v-btn>
          </div>
        </template>
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
