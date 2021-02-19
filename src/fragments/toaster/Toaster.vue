<template>
  <v-snackbar :style="{color: snackbarTheme === 'warning'? 'black': 'white'}" v-if="render" ref="vSnack"
    :color="snackbarTheme"
    :timeout="timeout"
    :top="top"
    :bottom="bottom"
    :right="snackbarX === 'right'"
    :left="snackbarX === 'left'"
    :multi-line="snackbarMode === 'multi-line'"
    :vertical="snackbarMode === 'vertical'"
    :auto-height="true"
    v-model="visible">
    <div v-html="snackbarText"></div>
    <v-btn :style="{color: snackbarTheme === 'warning'? 'black': 'white'}" flat @click.native="clicked($event)">{{ $t('global.close') }}</v-btn>
    </v-snackbar>
</template>

<script src="./toaster.js"></script>
