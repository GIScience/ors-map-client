<template>
  <box customClass="fields-container" no-shadow no-top-border no-border>
    <div slot="content">
      <form-fields v-if="build" :parameters="parameters" @fieldUpdated="fieldUpdated"></form-fields>
    </div>
  </box>
</template>

<script src="./fields-container.js"></script>

<style scoped src="./fields-container.css"></style>
