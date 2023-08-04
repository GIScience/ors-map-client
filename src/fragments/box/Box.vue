<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
    <wrapper-tag :tag="tag" :style="boxStyle" v-top-border:color="topBorderColor" class="box" :id="guid" :class="classes" v-if="isVisible">
      <div class="box-header" v-if="hasHeaderSlot"  v-bg:palette="headerBackground">
         <v-btn class="corner-btn close" flat :style="{background: headerBackground}" slot="title" v-if="closable" @click="close($event)" :title="$t('global.close')">
          <v-icon color="primary">close</v-icon>
        </v-btn>

        <v-btn class="corner-btn resize" flat :style="{background: headerBackground}" slot="title" v-if="resizable" @click="resize(false)" :title="maximized? $t('box.minimize') : $t('box.maximize')">
          <v-icon color="dark">open_in_new</v-icon>
        </v-btn>
        <slot name="header"></slot>
      </div>
      <div class="box-content" :class="{maximized: maximized}">
        <slot v-if="hasContentSlot" name="content"></slot>
        <slot v-if="hasDefaultSlot"></slot>
      </div>
      <div class="box-footer" v-if="hasFooterSlot">
        <slot name="footer"></slot>
      </div>
    </wrapper-tag>
  </transition>
</template>

<script src="./box.js"></script>
<style scoped src="./box.css"></style>
