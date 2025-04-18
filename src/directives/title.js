
const title = {
  mounted: (el, binding) => {
    document.title = binding.value
  },
  updated: (el, binding) => {
    document.title = binding.value
  }
}
export default title
