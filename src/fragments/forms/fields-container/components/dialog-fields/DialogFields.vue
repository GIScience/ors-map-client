<template>
  <v-dialog v-model="active" attach="body" max-width="600" class="props-modal" :persistent="true">
      <box v-model="active" :resizable="true" background="white">
        <div slot="header">
          <h3>{{title}}</h3>
        </div>
        <div slot="content">
          <form-fields :parameters="parameters[subPropsIndex].props" :is-modal="isModal" @fieldUpdated="fieldUpdated"></form-fields>
        </div>
        <div slot="footer" class="text-right">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="onModalConfirm">{{$t('global.ok')}}</v-btn>
        </div>
      </box>
    </v-dialog>
</template>

<script src="./dialog-fields.js"></script>
