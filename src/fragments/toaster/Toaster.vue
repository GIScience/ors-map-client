<template>
  <v-snackbar :style="{color: snackbarTheme === 'warning'? 'black': 'white'}" v-if="render" ref="vSnack"
    :color="snackbarTheme"
    :timeout="timeout"
    :location="snackbarLocation"
    :multi-line="snackbarMode === 'multi-line'"
    :vertical="snackbarMode === 'vertical'"
    :auto-height="true"
    v-model="visible">
    <div v-html="snackbarText"></div>
    <v-btn :style="{color: snackbarTheme === 'warning'? 'black': 'white'}" variant="text" @click="clicked($event)">{{ $t('global.close') }}</v-btn>
    </v-snackbar>
</template>

<script src="./toaster.js"></script>
