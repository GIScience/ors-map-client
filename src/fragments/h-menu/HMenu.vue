<template>
  <v-menu attach="body" v-if="item.items  && Array.isArray(item.items) && showMenuItem(item)" open-on-hover offset="10" :key="item.href" content-class="hm-content">
    <template v-slot:activator>
      <v-btn class="app-btn-mh" :class="{'has-icon':item.showIcon, 'active': item.active}" :href="getHref(item)" :key="item.href" variant="text" :title="item.title">
        <v-icon v-if="item.showIcon" start>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
    </template>
    <v-list class="app-hm-list">
      <v-list-item v-for="(child, childIndex) in item.items" :key="item.href+'-'+childIndex">
        <app-h-menu :item="child" :showIcon="showIcon" :showMenuItemFn="showMenuItem" ></app-h-menu>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else-if="!item.divider && !item.header && !item.notInHeader && showMenuItem(item)" class="app-btn-mh" :class="{'has-icon':item.showIcon, 'active':item.active}" :href="getHref(item)" :title="item.title" :key="item.href" variant="text">
    <v-icon v-if="item.showIcon" size="large" start>{{item.icon}}</v-icon>
    <template v-else>
      {{item.title}}
    </template>
  </v-btn>
</template>

<script src="./h-menu.js"></script>

<style src="./h-menu.css"></style>
