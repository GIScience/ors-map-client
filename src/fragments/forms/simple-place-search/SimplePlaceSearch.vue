<template>
  <box background="white" class="simple-place-search" :class="{'extra-low-resolution': $xlResolution}" :style="{height: height+ 'px'}">
    <v-layout row wrap>
      <v-flex xs2 sm2 md1>
        <v-badge overlap left v-model="showNewInfo" color="info">
          <b slot="badge">i</b>
          <v-btn
            :title="showNewInfo === true ? $t('simplePlaceSearch.openSidebarToSeeRouteDetails') : ''"
            class="open-menu" slot="default" flat @click="openMenu()"
            v-smart-tooltip="{
              show: showRouteDetailsTooltip,
              text: $t('simplePlaceSearch.openSidebarToSeeRouteDetails'),
              position: 'right',
              dark: true
            }"
          >
          <v-icon>menu</v-icon>
          </v-btn>
        </v-badge>
      </v-flex>
      <v-flex xs10 sm10 md11>
        <v-form ref="form" @submit.prevent>
          <place-input class="mini-input" :height="27" :mb="0" :index="0"
            id-postfix="simple-place-search"
            :model="place"
            :directions-button-tooltip="showDirectionsBtnTooltip"
            directions-button-tooltip-position="bottom"
            :autofocus="true"
            :single="true"
            @selected="selectPlace"
            @startDirections="openDirectionsMode"
            @searchChanged="search"
            @focused="inputFocused"
            @cleared="placeCleared">
          </place-input>
        </v-form>
      </v-flex>
    </v-layout>
  </box>
</template>

<script src="./simple-place-search.js"></script>

<style scoped src="./simple-place-search.css"></style>
