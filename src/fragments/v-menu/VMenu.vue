<template>
  <v-list-group v-model="item.startOpen" v-if='item.items && showMenuItem(item)' :key="item.href" v-bind:group='item.group'>
    <template v-slot:activator>
      <v-list-item :target="item.target" :href="item.href" class="v-menu-item" :class="itemClass" :title="item.title">
        <v-list-item-action>
          <v-icon> {{ item.icon }}</v-icon>
        </v-list-item-action>
        <div class="d-flex flex-column justify-center flex-grow-1 min-w-0">
          <div class="text-body-1 font-weight-medium"> {{ item.title }}</div>
        </div>
      </v-list-item>
    </template>
    <v-list-item @click.stop="nav(subItem)" class="v-menu-item" :class="itemClass" v-for='subItem in visibleSubItems' :key='subItem.href' ripple
      v-bind:disabled='subItem.disabled'>
      <app-v-menu :item="subItem" :navigateFn="navigateFn" :itemClass="itemClass" :showIcon="false" :key="subItem.href" :showMenuItemFn="showMenuItem" ></app-v-menu>
    </v-list-item>
  </v-list-group>
  <v-list-subheader :key="item.href" v-else-if="item.header && showMenuItem(item)"> {{ item.header }}</v-list-subheader>
  <v-divider :key="item.href" v-else-if="item.divider && showMenuItem(item)"></v-divider>

  <v-list-item :key="item.href" v-else-if="showMenuItem(item)" class="v-menu-item" :class="itemClass" :target="item.target" :href="item.href" ripple v-bind:disabled="item.disabled"
    :title="item.title">
    <v-list-item-action>
      <v-icon> {{ item.icon }} </v-icon>
    </v-list-item-action>
    <div class="d-flex flex-column justify-center flex-grow-1 min-w-0">
      <div class="text-body-1 font-weight-medium"> {{ item.title}} </div>
    </div>
    <v-list-item-action v-if='item.subAction'>
      <v-icon class="text-success"> {{ item.subAction }}</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>


<script src="./v-menu.js"></script>

<style scoped>
  .v-menu-item {
    max-width: 100%;
  }
</style>
