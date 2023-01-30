import Vue from 'vue'

// Create a global event bus, so all the components
// can access it to emit and capture events using EventBus
export const EventBus = new Vue()
