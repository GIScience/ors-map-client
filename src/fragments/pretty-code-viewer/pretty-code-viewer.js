import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import JsonTree from 'ors-vue-json-tree'

export default {
  props: {
    source: {
      required: true
    },
    level: {
      default: 3,
      type: Number
    },
    maximized: {
      required: false,
      default: false
    },
    maxHeightNotMaximized: {
      default: '100%',
      type: String
    }
  },
  computed: {
    xmlData () {
      if (typeof this.source === 'string' && this.source.startsWith('<?xml')) {
        return Prism.highlight(this.source, Prism.languages.markup)
      }
    },
    markdownData () {
      if (typeof this.source === 'string' && !this.source.startsWith('<?xml')) {
        return this.source
      }
    },
    jsonData () {
      if (typeof this.source === 'object') {
        return this.source
      }
    },
    maxHeight () {
      return this.maximized ? '100%' : this.maxHeightNotMaximized
    },
    overflowYScroll () {
      return this.maxHeightNotMaximized === '100%' ? null : 'scroll'
    }

  },
  methods: {
    postRender (content) {
      setTimeout(() => {
        Prism.highlightAll()
      }, 10)

      return content
    }
  },
  mounted () {
    this.$emit('renderingFinished')
  },
  components: {
    VueMarkdown,
    JsonTree
  }
}
