# Plugins folder

Each plug-in must be contained in a folder created under the `src/plugins` folder.
For example: src/plugin/my-awesome-plugin. No file should be directly put in the root of the `plugins` folder.

Each plug-in must have a class and methods/functions that can be called on hooks defined in the hooks.js.
Check the ExamplePlugin in `plugin-example/plugin-example.js` and `/src/config/hook-example.js` for more details.

See the full plugins' documentation in [docs/plugins.md](../../docs/plugins.md)
