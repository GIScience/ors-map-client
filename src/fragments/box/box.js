
/**
 * Box component
 * @emits closed [to parent] passing maximized: boolean
 * @emits boxMaximized [global] passing object {maximized: boolean, guid: unique string}
 * @emits boxMinimized [global] passing object {maximized: boolean, guid: unique string}
 * @emits resized, [to parent] passing object {maximized: boolean, guid: unique string}
 * @emits boxCreated [to parent] passing the box guid
 * @listens boxMaximizedStackChanged
 * @listens closeBox [global, via EventBus] expecting box guid
 * @listens closeBox [global, via EventBus] expecting {guid:<id>, maximized: boolean}
 */
import theme from '@/config/theme'
import utils from '@/support/utils'
import {EventBus} from '@/common/event-bus'


export default {
  props: {
    // if the box is resizable via maximize and minimize buttons, tha will be displayed
    resizable: {
      type: Boolean
    },
    closable: { // if the box is closable via close button, that will be displayed
      type: Boolean
    },
    customClass: { // custom classes that must be attached to the box element
      type: String
    },
    headerBg: { // if the header my have a background color
      type: String
    },
    topBorderPalette: { // the palette to be used to define the color of the top border
      type: String
    },
    topBgColor: { // the color to be used as the top border
      type: String
    },
    noTopBorder: { // do not add a top border
      type: Boolean,
      default: false
    },
    right: { // align the box at the right
      type: Boolean,
      default: false
    },
    noShadow: { // do not add shadow to the box
      type: Boolean,
      default: false
    },
    noBorder: { // do not add a top border
      type: Boolean,
      default: false
    },
    fillHeight: { // if the box must have full height
      type: Boolean
    },
    background: {
      type: String
    },
    value: { // model (v-model parameter) that indicates if the box must be shown or not
      default: true
    },
    tag: { // the tag that will wrap the box
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      maximized: false,
      closed: false,
      guid: null,
      otherBoxIsMaximized: false,
      styl: null
    }
  },
  created () {
    // At the very beginning, the close value will be defined based on the value (v-model parameter)
    this.closed = !this.value
    this.guid = utils.guid('box')
    const context = this

    // When the maximize stack is changed
    // the store will emit this event
    // that allow us to synchronize the maximized boxes
    // setting each to not maximized if they are not the
    // last one (over the others)
    EventBus.$on('boxMaximizedStackChanged', function (value) {
      context.syncBoxesMaximized(value)
    })

    // The box component listen to `closeBox` event so that
    // it is possible to close a box via EventBus, passing the
    // box guid
    EventBus.$on('closeBox', function (boxGuid) {
      if (context.guid === boxGuid) {
        context.close()
      }
    })
    // The box component listen to `resizeBox` event so that
    // it is possible to resize a box via EventBus, passing
    // an object containing the boxGuid and maximized boolean property
    // like {boxGuid: <the-guid>, maximized: true}
    EventBus.$on('resizeBox', function (data) {
      if (context.guid === data.boxGuid) {
        context.resize(data.maximized)
      }
    })

    // When the box is created, it sends
    // an event to its parent telling the parent its guid
    this.$emit('boxCreated', this.guid)
  },
  watch: {
    /**
     * Remove/add any root html overflow when the maximized state changes
     * this is necessary to avoid doubled scroll on the page
     */
    'maximized' () {
      const htmlNode = document.getElementsByTagName('html')[0]
      const boxMaximized = this.resetBoxMaximizedStack()
      if (this.maximized) {
        htmlNode.style.overflow = 'hidden'
        this.$el.style.height = (window.innerHeight + 300) + 'px'
      } else {
        if (Object.keys(boxMaximized).length > 0) {
          htmlNode.style.overflow = 'hidden'
        } else {
          htmlNode.style.overflow = 'auto'
        }
      }
    },
    /**
     * We watch the box model for changes and update the internal closed data that is used to control the visibility of the box
     */
    'value' () {
      this.closed = !this.value
    }
  },
  methods: {
    show () {
      this.closed = false
    },

    /**
     * Redefines the value of the maximized stack and
     * commit it to the state
     * @returns {} maximized stack object
     */
    resetBoxMaximizedStack () {
      const boxMaximizedStack = this.$store.getters.boxMaximizedStack || {}
      if (this.maximized && !boxMaximizedStack[this.guid]) {
        boxMaximizedStack[this.guid] = 'maximized'
      }
      this.$store.commit('boxMaximizedStack', boxMaximizedStack)
      return boxMaximizedStack
    },

    /**
     * Synchronize the maximized boxes, setting it to not maximized
     * if it is not the last one (over the other)
     * Method is intended to be called when the global
     * event `boxMaximizedStackChanged` if emitted
     * @param {*} value
     */
    syncBoxesMaximized () {
      // We can have a list of boxes considered as maximized, but only the
      // last one will be displayed in the view as maximized.
      // To achieve this we keep a stack of boxes maximized,
      // but we only set the `this.maximized = true` to the box
      // that is above all others, considering the order of maximization
      const lastGuid = this.getLastBoxMaximizedGuid()
      this.maximized = lastGuid && lastGuid === this.guid
    },

    /**
     * Remove the current box guid from the maximized stack
     */
    removeFromMaximizedStack () {
      const boxMaximizedStack = this.$store.getters.boxMaximizedStack || {}
      if (boxMaximizedStack[this.guid]) {
        delete boxMaximizedStack[this.guid]
      }
    },

    /**
     * Get the last box that is defined as maximized from the stack
     * We can have a list of boxes considered as maximized, but only the
     * last one will be displayed in the view as maximized.
     */
    getLastBoxMaximizedGuid () {
      const boxMaximizedStack = this.$store.getters.boxMaximizedStack || {}
      let lastKey
      if (Object.keys(boxMaximizedStack).length > 0) {
        lastKey = Object.keys(boxMaximizedStack).at(-1)
      }
      return lastKey
    },

    /**
     * Close the box, remove it from the maximized stack and remove the root html node overflow hide
     * @emits closed, [to parent] passing the box guid
     */
    close (event) {
      event.preventDefault()
      event.stopPropagation()
      this.closed = true
      this.maximized = false

      // If the box is closed, remove it from the maximized stack
      this.removeFromMaximizedStack()

      // Remove any root html overflow in case that there is not other box maximized
      const boxMaximized = this.getLastBoxMaximizedGuid()
      if (!boxMaximized) {
        const html = document.getElementsByTagName('html')[0]
        html.style.overflow = 'auto'
      }

      // Tell the parent that the box was closed
      this.$emit('closed', this.guid)
    },

    /**
     * Resize the box (maximize or minimize)
     * @emits boxMaximized|boxMinimized - global event, passing an object containing if it was maximized and the box guid
     * @emits resized [to parent] with an object containing if it was maximized and the box guid
     * @param {*} maximized
     */
    resize (maximized) {
      this.maximized = maximized

      // Tell every body that the box was maximized/minimized
      const globalEvent = this.maximized ? 'boxMaximized' : 'boxMinimized'
      EventBus.$emit(globalEvent, { maximized: maximized, guid: this.guid })

      // Ff is not maximized, remove this box from the maximized stack
      if (!this.maximized) {
        this.removeFromMaximizedStack()
      }

      // Tell the parent that the box was resized
      this.$emit('resized', { maximized: maximized, guid: this.guid })
    }
  },
  computed: {
    isVisible () {
      return !this.closed
    },
    /**
     * Return the color to be applied in the box background
     * @returns String
     */
    backgroundColor () {
      const color = theme[this.background] ? theme[this.background] : this.background
      return color || 'transparent'
    },
    /**
     * Return the color to be applied in the box header background
     * @returns String
     */
    headerBackground () {
      return this.headerBg ? this.headerBg : 'transparent'
    },
    /**
     * Returns a boolean that indicates if it was provided a content for the `default` slot
     * @returns Boolean
     */
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    /**
     * Returns a boolean that indicates if it was provided a content for the `header` slot
     * @returns Boolean
     */
    hasHeaderSlot () {
      return !!this.$slots.header
    },
    /**
     * Returns a boolean that indicates if it was provided a content for the `content` slot
     * @returns Boolean
     */
    hasContentSlot () {
      return !!this.$slots.content
    },
    /**
     * Returns a boolean that indicates if it was provided a content for the `content` slot
     * @returns Boolean
     */
    hasFooterSlot () {
      return !!this.$slots.footer
    },
    /**
     * Returns the color that must be used to be passed to the topBorder directive
     * If the prop noTopBorder is true, then it will return false, that indicates that no border must be rendered.
     *
     * If noTopBorder is false, it defines as initial value the primary color from the @/common/theme.js palette
     * (if the prop topBorderPalette is defined) or based in the topBgColor prop.
     * @return string | false
     */
    topBorderColor () {
      if (this.noBorder && this.noTopBorder) {
        return false
      }
      // if no color must be applied
      if (this.noTopBorder) {
        return {
          color: '#cbced1',
          thickness: '1px'
        }
      }
      // the initial color the defined as primary at @/common/theme.js
      let color = theme.primary || '#cbced1'

      // if the topBorderPalette prop is defined, use it to define the color
      if (this.topBorderPalette) {
        color = theme[this.topBorderPalette]
      } else if (this.topBgColor) { // if not, try to use the topBgColor prop
        color = theme[this.topBgColor] ? theme[this.topBgColor] : this.topBgColor
      }
      return color
    },
    /**
     * Build the box style object based in computed attributes
     * @returns {} object with style properties and values
     */
    boxStyle () {
      const style = {
        background: this.backgroundColor
      }
      if (this.right) {
        style.float = 'right'
      }
      if (this.maximized) {
        style.height = 'auto'
      } else {
        style.zIndex = 'auto'
      }

      return style
    },
    /**
     * Build the classes that must be attached to the box element
     * They are defined according the maximized and noShadow props
     * and the customClass, that may contain additional classes that
     * must be added
     * @returns {} containing classes to be appended to the box element
     */
    classes () {
      const cl = {
        maximized: this.maximized,
        shadow: !this.noShadow,
        'box-border': this.noShadow && !this.noBorder
      }

      if (this.customClass) {
        cl[this.customClass] = true
      }
      cl['fill-height'] = this.fillHeight && !this.maximized

      return cl
    }
  }
}
