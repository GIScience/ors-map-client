
const title = {
  inserted: (el, binding) => {
    document.title = binding.value
  },
  update: (el, binding) => {
    document.title = binding.value
  }
}
export default title
