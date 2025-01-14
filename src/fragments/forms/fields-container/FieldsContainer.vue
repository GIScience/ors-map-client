<template>
  <box customClass="fields-container" no-shadow no-top-border no-border>
    <template v-slot:content>
      <form-fields v-if="build" :parameters="parameters" @fieldUpdated="fieldUpdated"></form-fields>
    </template>
  </box>
</template>

<script src="./fields-container.js"></script>

<style scoped src="./fields-container.css"></style>
