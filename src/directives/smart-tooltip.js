import { createPopper } from '@popperjs/core'
import appConfig from '@/config/app-config'
import AppLoader from '@/app-loader'
import utils from '@/support/utils'
import store from '@/store/store'

/**
 * Popper tooltip directive handler
 */
const smartTooltip = {
  bind(el, binding, vNode) {
    render(el, binding, vNode)
  },
  unbind(el, binding, vNode) {
    if (vNode.context.popperTooltipGuid) {
      closeTooltip(vNode.context.popperTooltipGuid)
    }
  },
  update(el, binding, vNode) {
    render(el, binding, vNode, true)
  },
  componentUpdated(el, binding, vNode) {
    render(el, binding, vNode, true)
  }
}

/**
 * Render the tooltip component
 * @param {*} el - DOM the element which the tooltip will be attached to
 * @param {*} binding - parameters
 * @param {*} vNode - vue element which the tooltip will be attached to
 * @param {*} updated - if the tooltip is being updated
 */
const render = (el, binding, vNode, updated = false) => {
  let options = binding.value
  if (options.show) {
    if (updated) { // it is updated, show it immediately
      showToolTip(el, options, vNode)
    } else { // otherwise, wait 2 seconds
      setTimeout(() => {
        showToolTip(el, options, vNode)
      }, 2000)
    }
  } else if (vNode.context.popperTooltipGuid) {
    removeTooltipEl(vNode.context.popperTooltipGuid)
  }
}

/**
 * Handle the close tooltip click
 * @param {*} tooltipGuid
 * @param {*} hidePermanently
 * @param {*} name
 */
const closeTooltip = (tooltipGuid, hidePermanently, name) => {
  removeTooltipEl(tooltipGuid)

  if (hidePermanently && name) {
    storeTooltipAlreadyShown(name)
  }
}

/**
 * Remove tooltip rom DOM
 * @param {*} tooltipGuid
 */
const removeTooltipEl = (tooltipGuid) => {
  if (tooltipGuid) {
    let tooltipEl = document.getElementById(tooltipGuid)
    if (tooltipEl) {
      document.body.removeChild(tooltipEl)
    }
  }
}

/**
 * Store in browser's local storage that the tooltip has already been shown
 * @param {*} tooltipName
 */
const storeTooltipAlreadyShown = (tooltipName) => {
  let mapSettings = store.getters.mapSettings
  mapSettings.shownOnceTooltips = mapSettings.shownOnceTooltips || {}
  mapSettings.shownOnceTooltips[tooltipName] = true

  store.dispatch('saveSettings', mapSettings).then(() => {
    console.log(tooltipName + ' tooltip hidden permanently')
  })
}
/**
 * Show tooltip
 * @param {*} el - DOM the element which the tooltip will be attached to
 * @param {*} options tool tip options object
 * @param {*} vNode - vue element which the tooltip will be attached to
 */
const showToolTip = (el, options, vNode) => {
  vNode.context.$nextTick(() => {
    let mustBeShown = true
    // Check if tool tip was already shown
    if ((options.showOnce || options.saveClose) && options.name) {
      let mapSettings = store.getters.mapSettings
      mustBeShown = !(mapSettings.shownOnceTooltips && mapSettings.shownOnceTooltips[options.name])
    }
    if (options.showOnce && !appConfig.showInstructionsTooltipsOnFirstLoad) {
      mustBeShown = false
    }
    if (options.forceShow) {
      mustBeShown = true
    }

    if (mustBeShown) {
      // Will remove the tooltip from DOM if it already exists
      removeTooltipEl(vNode.context.popperTooltipGuid)

      //Generate an unique id for this tooltip element
      let guid = utils.guid('popper-tooltip')

      // Get the tooltip position or a default one
      options.position = options.position || 'left'

      // Build the tooltip html, attach it to the dom
      // and set the required styles for it
      let toolTipEl = buildTooltipEl(guid, options)
      document.body.appendChild(toolTipEl)
      setArrowPseudoStyles(guid, options)

      // Build tooltip popper options
      let popperOptions = {
        placement: options.position,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }]
      }

      // Store the tooltip unique id in the vue component
      vNode.context.popperTooltipGuid = guid

      // Create the popper tooltip
      createPopper(el, toolTipEl, popperOptions)

      // Ir the tooltip must be shown only once
      // then store that it was already shown
      if (options.showOnce) {
        storeTooltipAlreadyShown(options.name)
      }
    }
  })
}

/**
 * Build tooltip el html fragment
 * @param {*} guid
 * @param {*} options
 * @returns {HtmlFragment}
 */
const buildTooltipEl = (guid, options) => {
  let vueInstance = AppLoader.getInstance()
  let background = options.dark === true ? '#333;' : 'white'
  let contentColor = options.dark === true ? 'white' : '#333'

  let toolTipCloseEl = document.createElement('a')
  toolTipCloseEl.onclick = () => {
    closeTooltip(guid, options.saveClose, options.name)
  }
  toolTipCloseEl.innerText = 'close' // material close icon will be rendered
  toolTipCloseEl.title = vueInstance.$t('global.closeAndDoNotShowAgain')
  toolTipCloseEl.className = 'popper-tooltip-close material-icons'
  toolTipCloseEl.style.color = contentColor
  toolTipCloseEl.style.float = 'right'
  toolTipCloseEl.style.cursor = 'pointer'

  let toolTipContentEl = document.createElement('div')
  toolTipContentEl.innerText = options.text
  toolTipContentEl.className = 'popper-tooltip-content'

  let style = `
    z-index:4;
    background-color: ${background};
    color: ${contentColor};
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
    max-width: 200px;
    box-shadow: 0px 2px 1px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);`

  let toolTipEl = document.createElement('div')
  toolTipEl.id = guid
  toolTipEl.setAttribute('style', style)
  toolTipEl.setAttribute('role', 'tooltip')
  toolTipEl.className = 'popper-tooltip'

  toolTipEl.innerHTML = `<div id="arrow-${guid}" data-popper-arrow></div>`
  toolTipEl.appendChild(toolTipCloseEl)
  toolTipEl.appendChild(toolTipContentEl)

  return toolTipEl
}

/**
 * Set the tooltip pseudo style by adding a style element to the DOM
 * @param {*} guid
 * @param {*} options
 */
const setArrowPseudoStyles = (guid, options) => {
  let arrowDivId = `arrow-${guid}`
  let styleElem = document.head.appendChild(document.createElement('style'))
  let positionStyle = buildArrowPosition(options)
  let arrowColor = options.dark === true ? '#333;' : 'white'

  styleElem.innerHTML = `
    #${arrowDivId} {${positionStyle}}
    #${arrowDivId}, #${arrowDivId}::before {position: absolute;width: 8px;height: 8px;z-index: -1; background: transparent;}
    #${arrowDivId}:before {content: ''; transform: rotate(45deg); background: ${arrowColor};}
    `
}

/**
 * Build the tooltip arrow position style
 * @param {String} options
 * @returns {string} arrowPosition
 */
const buildArrowPosition = (options) => {
  let arrowPosition = ''

  switch (options.position) {
    case 'top':
      arrowPosition += 'bottom: -4px;'
      break
    case 'bottom':
      arrowPosition += 'top: -4px;'
      break
    case 'left':
      arrowPosition += 'right: -4px;'
      break
    case 'right':
      arrowPosition += 'left: -4px;'
      break
  }
  return arrowPosition
}


export default smartTooltip
