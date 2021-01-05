# Plug-ins folder

This folder is reserved for plug-ins. Each plugin must be contained in a folder created under the `plugins` folder. For example: src/plugin/my-awesome-plugin. No file should be directly put in the root of the `plugins` folder.


Each plugin is expected to have a class and methods/functions that can be called on hooks defined in the hooks.js. Check the ExamplePlugin in `plugin-example/plugin-example.js` and `/src/config/hook-example.js` for more details.