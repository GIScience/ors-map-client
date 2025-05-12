<template>
  <box background="white" class="simple-place-search" :class="{'extra-low-resolution': $xlResolution}" :style="{height: height+ 'px'}">
    <v-row>
      <v-col cols="2" sm="2" md="1">
        <v-badge location="left" v-model="showNewInfo" color="info">
          <template v-slot:default>
            <v-btn
              :title="showNewInfo === true ? $t('simplePlaceSearch.openSidebarToSeeRouteDetails') : ''"
              class="open-menu" variant="text" @click="openMenu()"
              v-smart-tooltip="{
              show: showRouteDetailsTooltip,
              text: $t('simplePlaceSearch.openSidebarToSeeRouteDetails'),
              position: 'right',
              dark: true
            }"
            >
              <v-icon>menu</v-icon>
            </v-btn>
          </template>
        </v-badge>
      </v-col>
      <v-col cols="10" sm="10" md="11">
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
      </v-col>
    </v-row>
  </box>
</template>

<script src="./simple-place-search.js"></script>

<style scoped src="./simple-place-search.css"></style>
