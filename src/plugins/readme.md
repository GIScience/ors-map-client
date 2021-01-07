# Plug-ins folder #

This folder is reserved for plug-ins. Each plug-in must be contained in a folder created under the `plugins` folder. For example: src/plugin/my-awesome-plugin. No file should be directly put in the root of the `plugins` folder.

Each plug-in is expected to have a class and methods/functions that can be called on hooks defined in the hooks.js. Check the ExamplePlugin in `plugin-example/plugin-example.js` and `/src/config/hook-example.js` for more details.

## What can be used in a plug-in ? ##

Besides the parameters passed to each method via hook call, inside a plug-in you can use the values stored in the [vuex](https://vuex.vuejs.org/guide/) store (you need to import import store from '@/store/store') and access, for example, `store.getters.mapBounds`. You can also use the app constants to compare values. In order to do this import `constants` from `@/resources/constants`

Within the plug-in you can also set listeners to events emitted via `evenBus`, for example `mapViewDataChanged`, as well as emit those events. Some of the events emitted via `eventBus` are:

- `mapViewDataChanged`
- `loadAvoidPolygons`
- `showLoading`
- `removePlace`
- `markerDragged`
- `filtersChangedExternally`
- `directionsFromPoint`
- `directionsToPoint`
- `addRouteStop`
- `appRouteDataChanged`

You can search the entire app for `eventBus.$on(` to find all the events emitted via eventBus.
