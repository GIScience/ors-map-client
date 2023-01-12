<template>
  <v-list-group v-model="item.startOpen" v-if='item.items && showMenuItem(item)' :key="item.href" v-bind:group='item.group'>
    <v-list-tile :target="item.target" :href="item.href" class="v-menu-item" :class="itemClass" slot='activator' :title="item.title">
      <v-list-tile-action>
        <v-icon> {{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title> {{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click.stop="nav(subItem)" v-if="showMenuItem(subItem)" class="v-menu-item" :class="itemClass" v-for='subItem in item.items' :key='subItem.href' ripple
      v-bind:disabled='subItem.disabled'>
      <app-v-menu :item="subItem" :navigateFn="navigateFn" :itemClass="itemClass" :showIcon="false" :key="subItem.href" :showMenuItemFn="showMenuItem" ></app-v-menu>
    </v-list-tile>
  </v-list-group>
  <v-subheader :key="item.href" v-else-if="item.header && showMenuItem(item)"> {{ item.header }}</v-subheader>
  <v-divider :key="item.href" v-else-if="item.divider && showMenuItem(item)"></v-divider>

  <v-list-tile :key="item.href" v-else-if="showMenuItem(item)" class="v-menu-item" :class="itemClass" :target="item.target" :href="item.href" ripple v-bind:disabled="item.disabled"
    :title="item.title">
    <v-list-tile-action>
      <v-icon> {{ item.icon }} </v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title> {{ item.title}} </v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action v-if='item.subAction'>
      <v-icon class="success--text"> {{ item.subAction }}</v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>


<script src="./v-menu.js"></script>

<style scoped>
  .v-menu-item {
    max-width: 100%;
  }
</style>
