<template>
  <v-menu
    ref="menu" lazy
    :close-on-content-click="false"
    :disabled="disabled"
    v-model="dateMenu"
    transition="scale-transition" offset-y full-width
    :nudge-right="40" min-width="290px"
    :return-value.sync="date">
    <v-text-field slot="activator"
      :disabled="disabled"
      :label="label"
      v-model="date"
      :required="required"
      prepend-icon="event"
      readonly>
    </v-text-field>
    <v-date-picker :min="min" :max="max" v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="dateMenu = false">{{ $t('global.cancel') }}</v-btn>
      <v-btn flat color="primary" @click="onDatePicked">{{ $t('global.ok') }}</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script src="./date-picker"></script>
