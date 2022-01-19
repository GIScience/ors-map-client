# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.29.0](https://github.com/GIScience/ors-map-client/compare/v1.28.2...v1.29.0) (2022-01-19)


### Features

* add surface_quality_known and allow_unsuitable parameters for wheelchair profile ([daa1799](https://github.com/GIScience/ors-map-client/commit/daa1799b3c34500b3631cb73dd10d7fce8b51c1c))
* **app-state.js:** update the html document lang when when the app language is changed ([5fa4508](https://github.com/GIScience/ors-map-client/commit/5fa450884d71750b8c501780d3b1318d1e2c1440))


### Bug Fixes

* **download.spec.js:** replace findAll for find when accessing download-format element ([f437d18](https://github.com/GIScience/ors-map-client/commit/f437d18ead012abf4205a72f9e25bfb75714dcec))
* **maps.route.js:** avoid redirecting to next route if it is the same of the current one ([e0dbe76](https://github.com/GIScience/ors-map-client/commit/e0dbe761c81f21076feea247ade24410c7e3eccc))
* **mapviewmarker.vue:** fix styles ([8669e0c](https://github.com/GIScience/ors-map-client/commit/8669e0c9cf74fadbaf8c6bf560f0bdce6e9f2775))
* **mylocation.vue:** fix styles ([9582035](https://github.com/GIScience/ors-map-client/commit/9582035a5b744b5b9a867edda7e294858196a4fa))
* **ors-map-filters-example.js:** fix the roud_trip hidden property value ([0f2860e](https://github.com/GIScience/ors-map-client/commit/0f2860e1ef3b4f4a90c9e112346ae49a6493dc32))
* **place-input.js:** fix coordinates switch and related suggestions listing ([08d0d2a](https://github.com/GIScience/ors-map-client/commit/08d0d2a164ee0391504e11de46248d5178d1c0ae))
* **place-input.js:** fix switch coords and raw coords displaying ([902a4cd](https://github.com/GIScience/ors-map-client/commit/902a4cda0f09fb779c99d6ec7f4758541d745e35))
* **place-input.spec.js:** make place-input test compatible with last component fix ([f1cd7fb](https://github.com/GIScience/ors-map-client/commit/f1cd7fb9fcb1e72b26e7c144d835cfe8450ff679))
* **place.js:** build lng lat array always from lng and lat attributes ([20e3b2b](https://github.com/GIScience/ors-map-client/commit/20e3b2b79e7d1ca6ad3b77f36ae36d67ff18a4b9))
* **share.js:** remove copy-to-clipboard child element from share container instead of from body ([f540f24](https://github.com/GIScience/ors-map-client/commit/f540f2429fa9290a1061d9e4da34238b6bd00bdd))


### Others

* **test.yml:** switch to GIScience test action ([f961dd0](https://github.com/GIScience/ors-map-client/commit/f961dd0631cf9ff6833461f83b6ba016d55a241a))


### Docs

* **changelog.md:** fix typos in changelog.md ([470478e](https://github.com/GIScience/ors-map-client/commit/470478e994634066fe7ebf0d35db53581dd6f2c6))
* **download.spec.js:** add file type doc for each menu index clicked ([af50f09](https://github.com/GIScience/ors-map-client/commit/af50f0975eb01b6cbb7ace587bb95c8ac67f272c))
* **place.js:** add missing method documentation ([170049b](https://github.com/GIScience/ors-map-client/commit/170049be9609eb00bc4b65e98066c7f4908abd05))


### Code Refactoring

* add default lang attribute to html documents ([89606b9](https://github.com/GIScience/ors-map-client/commit/89606b9374c2f5e5e21768fb76f80391cb398910))
* **dependency-service.js:** remove unused parameters ([0ef4401](https://github.com/GIScience/ors-map-client/commit/0ef4401ec8a9ece4c79acc9813174f83636df82b))
* **download.spec.js:** remove commented line ([19c3a03](https://github.com/GIScience/ors-map-client/commit/19c3a030cef8ad887e8567867b909b6d353e5131))
* fix code smells ([6485f5e](https://github.com/GIScience/ors-map-client/commit/6485f5e00a6425a378292a8da6eeee9ebe6dcb7b))
* **form-fields.spec.js:** change the way the randon field is accessed and clicked on the test ([aeadef8](https://github.com/GIScience/ors-map-client/commit/aeadef8b867aa8d09a087f1f10f8a6da3a140b02))
* **form-fields.spec.js:** refactor form-fields test ([39486c7](https://github.com/GIScience/ors-map-client/commit/39486c7c00bb5fb53625aa6e682b77ba905ff8b7))
* **formfields.vue:** remove unused sub props modal logic and child dialog fields component ([36b36d9](https://github.com/GIScience/ors-map-client/commit/36b36d966419dac1561f4fe0c5b35309f3bcf030))
* **formfields.vue:** rename random input class to random-input ([971fcbf](https://github.com/GIScience/ors-map-client/commit/971fcbf08abd5f0a7905a3e2fc5c056b58b6fb81))
* **map-view.css:** remove duplicated style ([68bb3e5](https://github.com/GIScience/ors-map-client/commit/68bb3e57a5144dc22c565170dc3243f225c9501c))
* **ors-l-polyline.css:** remove overlapping style ([3876e14](https://github.com/GIScience/ors-map-client/commit/3876e145e66015e9afb1165080fb9e98509d3eee))
* **placeinput.vue:** add classes to some elements necessary to test running ([85665d6](https://github.com/GIScience/ors-map-client/commit/85665d6c0b5d3e04ff8e4465fc35644c6dc66ec4))
* **roudn-trip:** fix typo ([c886cc5](https://github.com/GIScience/ors-map-client/commit/c886cc56bb5b914f6f528fdf6188c7ba8f2ceb74))
* **share.spec.js:** refactor share test to avoid some intermitent failures ([a7f15eb](https://github.com/GIScience/ors-map-client/commit/a7f15eb253c4e15573ceb1ca543a566033554d30))
* **slidercombo.vue:** add css class to root element and remove unused watch parameter ([48ee0e2](https://github.com/GIScience/ors-map-client/commit/48ee0e2f0eb36a7c29c8688b9fe050dd9b05fff0))


### Tests

* **base-karma.conf.js:** disable captureConsole ([5dd55fa](https://github.com/GIScience/ors-map-client/commit/5dd55faf25c3e93de9dd61dec901a11b6a461dfa))
* **base-karma.conf.js:** set captureconsole to true ([d74cfcc](https://github.com/GIScience/ors-map-client/commit/d74cfccf9d10fb144a33853b104feaf27084c4b1))
* **download.spec.js:** increase pause for gpx donwload test ([594465e](https://github.com/GIScience/ors-map-client/commit/594465e5a0a6fbf0c12dc1b391eeee048b80ea1f))
* **form-fields.spec.js:** add formfields test ([e24caab](https://github.com/GIScience/ors-map-client/commit/e24caabef5c4d8c17ca136233198068fdf59f211))
* **form-fields:** fix generate random seed test ([6256c8e](https://github.com/GIScience/ors-map-client/commit/6256c8ec4bf417cd88e98e24d7464f55d8941a21))
* **main.spec.js:** add main.js test ([aec126c](https://github.com/GIScience/ors-map-client/commit/aec126c65473fe72c4fa777d2e2bac7c6d516062))
* **place-input.spec.js:** extend place-input test coverage ([f8c2cce](https://github.com/GIScience/ors-map-client/commit/f8c2cce8164c04bd0d38aebfe2c315f570776775))
* **reach.spec.js:** increase wait timeout for isochrones reandering test ([9edc071](https://github.com/GIScience/ors-map-client/commit/9edc071b5af375efa6f030cbddc5a0fa927c1f9e))

### [1.28.2](https://github.com/GIScience/ors-map-client/compare/v1.28.1...v1.28.2) (2022-01-03)


### Bug Fixes

* **box.js:** fix method typo ([8fb2a0c](https://github.com/GIScience/ors-map-client/commit/8fb2a0c84d3383ed079997fed381287574473710))


### Performance Improvements

* **share.spec.js:** remove inconsistent assert  in share component ([604ec6d](https://github.com/GIScience/ors-map-client/commit/604ec6d6dcaca91abac775a1a842c103859ab89e))


### Code Refactoring

* **about.vue:** add class to about container ([d8f82d4](https://github.com/GIScience/ors-map-client/commit/d8f82d471a8df193f416dec7c3e26b07a738248e))
* **box.vue:** add custom classes to header corner buttons ([5682d5f](https://github.com/GIScience/ors-map-client/commit/5682d5ff5c22f2f8d6ba7ffd288cee9f6c0d3703))
* **download.js:** remove unused prop and duplicated format extension ([ab8f0b8](https://github.com/GIScience/ors-map-client/commit/ab8f0b8d113faab3a8a1cea613d430d1d14a1004))
* **download.vue:** add add class to elements ([f24e8f0](https://github.com/GIScience/ors-map-client/commit/f24e8f0407b04f79fed56340e085636fd1476821))
* **download:** refactor download component adding css classes and emitting downloadclosed event ([581dec1](https://github.com/GIScience/ors-map-client/commit/581dec1bfc19e04642ae41838ec3d6332918d972))
* **share:** append copy-to-clipboard text area to component's root element ([4cbf7ee](https://github.com/GIScience/ors-map-client/commit/4cbf7eee98e655f85433845dc058558e611a3cd0))


### Others

* **.gitignore:** add e2e download folder to gitignore ([ae98757](https://github.com/GIScience/ors-map-client/commit/ae98757ee966e7db270e60ceb852511ed786b2cb))
* add gitkeep to downloads folder ([25c2df2](https://github.com/GIScience/ors-map-client/commit/25c2df2b7ed85a0742e6454cbd3b303135bb6f89))
* ignore files in downloads folder, but keep download folder ([600d564](https://github.com/GIScience/ors-map-client/commit/600d564c1087bb0e668f66af93b5ef65469b745e))


### Tests

* **about.spec.js:** add about test ([f74a30c](https://github.com/GIScience/ors-map-client/commit/f74a30c6b9db4ecb8418364c16fd98f0b49ef8d4))
* add e2e download test for all export formats ([631e57f](https://github.com/GIScience/ors-map-client/commit/631e57f916a748823d8de5da04dfb827487ae004))
* add integration test for download component ([61c70a2](https://github.com/GIScience/ors-map-client/commit/61c70a26d801844bafee068df2dedee16c6c327f))
* add not found test for non existing route ([c29563d](https://github.com/GIScience/ors-map-client/commit/c29563de5b1aa26c1afc32655b2c7ba7194f4fd8))
* **app-render.spec.js:** replace promise resolving for await ([0d3ac5f](https://github.com/GIScience/ors-map-client/commit/0d3ac5f290b776cebed50dedd26fa7ed7340ace3))
* **base-karma.conf.js:** add the --disable-dev-shm-usage flag ([3444cab](https://github.com/GIScience/ors-map-client/commit/3444cab8f96dd6a3344c8f8d56a6b7a306f37256))
* **base-karma.conf.js:** increase karma timeouts ([6de7923](https://github.com/GIScience/ors-map-client/commit/6de7923739b9c456508aa631a694b42c1a9c62d2))
* **box.spec.js:** add unit test for box component ([c8eac13](https://github.com/GIScience/ors-map-client/commit/c8eac13a30e7e6e30f496575bef45bacd67fd7d6))
* create delete downloaded file command for nightwatch ([bab3b0b](https://github.com/GIScience/ors-map-client/commit/bab3b0b4e08e6d253d1dc0670601cf563502b5bd))
* **download.spec.js:** improve download tests ([4102f49](https://github.com/GIScience/ors-map-client/commit/4102f49c9fce695f1aff6ae84bcb81a0f15ed96a))
* **download.spec.js:** resize window before running download action ([0f25cbe](https://github.com/GIScience/ors-map-client/commit/0f25cbe4e6860f611479213beabc036d54c4f24a))
* **header.spec.js:** replace promises for await ([af9552b](https://github.com/GIScience/ors-map-client/commit/af9552be669ee297038fb4d3a7f46625a201c290))
* **nightwatch.conf.js:** add 10000 wait timeout ([91a8d13](https://github.com/GIScience/ors-map-client/commit/91a8d13d95a8a035e7e7c226dfeadba465c963f7))
* **nightwatch.conf.js:** add custom commands and default download folder ([6a6e604](https://github.com/GIScience/ors-map-client/commit/6a6e60479c3d207ea3409f4aa894e38007616c2b))
* **nightwatch.conf.js:** rename download folder to downloads ([bec4afb](https://github.com/GIScience/ors-map-client/commit/bec4afb720bbcc2c0110669c3c58f5f5fd722ce6))
* **nightwatch.conf.js:** use flag that tells browser to use temp files instead of shared memory ([8766964](https://github.com/GIScience/ors-map-client/commit/8766964691ed8a940918cf52356ecc99c6f1087f))
* remove download test files ([4890237](https://github.com/GIScience/ors-map-client/commit/489023729ca5d756884f89b6db7ffd7758a8bc2a))
* remove files from e2e download folder ([231728d](https://github.com/GIScience/ors-map-client/commit/231728daa80eb2a154b2affa5dddb5ef3716ccfb))
* rename download folder to downloads ([5af1c18](https://github.com/GIScience/ors-map-client/commit/5af1c1821206e221a910b5a9a7237aa16b70b7db))
* **search-place.spec.js:** add longer timeout for app-content visibility ([6da9888](https://github.com/GIScience/ors-map-client/commit/6da9888f8efe17400c9bf246be462077405b7efa))


### Docs

* **automated-test.md:** add missing packages in the automated test doc ([f90b83b](https://github.com/GIScience/ors-map-client/commit/f90b83b93daca81d4eb99ebb64177bbcd8bf0314))
* **learned-lessons.md:** document learned lessons ([6471d11](https://github.com/GIScience/ors-map-client/commit/6471d11830beda32e66b05ced9a98a28d0e77d34))
* **learned-lessons.md:** improve learned lessons doc ([bf432c6](https://github.com/GIScience/ors-map-client/commit/bf432c6eec5e5e252a3136c29cd3de125db14779))

### [1.28.1](https://github.com/GIScience/ors-map-client/compare/v1.28.0...v1.28.1) (2021-12-09)


### Bug Fixes

* **map-view.js:** save tile provider id when a new base layer is selected ([2405de5](https://github.com/GIScience/ors-map-client/commit/2405de5cdcff5c840ebd27c424ea0a6a42571292))

## [1.28.0](https://github.com/GIScience/ors-map-client/compare/v1.27.5...v1.28.0) (2021-12-09)


### Features

* add synchronization between map center/zoom and app url ([02949e1](https://github.com/GIScience/ors-map-client/commit/02949e1183214c33a1f5c116ece74b798b8fffe1))
* max zoom defined at tile layer provider level via app-config ([c3f5e4b](https://github.com/GIScience/ors-map-client/commit/c3f5e4bead90e11de112e0d38084fa11cd39fff7))


### Bug Fixes

* fix share embedded code url in url short mode ([d83456f](https://github.com/GIScience/ors-map-client/commit/d83456f5f51a272d1a3e2a2fb689a82954de040a))


### Tests

* improve route-importer test coverage ([bcba63c](https://github.com/GIScience/ors-map-client/commit/bcba63cf993a919160365b5fe77fdfa628cb4d41))
* **share.spec.js:** extend share component test ([8fbd0b3](https://github.com/GIScience/ors-map-client/commit/8fbd0b3ffeffbaafd91554c53ff4eafe4fd00eb5))


### Code Refactoring

* **map-definitions.js:** use default tiles provider from mapSettings ([817bd36](https://github.com/GIScience/ors-map-client/commit/817bd36ce9e720df0a415a1d9ef89be1918dc78f))
* **route-importer.js:** refactor file uploaded handling ([6154e03](https://github.com/GIScience/ors-map-client/commit/6154e0397a8fc1f4829aef7f3ccd52c801d42695))
* **route-importer.js:** remove unused code ([c0699b8](https://github.com/GIScience/ors-map-client/commit/c0699b8a6839572d5d728b371bd59c454239ec77))


### Docs

* add missing parameter type/description ([89c710a](https://github.com/GIScience/ors-map-client/commit/89c710abdcb3dd28a2e9bcda56c28facac538490))
* fix type typo ([61b5cd8](https://github.com/GIScience/ors-map-client/commit/61b5cd884fc5fc16185d4eda12cceabc6c4a5906))

### [1.27.5](https://github.com/GIScience/ors-map-client/compare/v1.27.4...v1.27.5) (2021-12-02)


### Tests

* **test.yml:** add bit.ly env secrets ([7e93653](https://github.com/GIScience/ors-map-client/commit/7e93653bb4c21c0e9054ede43361f4713dfba840))

### [1.27.4](https://github.com/GIScience/ors-map-client/compare/v1.27.3...v1.27.4) (2021-12-01)


### Build System

* use bit.ly credentials from env keys, if present ([5589dd0](https://github.com/GIScience/ors-map-client/commit/5589dd088b72444f00daaec033ba35ea942f9959))


### Tests

* increate wait for element timeout ([5f27627](https://github.com/GIScience/ors-map-client/commit/5f276273a27616b2a11769a2f3c559c691b81b42))

### [1.27.3](https://github.com/GIScience/ors-map-client/compare/v1.27.2...v1.27.3) (2021-12-01)


### Bug Fixes

* **ors-l-polyline.js:** fix the default opacity value ([086fdc1](https://github.com/GIScience/ors-map-client/commit/086fdc18314cb0d97f47a5bff1b845b8366e82bd))


### Others

* **webpack.base.conf.js:** add support for importing raw files like gpx, kml, txt and geojson ([be1384f](https://github.com/GIScience/ors-map-client/commit/be1384f3cbc1b4300396afdde9a659ed698682ac))


### Docs

* **app-hooks.js:** fix parameter type typo ([2bab02c](https://github.com/GIScience/ors-map-client/commit/2bab02c88b7c54505da2f3155a952041cdb58b56))


### Code Refactoring

* **date-picker.js:** remove unused oldval parameter in model watch function ([e422aab](https://github.com/GIScience/ors-map-client/commit/e422aabc26e3aec6c2c1753dba243dfffaf67746))
* **map-render.spec.js:** remove unused imports ([81c734b](https://github.com/GIScience/ors-map-client/commit/81c734b761d4bbbd0906434978e868f7e1a4a8af))
* pass share url as a prameter to share component ([caedb08](https://github.com/GIScience/ors-map-client/commit/caedb08444c67ee99089741891c45ffb51c322cd))
* **place-input.spec.js:** replace timeout for await ([1d09fc3](https://github.com/GIScience/ors-map-client/commit/1d09fc3ac956f6e1f101de5b210c6cdc55918e6e))
* **route-importer.js:** fix variable typo ([6d9c8d1](https://github.com/GIScience/ors-map-client/commit/6d9c8d1af8f552674ca639fadd91d3081fa02ffa))
* **routeimporter.vue:** add css class to elements ([efb0081](https://github.com/GIScience/ors-map-client/commit/efb008134701c8bb1fd7e999cc611086c4520418))


### Tests

* **route-importer.spec.js:** add test for route-importer component ([eb46748](https://github.com/GIScience/ors-map-client/commit/eb46748d5b1787937558a0b161b6fe96ed0813c6))
* **share.spec.js:** add test for share component ([aa004ce](https://github.com/GIScience/ors-map-client/commit/aa004ced7948d0470944a4da922d6d8141764c12))

### [1.27.2](https://github.com/GIScience/ors-map-client/compare/v1.27.1...v1.27.2) (2021-11-26)


### Bug Fixes

* **share.js:** update share url before displaying modal and sync share with route stop ([bfdf1f7](https://github.com/GIScience/ors-map-client/commit/bfdf1f737971cbb597ece90b8dcc4838652c6874)), closes [#245](https://github.com/GIScience/ors-map-client/issues/245)

### [1.27.1](https://github.com/GIScience/ors-map-client/compare/v1.27.0...v1.27.1) (2021-11-25)


### Bug Fixes

* update cyclosm tile url in config example ([693162e](https://github.com/GIScience/ors-map-client/commit/693162e2f316381cdcee016a23f58c729be4cc31))


### Code Refactoring

* remove unused pretty-code-viewer component ([2efaf0a](https://github.com/GIScience/ors-map-client/commit/2efaf0aa87d487ea0f7497c8c92869c34cf52bda))


### Others

* update npm packages ([20a3530](https://github.com/GIScience/ors-map-client/commit/20a35306ae504368c080e64da2a11da79b7271a5))

## [1.27.0](https://github.com/GIScience/ors-map-client/compare/v1.26.0...v1.27.0) (2021-11-22)


### Features

* **route-importer:** add support for importing .geojson files ([80922a1](https://github.com/GIScience/ors-map-client/commit/80922a152bcdad45611913af107eb8d342477c10)), closes [#243](https://github.com/GIScience/ors-map-client/issues/243)


### Bug Fixes

* fix the capitalization of the german word ([28efb62](https://github.com/GIScience/ors-map-client/commit/28efb62ca7a43279960c4fe8b6d36af480977e6e)), closes [#243](https://github.com/GIScience/ors-map-client/issues/243)

## [1.26.0](https://github.com/GIScience/ors-map-client/compare/v1.25.2...v1.26.0) (2021-11-22)


### Features

* add support for calculated min/max values and add calc parameters for isochrones interval ([af5dba3](https://github.com/GIScience/ors-map-client/commit/af5dba3609734acd2bd3a488efa734c1ec1cea8d))
* **main.js:** emit appLoaded event via eventbus once the app is loaded ([a0732be](https://github.com/GIScience/ors-map-client/commit/a0732bed1b54096fc6296be404c9b6722a9b4e3e))
* skip pushing a new route when the route is not valid ([b3221e4](https://github.com/GIScience/ors-map-client/commit/b3221e479996bd4423e6d99a9f1543865c873dff))


### Bug Fixes

* **app.js:** remove commit on created and run menu adjustment on appload event ([a66afb8](https://github.com/GIScience/ors-map-client/commit/a66afb8608c615770229383b0a6709520e1b0a6b))
* **main-menu.js:** run modifyMenu hook without loadapp wrapper ([9471cb2](https://github.com/GIScience/ors-map-client/commit/9471cb2199960b334ea3cc53584ef5bef7eda801))


### Others

* update chromedriver to 96.0.0 ([6a425b2](https://github.com/GIScience/ors-map-client/commit/6a425b2fd5b30b1f7696dc749e73166415c418d4))


### Tests

* **app-render.spec.js:** improve render tests by using await and reordering the event emit/on ([bba2b9d](https://github.com/GIScience/ors-map-client/commit/bba2b9ddb5f1414a58c3d2c3b99418fac744fb10))


### Code Refactoring

* **app-loader.js:** simplify, refactor and rename methods ([3cb6fd9](https://github.com/GIScience/ors-map-client/commit/3cb6fd98aef687f3efa4b5863372096bd165ac3f))


### Docs

* **plugin-example.js:** fix the reference to the getInstance method ([d5f2ef1](https://github.com/GIScience/ors-map-client/commit/d5f2ef1216703b0d267c511a5ebd0c9438f55e33))
* **readme.md:** fix the path to hooks-example.js file ([fab3f4b](https://github.com/GIScience/ors-map-client/commit/fab3f4b5881377bd36d1fe498b5f99c639d62d39))

### [1.25.2](https://github.com/GIScience/ors-map-client/compare/v1.25.1...v1.25.2) (2021-11-05)


### Code Refactoring

* add css class to route importer component ([872f1ce](https://github.com/GIScience/ors-map-client/commit/872f1cebd071149ad43d017de6021090082b9bfd))
* **header.vue:** remove unused button and add css class to toggle btn ([6900e61](https://github.com/GIScience/ors-map-client/commit/6900e617659f4d135e7f669fc3c3eb4882141142))


### Tests

* add tests for header and places-caroussel components and extend other tests ([42f75db](https://github.com/GIScience/ors-map-client/commit/42f75db7afe92ac4dc228e046cd3ba29cb4ccdab))
* adjust karma debug config for integration and unit tests ([fc8a2ea](https://github.com/GIScience/ors-map-client/commit/fc8a2ea13b4ac94b7af57c5621b404246f7e3af0))
* **base-karma.debug.conf.js:** fix base debug karma object return ([321be3d](https://github.com/GIScience/ors-map-client/commit/321be3d6327d6cb0a1b0ac4c8e3a12dd872595e5))
* rename, split and improve e2e tests ([bca9890](https://github.com/GIScience/ors-map-client/commit/bca9890fe13bbbd5f83e4880324f1cf046117caf))

### [1.25.1](https://github.com/GIScience/ors-map-client/compare/v1.25.0...v1.25.1) (2021-11-04)


### Docs

* **readme.md:** fix app-config path in docs and add extra details about deployment ([e83294f](https://github.com/GIScience/ors-map-client/commit/e83294f1d835eebaee1ee1a4b62d916a7c80c248))


### Code Refactoring

* **formactions.vue:** add class to each map-form-btn ([c3af03a](https://github.com/GIScience/ors-map-client/commit/c3af03af9a40c3060b6ab77eb0cf27e80ed07e7c))
* **mapform.vue:** add class to tab content containers ([0c9116b](https://github.com/GIScience/ors-map-client/commit/0c9116b14d0bfcad55835d4bdf4a62539befde9e))


### Tests

* **app-render.js:** add test for reach endpoint and directions for round trip ([1c6340d](https://github.com/GIScience/ors-map-client/commit/1c6340dd5d37a34e578d616ca752f1d1b85108ff))

## [1.25.0](https://github.com/GIScience/ors-map-client/compare/v1.24.0...v1.25.0) (2021-11-04)


### Features

* add the meta image to assets ([d0fd68e](https://github.com/GIScience/ors-map-client/commit/d0fd68e3bf155172e2d300c264ac4e5caad762cd))
* **dev.html:** add image and og meta to root dev/index html file ([52e886d](https://github.com/GIScience/ors-map-client/commit/52e886d0402887f4168ceec291c6985793db4b51))


### Docs

* **readme.md:** update the deployment flow and branch policy ([73c7b98](https://github.com/GIScience/ors-map-client/commit/73c7b988ef1af81de38893f1ec01e721a97b6520))

## [1.24.0](https://github.com/GIScience/ors-map-client/compare/v1.23.1...v1.24.0) (2021-11-03)


### Features

* **altitudepreview.vue:** add a class to the expand button ([df417de](https://github.com/GIScience/ors-map-client/commit/df417dee39975af91481178a9327eced8a708803))


### Bug Fixes

* **map-left-click:** fix the displaying of out of range coordinates ([8bb87a6](https://github.com/GIScience/ors-map-client/commit/8bb87a6fe3db87f98848c6791255a303b9ecd319))


### Code Refactoring

* use dash-case for naming spect files ([053fce4](https://github.com/GIScience/ors-map-client/commit/053fce4ea8df0423bddfcd9d1f9a2e9ea60e655e))


### Tests

* add altitude graph and place info displaying e2e tests ([59da1c1](https://github.com/GIScience/ors-map-client/commit/59da1c1d10549273818bf93e0ae5b3419cb59d3f))
* add geo-utils unit tests ([c4ce8e8](https://github.com/GIScience/ors-map-client/commit/c4ce8e836eedf9e0f62b76b419fb4052af7b6346))
* generate test coverage report only on full test run but allow run tests by type ([df02b90](https://github.com/GIScience/ors-map-client/commit/df02b90c70879ec9e987ee81f46328fdfc4958eb)), closes [#242](https://github.com/GIScience/ors-map-client/issues/242)

### [1.23.1](https://github.com/GIScience/ors-map-client/compare/v1.23.0...v1.23.1) (2021-11-02)


### Tests

* disable check for marker div in isochrones rendering ([d84e75a](https://github.com/GIScience/ors-map-client/commit/d84e75abeefaf1ed873e8ca7998e0309dbc986ab))
* enable marker check in isochrones rendering ([f24d967](https://github.com/GIScience/ors-map-client/commit/f24d967e437ce9a8e8ec5305c58a6780fb1d5bf5))
* **nightwatch.conf.js:** disable browser flag disable-web-security ([5ac612f](https://github.com/GIScience/ors-map-client/commit/5ac612f789f04b4e096701ccd7e9d147a703dbbb))

## [1.23.0](https://github.com/GIScience/ors-map-client/compare/v1.22.1...v1.23.0) (2021-11-02)


### Features

* add support for page not found mode when URL is malformed ([7e8febf](https://github.com/GIScience/ors-map-client/commit/7e8febf7810de4ca17431e9909b9fa2f78404b56))


### Code Refactoring

* move the maps modal css classes to box element ([14f6ffd](https://github.com/GIScience/ors-map-client/commit/14f6ffdeaeb10da4f31218f61dd1aa0f7572a49d))


### Tests

* **app-render.js:** add app render/loading tests for all pages/entry points ([252828e](https://github.com/GIScience/ors-map-client/commit/252828e7903821111bc20dc0fe5ae8072fe53298))
* set up custom asserts ([63547a9](https://github.com/GIScience/ors-map-client/commit/63547a9f73a47d0f20e6d5e1e010728e4ff1db73))

### [1.22.1](https://github.com/GIScience/ors-map-client/compare/v1.22.0...v1.22.1) (2021-10-27)


### Tests

* reorganize the tests commands and update the automated-test documentation ([db6d21e](https://github.com/GIScience/ors-map-client/commit/db6d21e32492986bbb0520dc5ed27a30d3385ad6))
* test embed mode only in e2e test ([2d5d98b](https://github.com/GIScience/ors-map-client/commit/2d5d98b97ac717ea11b25180c8f415e2cce5ec3b))

## [1.22.0](https://github.com/GIScience/ors-map-client/compare/v1.21.5...v1.22.0) (2021-10-27)


### Features

* **footer.vue:** add the privacy policy and terms of service links in sidebar footer ([84baea7](https://github.com/GIScience/ors-map-client/commit/84baea77f6f27eb6aa8bb0f8b782af113a8fabe4)), closes [#237](https://github.com/GIScience/ors-map-client/issues/237)


### Bug Fixes

* fix privacy policy and term of service links in about page ([f05da0d](https://github.com/GIScience/ors-map-client/commit/f05da0dfa71b5e5c707795e5de6f4a8295a13ccd)), closes [#237](https://github.com/GIScience/ors-map-client/issues/237)
* show isochrone population in the sidebar and hide population label when showing place polygon ([9bdaae2](https://github.com/GIScience/ors-map-client/commit/9bdaae21d9cfbe616f712a65b3b320435b46ead7)), closes [#238](https://github.com/GIScience/ors-map-client/issues/238)


### Docs

* **readme.md:** update the tests location in tests section ([c6b21ec](https://github.com/GIScience/ors-map-client/commit/c6b21ec7eba0616d0377be298cb274350a4aa2d2))


### Tests

* disable e2e test build progress output ([9fa9049](https://github.com/GIScience/ors-map-client/commit/9fa904905bd9e9e6003cfe613d1118d2bf413412))
* include e2e in global test script command ([dfd59ff](https://github.com/GIScience/ors-map-client/commit/dfd59ffadc5a7d390edd4ff20f102370cd25139f))
* **karma.conf.js:** fix the karma config coverage preprocessor path ([4094f0e](https://github.com/GIScience/ors-map-client/commit/4094f0eb2d9b1f29feb7e58aae269e08dd922f09))
* make e2e test runner to wait for the compiler/bundle to be ready ([4a8a6b0](https://github.com/GIScience/ors-map-client/commit/4a8a6b04cf2f96a4badaa4a4bba427e2132773bf))
* **nightwatch.conf.js:** update the test folders to tests and the chrome browser options ([d70fadc](https://github.com/GIScience/ors-map-client/commit/d70fadc1dd901a1c72607b73ee1c211db0ef2965))
* remove unused jest config file ([61252c7](https://github.com/GIScience/ors-map-client/commit/61252c7cafbcd829e6d361f4ab65a1735fd3862a))
* update the chromedriver version to 94 ([0f5b5ba](https://github.com/GIScience/ors-map-client/commit/0f5b5ba182972f5f6373785367be6f98cdb7d17d))


### Code Refactoring

* **app-config-example.js:** disable eslint no-undef in config file to avoid require error ([b85d43e](https://github.com/GIScience/ors-map-client/commit/b85d43e873121b029deb15db1982d74566d36701))

### [1.21.5](https://github.com/GIScience/ors-map-client/compare/v1.21.4...v1.21.5) (2021-10-25)


### CI

* **test.yml:** change CI test title to Run-tests ([b371eec](https://github.com/GIScience/ors-map-client/commit/b371eec0fd8067404418b200ec5a1ff4747ad7fa))


### Tests

* await for app view/data load before proceeding with the test ([a15b1c8](https://github.com/GIScience/ors-map-client/commit/a15b1c8a6256f39f09dc257fe159ea7b261773db))
* increate timeout for embed mode rendering check ([727a0ea](https://github.com/GIScience/ors-map-client/commit/727a0ea608fca02c57d3fd3125f35caa84b63c75))
* rename some tests ([2262ef2](https://github.com/GIScience/ors-map-client/commit/2262ef28c034198f548072ccf5ebb479d32a4005))


### Docs

* **readme.md:** add github test action badge ([1e736e6](https://github.com/GIScience/ors-map-client/commit/1e736e6936a9555be15f4e4a7e9685c1162ce5ba))
* **readme.md:** fix readme test badge link ([18b4df3](https://github.com/GIScience/ors-map-client/commit/18b4df3a3b829bcccf5915fd4daf0891c746edda))

### [1.21.4](https://github.com/GIScience/ors-map-client/compare/v1.21.3...v1.21.4) (2021-10-22)


### Others

* remove unused testing-related packages ([2efdbf1](https://github.com/GIScience/ors-map-client/commit/2efdbf15a319f39e0003d36added2c4c894c474b))


### Docs

* **automated-test.md:** improve automated test docs ([9fc8483](https://github.com/GIScience/ors-map-client/commit/9fc8483d27eb2e8eafc5965af868df9134ae4646))

### [1.21.3](https://github.com/GIScience/ors-map-client/compare/v1.21.2...v1.21.3) (2021-10-22)


### Performance Improvements

* use single karma configuration for unit and integration tests ([5a992c6](https://github.com/GIScience/ors-map-client/commit/5a992c61512820d0c8a10762819b1af6734a9a97))


### Tests

* add place-input test ([0be80a6](https://github.com/GIScience/ors-map-client/commit/0be80a64864c786d5fba628e1a9be8f19c9f77bc))
* add support for vue server render testing ([357495c](https://github.com/GIScience/ors-map-client/commit/357495cca2bdb43cc456034995b5b295b6a81883))
* add test for place input ([32781e0](https://github.com/GIScience/ors-map-client/commit/32781e0a340b0bbcfdd0bedf409d0154b849cc34))
* add unit test infrastructure with vue-test-utils ([a3cf6eb](https://github.com/GIScience/ors-map-client/commit/a3cf6eb3c486089977398822bb8786d51fb4ce50))


### Others

* remove test coverage results from repository ([8c806d5](https://github.com/GIScience/ors-map-client/commit/8c806d5a6b6ad5060adbb66dd72d4f8d1f8377f4))

### [1.21.2](https://github.com/GIScience/ors-map-client/compare/v1.21.1...v1.21.2) (2021-10-15)


### Tests

* adjust app embed render spec ([7f7f3a8](https://github.com/GIScience/ors-map-client/commit/7f7f3a8a8e13ebd7ec3561f0f0186f58bc4e0f5a))

### [1.21.1](https://github.com/GIScience/ors-map-client/compare/v1.21.0...v1.21.1) (2021-10-15)


### Bug Fixes

* **app-loader.js:** fix embed mode check ([48a6207](https://github.com/GIScience/ors-map-client/commit/48a6207ffc0fb3f01e7ae094b914ec2d03729f40))


### Tests

* **test.yml:** update github action test version ([fb7402f](https://github.com/GIScience/ors-map-client/commit/fb7402fd265bfd79815db56433396bdab9b7246c))
* update test specs ([57f947f](https://github.com/GIScience/ors-map-client/commit/57f947f66526ff067e0dc8576de11c196fcaa7f2))


### Docs

* include docs about automated tests ([371fc5e](https://github.com/GIScience/ors-map-client/commit/371fc5e4b53ac8e55c4458c27d0f31a7b9b13a7f))

## [1.21.0](https://github.com/GIScience/ors-map-client/compare/v1.20.5...v1.21.0) (2021-10-14)


### Features

* **app-loader.js:** use env ors key if app config has an invalid key ([ebe343e](https://github.com/GIScience/ors-map-client/commit/ebe343ede10792ef78bd3e5ab667d1b9e02eb1ce))


### Tests

* add ORSKEY to process.env variables ([a0c3bd5](https://github.com/GIScience/ors-map-client/commit/a0c3bd5122ab681fd26dde4275792ac15c8b06b8))
* use chromeheadless in karma test ([3b742e2](https://github.com/GIScience/ors-map-client/commit/3b742e2ea879cc79f364d6e464dd5ece2126970b))
* use custom chrome launcher in karma test ([6418c82](https://github.com/GIScience/ors-map-client/commit/6418c8291d0add4728d4a85348109607def09559))


### Others

* add ORSKEY to webpack en variables ([76bc94a](https://github.com/GIScience/ors-map-client/commit/76bc94a40d5d12d5b3d460ae6568254c5ce77f9c))


### CI

* **test.yml:** add github workflow for testing ([09f52dd](https://github.com/GIScience/ors-map-client/commit/09f52ddf5320a411a9580b76c8446b6bf9221058))

### [1.20.5](https://github.com/GIScience/ors-map-client/compare/v1.20.4...v1.20.5) (2021-10-14)


### Others

* **gitignore:** ignore selenium-server.log ([5798fad](https://github.com/GIScience/ors-map-client/commit/5798fad501afc2bdc8489eaadf0fe3278bd0b13e))


### Tests

* switch back to chrome headless in karma tests ([9b57c08](https://github.com/GIScience/ors-map-client/commit/9b57c089a85988b4511a547daac676234b082437))
* use ChromeHeadless in karma tests ([2d5f16f](https://github.com/GIScience/ors-map-client/commit/2d5f16f8c1a1d697a989074538b40fb4fcfaca3c))

### [1.20.4](https://github.com/GIScience/ors-map-client/compare/v1.20.3...v1.20.4) (2021-10-14)

### [1.20.3](https://github.com/GIScience/ors-map-client/compare/v1.20.2...v1.20.3) (2021-10-12)


### Tests

* remove key output in test ([baa87ad](https://github.com/GIScience/ors-map-client/commit/baa87ad951290cd2f14df9fa5d32bb1b3a1a2f1b))

### [1.20.2](https://github.com/GIScience/ors-map-client/compare/v1.20.1...v1.20.2) (2021-10-12)


### Others

* **github-actions-test.yml:** adjust github action ([ddd1aa3](https://github.com/GIScience/ors-map-client/commit/ddd1aa3a2641f7296d8eb9e6c00d10d8077474a0))

### [1.20.1](https://github.com/GIScience/ors-map-client/compare/v1.20.0...v1.20.1) (2021-10-12)


### Tests

* renamed unit to integration test ([d978fc5](https://github.com/GIScience/ors-map-client/commit/d978fc508d9478cf334796ecf569666d49ca0c42))

## [1.20.0](https://github.com/GIScience/ors-map-client/compare/v1.19.0...v1.20.0) (2021-10-11)


### Features

* basic e2e setup ([cb6019f](https://github.com/GIScience/ors-map-client/commit/cb6019f9b0f8128dfc62516a826216f29daa3f27))


### Tests

* add app, map-view and ors-api tests ([cf4beff](https://github.com/GIScience/ors-map-client/commit/cf4beff6a746744844966e4ba501d4d85fc298cd))
* add basic unit test ([aeeb0dd](https://github.com/GIScience/ors-map-client/commit/aeeb0dd5a8e7f2e234e2d383678d3236f3212df4))
* add isochrone build map data and improve other tests ([5e9c5a2](https://github.com/GIScience/ors-map-client/commit/5e9c5a2eb4167f8bf9f77f3059cfd43235291dbc))
* add karma-jasmin-webpack test infrastructure ([f6668ca](https://github.com/GIScience/ors-map-client/commit/f6668ca43cf6855aaeede39282725e42a8b66220))
* define basic tests ([64a0ad2](https://github.com/GIScience/ors-map-client/commit/64a0ad2f0479e4083d56e4032b5845dfed292f15))
* new unit tests configuration using FirefoxHeadless ([d46262e](https://github.com/GIScience/ors-map-client/commit/d46262ee0ac11c57deb8c076f318055006c8216d))


### Docs

* **map-view-data-builder.js:** fix documentation spelling ([a3616a2](https://github.com/GIScience/ors-map-client/commit/a3616a23a2f551541d48053bbf24a2dbfb52d573))


### Styling

* **ors-menu.js:** fix identation ([0ac8b0a](https://github.com/GIScience/ors-map-client/commit/0ac8b0a63bae2f4c1f66abc062379e7146055569))


### Others

* config karma debug tests to show all erros ([6b11d76](https://github.com/GIScience/ors-map-client/commit/6b11d760db2ac86d95630c3256fcd70103c550b2))
* remove test and coverage files ([d959816](https://github.com/GIScience/ors-map-client/commit/d959816dbbb37a0f6b608f56d1d63a18b41dcd17))
* remove unused packages and rename test command ([111843b](https://github.com/GIScience/ors-map-client/commit/111843b64ac6eb6d38ce9b4b5ea4d034e8e4e070))


### Code Refactoring

* **app-loader.js:** refactor method names ([8046929](https://github.com/GIScience/ors-map-client/commit/804692926089994d53a1bef36ded790956613daf))
* change the dialogs attach target element to body ([44e2c9c](https://github.com/GIScience/ors-map-client/commit/44e2c9c8dd218a7c130b1f1a7754e9d47ca003ac))
* **place-input:** add class name for place suggestion element ([0cd3d00](https://github.com/GIScience/ors-map-client/commit/0cd3d008065ac879fc4ab751794ee0900a86a49c))
* **profile-selector.js:** remove unused parameters in watchers ([4dc70c3](https://github.com/GIScience/ors-map-client/commit/4dc70c3cd2cb27c48d8be29759567ee0a55fcf4c))

## [1.19.0](https://github.com/GIScience/ors-map-client/compare/v1.18.0...v1.19.0) (2021-10-04)


### Features

* increase hgv dimentions filter values and help message ([16fc741](https://github.com/GIScience/ors-map-client/commit/16fc741804d46d07974db0609a16a8d9dbda3207))


### Bug Fixes

* **admin-area-loader.js:** make the admin loader compatible with ors-nominatim data structure ([ffd09a6](https://github.com/GIScience/ors-map-client/commit/ffd09a6ae790786117b011c6fea1dacd6fdf8269))

## [1.18.0](https://github.com/GIScience/ors-map-client/compare/v1.17.1...v1.18.0) (2021-10-01)


### Features

* place search and results displaying improved ([d9e7d55](https://github.com/GIScience/ors-map-client/commit/d9e7d550bda033636c2b1d21bed8b757dcb1f321))
* use separated county search in place search ([fd5f3e9](https://github.com/GIScience/ors-map-client/commit/fd5f3e9f3fbe70bc71853f1f9d7a7a2b68e5d5c2))


### Bug Fixes

* **place-input:** fix switching raw coordinates ([fe88dce](https://github.com/GIScience/ors-map-client/commit/fe88dcebf9fab6dbc172eb6dc80092fc9d6a0ab0)), closes [#171](https://github.com/GIScience/ors-map-client/issues/171)


### Code Refactoring

* remove unused code ([68641d0](https://github.com/GIScience/ors-map-client/commit/68641d04d17f2070521d6bdbb4f019c0708d4b11))
* remove unused code in main.js ([ed830fd](https://github.com/GIScience/ors-map-client/commit/ed830fd77e7e6499f54b17d46ed892369c64708b))

### [1.17.1](https://github.com/GIScience/ors-map-client/compare/v1.17.0...v1.17.1) (2021-09-16)


### Bug Fixes

* **maps.js:** fix app loading using /reach url ([ae39c88](https://github.com/GIScience/ors-map-client/commit/ae39c883c8550819d1bc3ceb7382981b7ede3b76))

## [1.17.0](https://github.com/GIScience/ors-map-client/compare/v1.16.0...v1.17.0) (2021-08-31)


### Features

* **default-map-settings:** define alwaysFitBounds map setting default as false ([935e101](https://github.com/GIScience/ors-map-client/commit/935e101199beda1bc0bbdccdb8e8c350e3d90c7d))


### Bug Fixes

* **floatingmenu:** fix menu item target parameter ([f25cedc](https://github.com/GIScience/ors-map-client/commit/f25cedc115eee318d808a8ae91c06a34c9064ff5))


### Styling

* **ors-menu:** adjust code identation ([15735c3](https://github.com/GIScience/ors-map-client/commit/15735c30c920db5f4610dee2a236b1b000dca356))


### Build System

* **package-lock.json:** update some dependencies ([3422fbe](https://github.com/GIScience/ors-map-client/commit/3422fbe7f6a575672808640728ed773454a5f06a))


### Code Refactoring

* **print.js:** remove console.log and adjust quote formatting ([2bb4652](https://github.com/GIScience/ors-map-client/commit/2bb46529e4197c894611b039719e817ddf2fb7c3))
* decouple the app loading from the app main ([ffe14b9](https://github.com/GIScience/ors-map-client/commit/ffe14b9b78b49f33a556f4b140bd51e753c0554d))
* migrate getInstance method from main to AppLoader class ([29d29db](https://github.com/GIScience/ors-map-client/commit/29d29db4f01071c64734508eb0ac7f9c51eba406))

## [1.16.0](https://github.com/GIScience/ors-map-client/compare/v1.15.1...v1.16.0) (2021-08-04)


### Features

* **place-input:** hide new info badge and tooltip when simple place input is focused ([01e9923](https://github.com/GIScience/ors-map-client/commit/01e9923ea3c05487e4ce649e01198136f18a38de))

### [1.15.1](https://github.com/GIScience/ors-map-client/compare/v1.15.0...v1.15.1) (2021-08-04)


### Bug Fixes

* **map-left-click:** do not show place info when sidebar is open and map view is clicked ([318c2f9](https://github.com/GIScience/ors-map-client/commit/318c2f9169ead99b4dd0faff8067d6d71443ea5f))

## [1.15.0](https://github.com/GIScience/ors-map-client/compare/v1.14.1...v1.15.0) (2021-08-04)


### Features

* do not show sidebar automatically in mobile if directions started via a pointerTriggeredAction ([751805c](https://github.com/GIScience/ors-map-client/commit/751805c25305a7132817ef9eb994ab0f95058841))

### [1.14.1](https://github.com/GIScience/ors-map-client/compare/v1.14.0...v1.14.1) (2021-08-04)


### Bug Fixes

* hide place info box when no place is selected ([18096c2](https://github.com/GIScience/ors-map-client/commit/18096c2470279b28cf9fe3796fd63c7d577ceefc))

## [1.14.0](https://github.com/GIScience/ors-map-client/compare/v1.13.2...v1.14.0) (2021-08-04)


### Features

* improve controls visibility when sidebar is open ([af4dfbd](https://github.com/GIScience/ors-map-client/commit/af4dfbdf1bd4d7339dd9b7e3849ddb844a7782a3))


### Bug Fixes

* **map-form-mixin:** sidebar open state consider the app and embed mode ([1550460](https://github.com/GIScience/ors-map-client/commit/1550460214ed3900c7d311ba34ba7c6d89243fdd))

### [1.13.2](https://github.com/GIScience/ors-map-client/compare/v1.13.1...v1.13.2) (2021-08-03)


### Bug Fixes

* **floatingmenu:** size and layout ([44cbf98](https://github.com/GIScience/ors-map-client/commit/44cbf986ca720d98aaeb0da42b9e57c4f6a11b96))

### [1.13.1](https://github.com/GIScience/ors-map-client/compare/v1.13.0...v1.13.1) (2021-08-03)


### Bug Fixes

* **places-and-directions:** route limits error message ([c014481](https://github.com/GIScience/ors-map-client/commit/c014481216d1c0c010bad5658668e4eff056e3ab))

## [1.13.0](https://github.com/GIScience/ors-map-client/compare/v1.12.0...v1.13.0) (2021-08-03)


### Features

* map floating btns boxing and shadow ([840b132](https://github.com/GIScience/ors-map-client/commit/840b132639a33ccdc98b9e55fcc7d8f47b0119e8))

## [1.12.0](https://github.com/GIScience/ors-map-client/compare/v1.11.0...v1.12.0) (2021-08-03)


### Features

* adjust map floating btns style ([3951153](https://github.com/GIScience/ors-map-client/commit/3951153b46a1da96efb90083e37f550ddc04169c))


### Bug Fixes

* **settings.i18n.de-de.js:** wrong Italian translation in German ([7378c79](https://github.com/GIScience/ors-map-client/commit/7378c797f522c4834d4897d54358e120ced284b8)), closes [#165](https://github.com/GIScience/ors-map-client/issues/165)

## [1.11.0](https://github.com/GIScience/ors-map-client/compare/v1.10.0...v1.11.0) (2021-08-02)


### Features

* **about.vue:** create the aboutContentDefined hook ([424504f](https://github.com/GIScience/ors-map-client/commit/424504f2a94cd7d8f6a7daccb1d647505cc9bfb7))


### Code Refactoring

* **box.js:** remove unused parameter and changed variable name ([bf624f4](https://github.com/GIScience/ors-map-client/commit/bf624f48720cef61133341f2cfa6a79562050c70))

## [1.10.0](https://github.com/GIScience/ors-map-client/compare/v1.9.1...v1.10.0) (2021-08-02)


### Features

* **floating-menu:** add floatingMenuItemsDefined hook ([215f008](https://github.com/GIScience/ors-map-client/commit/215f008c8bbf86e60f9aefda1af629b6986db05d))

### [1.9.1](https://github.com/GIScience/ors-map-client/compare/v1.9.0...v1.9.1) (2021-08-02)


### Bug Fixes

* **places-and-directions.js:** direct flag of last place set to false after place removal ([21867d4](https://github.com/GIScience/ors-map-client/commit/21867d4b9b02290d1a976ccaf75f829e77867745))

## [1.9.0](https://github.com/GIScience/ors-map-client/compare/v1.8.0...v1.9.0) (2021-08-02)


### Features

* improve place suggestion UI ([5e8ed57](https://github.com/GIScience/ors-map-client/commit/5e8ed57ea0ff538008142283b08b1a08e7b39f5b))
* **map-view-leaflet.css:** do not increase layer control size when in touch mode ([557c64f](https://github.com/GIScience/ors-map-client/commit/557c64f23713244e1396e7d91b90693c92c20e50))
* **map-view.css:** square the accessibility-btn ([0186124](https://github.com/GIScience/ors-map-client/commit/018612418b8146414d3aff67025e4a32c67b4cae))
* **ors-l-polyline:** do not show route popup on new route when in low resolution or mobile devices ([9374d22](https://github.com/GIScience/ors-map-client/commit/9374d2252f17d4c96017050134f11cad9dd4b2d4))
* show new info badge instead of opening sidebar automatically when in low resolution ([ff0049e](https://github.com/GIScience/ors-map-client/commit/ff0049ebdf2ca29e9b8447e39319272212f40f9a))

## [1.8.0](https://github.com/GIScience/ors-map-client/compare/v1.7.1...v1.8.0) (2021-07-29)


### Features

* sidebar overflow and my-location btn visibility when height graph is open ([c1b64fc](https://github.com/GIScience/ors-map-client/commit/c1b64fc46e929cac699b6897162c8e17208bea73))

### [1.7.1](https://github.com/GIScience/ors-map-client/compare/v1.7.0...v1.7.1) (2021-07-29)


### Bug Fixes

* **map-view.js:** disable gestureHandling based on embed mode ([c47ba76](https://github.com/GIScience/ors-map-client/commit/c47ba767ee4a5809ecd395dc5c0542e60f487302))

## [1.7.0](https://github.com/GIScience/ors-map-client/compare/v1.6.1...v1.7.0) (2021-07-29)


### Features

* **hooks-example.js:** remove hook priority from appLoaded example ([a6622eb](https://github.com/GIScience/ors-map-client/commit/a6622eb3555f3bbbda272b64b50dbad9e6aa128a))
* improve map dynamic controls visibility ([8c2a857](https://github.com/GIScience/ors-map-client/commit/8c2a85767bee55d7c1556705b1d3040157659ecf))


### Bug Fixes

* disable swipe for tabs and sidebar ([6be0dad](https://github.com/GIScience/ors-map-client/commit/6be0dad0418431e85fb5d368af254dcb8a4e02c9))

### [1.6.1](https://github.com/GIScience/ors-map-client/compare/v1.6.0...v1.6.1) (2021-07-28)


### Bug Fixes

* **map-view:** uI elements z-index and positioning ([6ea7bca](https://github.com/GIScience/ors-map-client/commit/6ea7bcacdcd29834d117a4bb09e80ada7ee7c0cb))
* **sidebar:** use stateless naviagation drawer ([8125c9e](https://github.com/GIScience/ors-map-client/commit/8125c9e87d80c7d772b639fbffbae7c684283a57))
* improve right/letf map click handling ([609ad07](https://github.com/GIScience/ors-map-client/commit/609ad078b2e3237c12b12af991601f1417e2284d))
* moving marker on mobile with touch event ([d7bb23a](https://github.com/GIScience/ors-map-client/commit/d7bb23a56a8afd593fa1e837a41a64c67a060bf2))

## [1.6.0](https://github.com/GIScience/ors-map-client/compare/v1.5.1...v1.6.0) (2021-07-27)


### Features

* support for promise in directions and isochrone args hooks ([529e114](https://github.com/GIScience/ors-map-client/commit/529e1147e7f9a1e59249bd2157d85d2dd834ee6e))


### Code Refactoring

* **map-view.js:** remove unused reject ([6b362bb](https://github.com/GIScience/ors-map-client/commit/6b362bbdcc4df7b81381527f5b5fbb41bdc8f044))

### [1.5.1](https://github.com/GIScience/ors-map-client/compare/v1.5.0...v1.5.1) (2021-07-22)


### Bug Fixes

* **maps.route.js:** use max place inputs allowed declared on app-config.js ([d934e2b](https://github.com/GIScience/ors-map-client/commit/d934e2b370afc132056c4790edf75404b88b0d7d)), closes [#163](https://github.com/GIScience/ors-map-client/issues/163)

## [1.5.0](https://github.com/GIScience/ors-map-client/compare/v1.4.1...v1.5.0) (2021-07-20)


### Features

* **mapview.vue:** add opacity option for WMS tile layer ([bdf522f](https://github.com/GIScience/ors-map-client/commit/bdf522fcc10a0ba813f494acd20ce9817dccc901))

### [1.4.1](https://github.com/GIScience/ors-map-client/compare/v1.4.0...v1.4.1) (2021-07-20)


### Bug Fixes

* **app-hooks.js:** pass the arg throught multiple calls in runPluginHook ([af08fea](https://github.com/GIScience/ors-map-client/commit/af08feab0d9708c314193270458be944729cf2ba))
* **maps.css:** refresh button width set to min-width ([0b41af2](https://github.com/GIScience/ors-map-client/commit/0b41af2500e477c00043b54a907c8442f06d91da))
* **maps.vue:** activePlaceIndex name corrected ([4ab0ba3](https://github.com/GIScience/ors-map-client/commit/4ab0ba3972f93a8847011161a5401137a300292f))


### Others

* remove not used marker images ([c28e3a6](https://github.com/GIScience/ors-map-client/commit/c28e3a6f36a9636c01f067920305c72be55268dd))


### Code Refactoring

* **geo-utils.js:** change variable and method names ([883e66c](https://github.com/GIScience/ors-map-client/commit/883e66c89ca01bfee2000bd21034494e3f8d736e))
* **map-view.js:** simplified loadMapData and outsourced the focus place task ([f639ea8](https://github.com/GIScience/ors-map-client/commit/f639ea883ad4ef8c64d27540f31425e204617449))

## [1.4.0](https://github.com/GIScience/ors-map-client/compare/v1.3.0...v1.4.0) (2021-07-19)


### Features

* add layerProvidersLoaded hook ([2a4284e](https://github.com/GIScience/ors-map-client/commit/2a4284e545d943bcb3ad9a97df704e570c77da42))
* add support for WMS overlayer ([b759a38](https://github.com/GIScience/ors-map-client/commit/b759a38f18e7266a62c625b92fad56ba6b502d1a))

## [1.3.0](https://github.com/GIScience/ors-map-client/compare/v1.2.0...v1.3.0) (2021-07-19)


### Features

* **plugins:** simplify plugins load via hooks ([52d684f](https://github.com/GIScience/ors-map-client/commit/52d684f6a77b657c8b03174bfe6fbe72afe68ddf))


### Bug Fixes

* **admin area loader:** fix the admin area loader feature ([d140ab6](https://github.com/GIScience/ors-map-client/commit/d140ab6be9d1514bf851b14c464ad5820c026dd5))


### Code Refactoring

* **app-hooks.js:** fix spelling of priority parameter ([736adf1](https://github.com/GIScience/ors-map-client/commit/736adf18101b671351d3e4d649865f18e2381cdc))
* **map-view.js:** improve code and outsource tasks ([60829c4](https://github.com/GIScience/ors-map-client/commit/60829c4d9e1759beca2dba1350c1f8654bae1c0c))
* **maps.js:** fix spelling of property ([32ea7c4](https://github.com/GIScience/ors-map-client/commit/32ea7c4e8e04dcc5f81a103a788d96da6715a471))


### Docs

* **hooks-example.js:** fix spelling on hooks example docs ([c8abfcf](https://github.com/GIScience/ors-map-client/commit/c8abfcf087f6e4ee48e71cd9bbdc9ac71be081dd))
* **readme:** updated contribute section ([75f99e3](https://github.com/GIScience/ors-map-client/commit/75f99e3eab61956d077321565acf2e1607a1d71b))
* **readme.md:** remove the reference to the shared-services folder ([30e92a8](https://github.com/GIScience/ors-map-client/commit/30e92a8704c03639e4ede895f5f7268467c52a2c))

## [1.2.0](https://github.com/GIScience/ors-map-client/compare/v1.1.10...v1.2.0) (2021-07-08)


### Features

* add green and noise extra info ([61aff08](https://github.com/GIScience/ors-map-client/commit/61aff08109c2d84e5fb421a45d55336ce9778b21)), closes [#162](https://github.com/GIScience/ors-map-client/issues/162)


### Code Refactoring

* refactoring of the code for new eslint rules ([04d0a8e](https://github.com/GIScience/ors-map-client/commit/04d0a8e3258488104bae1f0e596f991b179daffd))


### Docs

* command to copy config files simplified ([2a81372](https://github.com/GIScience/ors-map-client/commit/2a813729dd1d8a9d51cb72081dd429edb78c393b))


### Others

* **en-translation-source-merged.json:** update the translation source merged file ([e49514a](https://github.com/GIScience/ors-map-client/commit/e49514a120a66392ee348e8b10969a0ff0909853))

### [1.1.10](https://github.com/GIScience/ors-map-client/compare/v1.1.9...v1.1.10) (2021-07-02)

### [1.1.9](https://github.com/GIScience/ors-map-client/compare/v1.1.8...v1.1.9) (2021-07-02)



### Others

- prepare changelog and add committing/versioning section in readme ([33b0795](https://github.com/GIScience/ors-map-client/commit/33b079541c8bbea9b33db4d23770f312ed9d505c))

* **package.json:** add commitizen ([4992ee3](https://github.com/GIScience/ors-map-client/commit/4992ee3fcb925af7d4bf7dc238e4fa8b7333c51c))
* **package.json and changelog.md:** add standard-version ([05787d2](https://github.com/GIScience/ors-map-client/commit/05787d20bac3cc94ad3a9dc76e3d77aebb0277c8))

### [1.1.8](https://github.com/GIScience/ors-map-client/compare/v1.1.7...v1.1.8) (2021-06-30)

### Features


- Total population to isochrones view and printable
- Fixed typo in map view

### Bug Fixes


- Rebuild the value of filter with conditional displaying rules

### 1.1.7 (2021-06-30)


### Others


- Updated link to ask to point to specific maps category
- Migrated links to constants file

### 1.1.6 (2021-06-29)


### Features


- Implemented printing template strategy
- Printing for Place
- Printing for Isochrones
- Printing for round trip

### Bug Fixes


- Profile params parameters only for certain profiles (wheelchair and hgv)

### Others


- Link for ask forum goes direct to maps category
- removed unused store related to sidebar UI
- removed unused data from App.js
- Removed logic for setting footer visibility (not used anymore)

### 1.1.5 (2021-06-25)

### Features



- Prefer green routes filter (only for Germany)
- Prefer quiet routes filter (only for Germany)
- Print route instructions
- Toggle isochrone visibility individually
- Adjust isochrone opacity individually
- Adjust route polyline opacity (to see street names covered by it)

### Bug Fixes


- Nested filters start open at page load when they have non default values
- Route polyline background (white)
- Typos in variables/methods and in comments

### Others


- Improved slider UI

### 1.1.4 (2021-06-21)

### Bug Fixes



- slider-combo reset action (remove any value)

### 1.1.3 (2021-06-16)

### Bug Fixes



- Visibility condition to max_speed filter in ors-map-filter.js
- Typos in variables and in internal documentation

### Features


- Properties that are not used anymore in Place model
- Temp places for directions in MapView.js

- Allow going to direction mode with only on place defined/filled
- Support for origin/destination placeholder in app URL
- Support for zoom level based on the only place defined when in directions
- Static method getFilledPlaces in Place model

### 1.1.2 (2021-06-10)

### Bug Fixes



- Typo in avoidPolygonsChangedInDirections hook name
- Typo in map-form-mixin avoidPolygonsFilterAccessor

### 1.1.1 (2021-06-09)

### Bug Fixes



- Typo in German translations and in Spanish

### 1.0.17 (2021-06-01)

### Bug Fixes



- Condition to apply isochrones time/distance range (ors-map-filter-example.js changed)

### 1.0.16 (2021-05-31)

### Bug Fixes



- Slow performance due to inadequate object watch in route-details.js

### 1.0.15 (2021-05-31)

### Bug Fixes



- Slow performance due to inadequate object watch in altitude.js

### 1.0.14 (2021-05-31)

### Bug Fixes



- Added support to the `visibleWhen` attribute to ors-map-filters
- Fixed the displaying of alternative routes using the visibleWhen attribute

### 1.0.13 (2021-05-28)

### Bug Fixes



- Spelling, formatting and grammar issues in the README.md, documentation, changelog and comments
- Spelling of variables and properties
- Hungarian typo
- Isochrones calculating msg duration
- Variables typo
- Automatically calculate a roundtrip when one place is defined and an option is changed

### Others


- Update ors-js lib to version 1.0.13 with timeout param support
- Hook event name from `avoidPolygonBtnTraslations` to `avoidPolygonBtnTranslations`
- Removed filter-dependency-service.js (merged with dependency-service.js)

### Features


- Support to filter value conditions dependency
- Define isochrone rages by profile and dynamic intervals based on range value

### 1.0.12 (2021-04-28)


### Features


- Add Hungarian language


### Bug Fixes


- Show slider current value as user moves the slider

### 1.0.11 (2021-04-23)


### Bug Fixes


- the processing of filter values that are invalid and were affecting some valid filters

### 1.0.10 (2021-04-20)


### Features


- Auto close download and settings modal after executing the main action
- Update map view when in directions mode, a place changes, but there is no valid route yet
- Only show marker with number inside when displaying a route
- File `src/config-examples/default-map-settings-example.js` updated

### Others

- Typos in places-and-directions
- Invalid filter values when profile changes




### 1.0.9 (2021-04-09)


### Features




- right click context menu 'Inspect data on OSM'

- Keep altitude chart/graph open when route changes
### 1.0.8 (2021-04-07)

### Features




- raw routing (skip all segments) option in advanced settings
- a field for custom over layer in settings

### Others


- file `src/config-examples/default-map-settings-example.js` (Update your config)

### 1.0.7 (2021-04-01)

### Features



- Show ascent and descent for each segment on route details component

### Others

- Removed altitude component i18n files, since it is not been used anymore

### 1.0.6 (2021-03-25)

### Features





- support for gpx, xml and kml multi segment routes

### Bug Fixes


- Fix building routes as alternative routes in file importer

### 1.0.5 (2021-03-25)


### Bug Fixes


- Stop displaying old route when the route way points changed, and a new route cannot be calculated
- Build extra info highlight color based on an item index or value

### 1.0.4 (2021-03-24)

### Bug Fixes



- Show place markers when the route cannot be calculated
- Show calculating toaster indefinitely (until an error or success toaster replace it)
- the adding of extra info to the request when a nested profile is active, like foot-hiking

### Features


- avoid_feature filters that are not supported anymore (update your local `ors-map-filters.js`)

### 1.0.3 (2021-03-22)


### Bug Fixes


- Fixed admin area loader filter for cases when no locality is available

### 1.0.2 (2021-03-22)

### Features




- Support to search by postal code
- Auto-select in place input by pressing enter/return also in the case of a single postal code layer result
- Changed template/example file `layer-zoom-mapping-example` to include postal code (update your config)

### 1.0.1 (2021-03-18)



## Features

- Allow to save default locale as preferred locale
- Changed sidebar foot height
- Updated About translation in French
