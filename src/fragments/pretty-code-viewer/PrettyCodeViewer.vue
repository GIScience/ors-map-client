<template>
  <div :style="{maxHeight: maxHeight, overflowY: overflowYScroll}">
    <vue-markdown :postrender="postRender" v-if="markdownData" :source="markdownData" class="pretty-code-viewer"></vue-markdown>
    <div class="pretty-code-viewer xml" v-else-if="xmlData" v-html="xmlData" ></div>
    <json-tree class="pretty-code-viewer" v-else-if="jsonData" :data="jsonData" :level="level"></json-tree>
  </div>
</template>

<script src="./pretty-code-viewer.js"></script>
<style lang="scss" src="./pretty-code-viewer.scss"></style>
