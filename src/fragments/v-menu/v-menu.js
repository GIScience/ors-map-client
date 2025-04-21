import * as menuMixin from '@/common/menu-mixin'

export default {
  props: {
    item:
    {
      type: Object,
      required: true
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    showMenuItemFn: {
      type: Function,
      required: false
    },
    navigateFn: {
      type: Function,
      required: false
    },
    itemClass: {
      type: String,
      required: false
    }
  },
  computed: {
    visibleSubItems () {
      return this.item.items.filter(subItem => this.showMenuItem(subItem))
    }
  },
  methods: {
    ...menuMixin,
    nav (to) {
      if (this.navigateFn) {
        this.navigateFn(to)
      } else {
        this.navigate(to)
      }
    }
  }
}
