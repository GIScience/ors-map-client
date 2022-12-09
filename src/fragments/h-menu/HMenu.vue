<template>
  <v-menu attach="body" v-if="item.items  && Array.isArray(item.items) && showMenuItem(item)" open-on-hover nudge-top="10" offset-y :key="item.href" content-class="hm-content">
    <v-btn class="app-btn-mh" :class="{'has-icon':item.showIcon, 'active': item.active}" :href="getHref(item)" :key="item.href" flat slot="activator" :title="item.title">
      <v-icon v-if="item.showIcon" left>{{item.icon}}</v-icon>
      {{item.title}}
    </v-btn>
    <v-list class="app-hm-list">
      <v-list-tile v-for="(child, childIndex) in item.items" :key="item.href+'-'+childIndex">
        <app-h-menu :item="child" :showIcon="showIcon" :showMenuItemFn="showMenuItem" ></app-h-menu>
      </v-list-tile>
    </v-list>
  </v-menu>
  <v-btn v-else-if="!item.divider && !item.header && !item.notInHeader && showMenuItem(item)" class="app-btn-mh" :class="{'has-icon':item.showIcon, 'active':item.active}" :href="getHref(item)" :title="item.title" :key="item.href" flat>
    <v-icon v-if="item.showIcon" large left>{{item.icon}}</v-icon>
    <template v-else>
      {{item.title}}
    </template>
  </v-btn>
</template>

<script src="./h-menu.js"></script>

<style src="./h-menu.css"></style>
