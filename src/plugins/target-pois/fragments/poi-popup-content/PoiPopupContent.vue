<template>
  <div>
    <div class="place-name" v-if="place.properties.name && showName">
      {{place.properties.name}}
      <br><br>
    </div>
    <template v-for="(prop, key) in place.properties">
      <div v-if="showProp(key)" :key="key" class="prop-container">
        <div >
          <span class="prop-name">{{geHumanizedKey(key)}}</span>: 
          <a target="_blank" v-if="prop.startsWith('http')" :href="prop">{{prop}}</a>
          <b v-else>{{prop}}</b>
        </div>
      </div>
    </template>
  </div>
</template>
<script src="./poi-popup-content.js"></script>
<style src="./poi-popup-content.css"></style>
