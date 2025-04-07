import emitter from 'tiny-emitter/instance'

// Create a global event bus, so all the components
// can access it to emit and capture events using EventBus
export const EventBus = {
  $on: (...args) => emitter.on(...args),
  $emit: (...args) => emitter.emit(...args)
}
