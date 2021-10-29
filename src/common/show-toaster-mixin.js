import AppLoader from '@/app-loader'

const showMessage = (msg, theme, options) => {
  options = options || {}
  let VueInstance = AppLoader.getInstance()
  VueInstance.eventBus.$emit('showSnack', { message: msg, theme: theme, options: options })
}

const hideMessages = () => {
  let VueInstance = AppLoader.getInstance()
  VueInstance.eventBus.$emit('hideSnack')
}

const showError = (msg, options) => {
  showMessage(msg, 'error', options)
}

const showWarning = (msg, options) => {
  showMessage(msg, 'warning', options)
}

const showInfo = (msg, options) => {
  showMessage(msg, 'info', options)
}

const showSuccess = (msg, options) => {
  showMessage(msg, 'success', options)
}

export { showMessage }
export { showError }
export { showWarning }
export { showInfo }
export { showSuccess }
export { hideMessages }
