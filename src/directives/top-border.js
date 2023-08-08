import theme from '@/config/theme'
const topBorder = {
  bind (el, binding) {
    render(el, binding)
  },
  update (el, binding) {
    render(el, binding)
  },
  componentUpdated (el, binding) {
    render(el, binding)
  }
}

const render = (el, binding) => {
  if (binding.value === false) {
    el.style.borderTop = 'none'
  } else {
    let thickness =  '5px'
    if ( typeof binding.value === 'object') {
      let color = binding.value.color
      thickness = binding.value.thickness
      el.style.borderTop = `${thickness} solid ${color}`
    } else {
      // If the top border must be colored based in a palette color
      // we use the value to get one of the colors in the theme object
      if (binding.arg === 'palette') {
        const palette = theme[binding.value]
        el.style.borderTop = '5px solid ' + palette
        // If the top border must be colored based in a html color string
      } else if (binding.arg === 'color') {
        el.style.borderTop = '5px solid ' + binding.value
      } else { // if arg is not defined, just apply the primary color from the theme
        el.style.borderTop = '5px solid ' + theme.primary
      }
    }

  }
}

export default topBorder
