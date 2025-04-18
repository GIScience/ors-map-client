import PreparedVue from '@/common/prepared-vue.js'
const focus = {
  mounted: (el, binding) => {
    focus.processFocus(el, binding)
  },
  updated: (el, binding) => {
    focus.processFocus(el, binding)
  },
  processFocus: (el, binding) => {
    if (binding.value) {
      let VueRoot = PreparedVue
      VueRoot.nextTick(() => {
        setTimeout(() => {
          let inputs = el.getElementsByTagName('input')
          if (inputs.length === 1) {
            let targetInput = inputs[0]
            if (!targetInput.value || targetInput.value.length == 0) {
              targetInput.focus({autofocus: true})
            }
          }
        }, 500)
      })
    }
  }
}
export default focus
