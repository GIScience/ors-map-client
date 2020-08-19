import Vue from '@/common/vue-with-vuetify.js'
const focus = {
  inserted: (el, binding) => {
    focus.processFocus(el, binding)
  },
  update: (el, binding) => {
    focus.processFocus(el, binding)
  },
  processFocus: (el, binding) => {
    if (binding.value) {
      let VueRoot = Vue
      VueRoot.nextTick(() => {
        setTimeout(() => {
          let inputs = el.getElementsByTagName('input')
          if (inputs.length === 1) {
            let targetInput = inputs[0]
            targetInput.focus({autofocus: true})
          }
        }, 500)
      })
    }
  }
}
export default focus
