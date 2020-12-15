import theme from '@/config/theme'
const bg = {
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
  // If the background must be colored based in a html color string
  if (binding.arg === 'color') {
    el.style.backgroundColor = binding.color
    // If the background must be colored based in a palette color
  // we use the value to get one of the colors in the theme object
  } else if (binding.arg === 'palette') {
    el.style.backgroundColor = theme[binding.value]
    // if the background is dark, so we need to convert the content/text content color to white
    if (binding.value === 'dark') {
      el.style.color = '#fff'
    }
  } else {
    el.style.backgroundColor = 'transparent'
  }
}

export default bg
