# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.3.0](https://github.com/GIScience/ors-map-client/compare/v2.2.0...v2.3.0) (2024-08-23)


### Features

* add map scale ([89a86a8](https://github.com/GIScience/ors-map-client/commit/89a86a82fa9e68695868756f0a0f608bd43aba13))
* better highlight single extra info selections ([648e993](https://github.com/GIScience/ors-map-client/commit/648e993c7fa135253704de4c53cd4741b28b36b4))
* sort steepness by value ([7fdb00d](https://github.com/GIScience/ors-map-client/commit/7fdb00d8181dc1260dc0d02ef031950052c04a56))


### Bug Fixes

* extra info highlights not recalculated ([f83e5ed](https://github.com/GIScience/ors-map-client/commit/f83e5edb2896012b83e3d94d9672eea59ca8e15f))
* show extra info snackbar on top of controls ([5233a22](https://github.com/GIScience/ors-map-client/commit/5233a2216df9738c2e441bf7a3861617153f3c82))
* sidebar hiding on right-click ([ea493bd](https://github.com/GIScience/ors-map-client/commit/ea493bd32435d7d9019b20e1db07a6f85b01f2b2))
* steepness coloring & description ([95fe560](https://github.com/GIScience/ors-map-client/commit/95fe5609ac07a5fa8267e43a03ef7def293c0562))


### CI

* fix checkout command ([a48391a](https://github.com/GIScience/ors-map-client/commit/a48391a27dce89b1a80bf0cc1add6dfb77248411))
* fix production deployment ([914aa3a](https://github.com/GIScience/ors-map-client/commit/914aa3a9b068ea6b295f5c1e4406a8cdc959b825))
* **staging:** don't run on tags & enable workflow-dispatch ([c78bc51](https://github.com/GIScience/ors-map-client/commit/c78bc515e91d82989819e161c5cf0633ebe26657))


### Docs

* extract project structure to additional doc file ([97df047](https://github.com/GIScience/ors-map-client/commit/97df0477c5c4db2e5e01ab48cf5189d07259f75c))
* **README:** add project structure parts ([94e390f](https://github.com/GIScience/ors-map-client/commit/94e390f1f4fe3d85bbfca807b3796668e2f7030c))
* **README:** add sections for releasing and deployment ([9f56fef](https://github.com/GIScience/ors-map-client/commit/9f56fef6fe81633c5d4cf3eb604bfd8c2fd24557))
* **README:** adjust build and deploy section ([d6af55c](https://github.com/GIScience/ors-map-client/commit/d6af55c5d2506cf0d18e51623678dfc43fb60a8c))
* **README:** fix heading levels and syntax ([2aa1e9c](https://github.com/GIScience/ors-map-client/commit/2aa1e9cd839ff8119c337fd2943a05dddc791eeb))
* **README:** fix list numbering ([b34080f](https://github.com/GIScience/ors-map-client/commit/b34080ffa51e20806f12d2a0f14785dc80367f93))
* **README:** fix typos ([86291ce](https://github.com/GIScience/ors-map-client/commit/86291ce213fd20da276b42b0614c7e9cd578f221))
* **README:** reformat file ([ac1b5a9](https://github.com/GIScience/ors-map-client/commit/ac1b5a904401689465e164d26184b61a04215f2e))
* **README:** remove Bitly config setup, since it's not working ([7e1a05c](https://github.com/GIScience/ors-map-client/commit/7e1a05c3ea4db6ecf968a86428a7df12e29c06a4))
* **README:** remove section links ([09c41a9](https://github.com/GIScience/ors-map-client/commit/09c41a9f6de53946aab57d55ee0673c36c92f7a4))
* **README:** reorder sections ([ec472ae](https://github.com/GIScience/ors-map-client/commit/ec472aeda02ac5037576653fc4750bbaede3706b))
* **README:** update and adjust contribution sections ([eb5898b](https://github.com/GIScience/ors-map-client/commit/eb5898bf7ea2eb921c5a98e3daeb99a93231a102))
* structure heading levels ([8b26d3d](https://github.com/GIScience/ors-map-client/commit/8b26d3db0cfb5001a28b10de3c2cd8e6ea358749))

## [2.2.0](https://github.com/GIScience/ors-map-client/compare/v2.1.0...v2.2.0) (2024-08-01)


### Features

* **accessibility:** add missing alternative img descriptions ([a8b8f45](https://github.com/GIScience/ors-map-client/commit/a8b8f45ff11123d483bfe80086f0fc60969d2e44))
* **route-extras:** expand extra info section dynamically ([3c7b9e8](https://github.com/GIScience/ors-map-client/commit/3c7b9e8ae2dd226401524db75178d6028dccc30d))
* **route-extras:** store displayed extra ([d8219a5](https://github.com/GIScience/ors-map-client/commit/d8219a5de24d6c667954b99002ceebdd1e931f59))


### Bug Fixes

* add stop by dragging route ([#442](https://github.com/GIScience/ors-map-client/issues/442)) ([5821cc4](https://github.com/GIScience/ors-map-client/commit/5821cc4f73a2f3cb4af760cc2b862e475a12dd64))
* **alternative-routes:** mismatched open route details ([dbbaa51](https://github.com/GIScience/ors-map-client/commit/dbbaa512248213d4f2174e642dd6e2034a7f94dd))
* altitude not showing asc & desc summary ([#396](https://github.com/GIScience/ors-map-client/issues/396)) ([d0cf24f](https://github.com/GIScience/ors-map-client/commit/d0cf24fd596e26dfe19d1da67300f5a6db9872a0))
* chart not rebuilding on active route change ([a5a05b2](https://github.com/GIScience/ors-map-client/commit/a5a05b2564ceea53be228d60a5aea9771df9f05c))
* check for difference in opacity ([0c9325d](https://github.com/GIScience/ors-map-client/commit/0c9325dfd65d1cc4cc39e590ad76e327ae5b7aaa))
* drag point from route not working ([62cfc73](https://github.com/GIScience/ors-map-client/commit/62cfc731033a3196aa5e006c74811d0c8bf6d24d))
* extra info highlight drawn below route ([26271df](https://github.com/GIScience/ors-map-client/commit/26271df24e605948467079ab1c9644d8957a7ae0))
* footer overlaps in chrome ([#441](https://github.com/GIScience/ors-map-client/issues/441)) ([e32a692](https://github.com/GIScience/ors-map-client/commit/e32a692a3b47276a77c5870efe1ca1706c8cf7ce))
* hot-fix for compatibility issues with disaster-ors plugin ([c2fa7f8](https://github.com/GIScience/ors-map-client/commit/c2fa7f87a83b14aef990302a9245b8c0d11b3d12))
* keeping active route index for new routes ([0830c7a](https://github.com/GIScience/ors-map-client/commit/0830c7ad13e2689defaab10de3613f5552bfb54b))
* opacity 0 not respected ([#444](https://github.com/GIScience/ors-map-client/issues/444)) ([394a589](https://github.com/GIScience/ors-map-client/commit/394a5898c55b62dd377040ebafea2df4358b8d64))
* route details expanding ([8516c87](https://github.com/GIScience/ors-map-client/commit/8516c87eb6e4b1fe8f57350c923815de6013230c))


### Others

* remove unused chart-wrapper component ([b11fc54](https://github.com/GIScience/ors-map-client/commit/b11fc54a57283c2e7457afe110581ab10fc5a4a8))


### Docs

* **README:** add info on USB debugging ([1b4b832](https://github.com/GIScience/ors-map-client/commit/1b4b832256468502bcfa0de678eeb56b9679f3b0))


### Styling

* **CSS:** fix overwritten properties ([2031ea2](https://github.com/GIScience/ors-map-client/commit/2031ea2552fa6d51a19f4e840d404451c647d3e3))
* **CSS:** remove redundant qualifier ([2310e6d](https://github.com/GIScience/ors-map-client/commit/2310e6d7cb33900986f9c8e9308e95d8c144691d))
* **CSS:** suppress CssNoGenericFontName ([9f37701](https://github.com/GIScience/ors-map-client/commit/9f377018b793f8f61185c2112f402170f11b401a))
* **ES2015:** convert var to let/const ([7caf2c9](https://github.com/GIScience/ors-map-client/commit/7caf2c9a21d0f1dbbd81caee2988fb33eb7181f2))
* fix typos ([fa9de17](https://github.com/GIScience/ors-map-client/commit/fa9de17662ed6ab0a02fe00ca48911b9573c37d2))
* fix various grammar mistakes ([c22d596](https://github.com/GIScience/ors-map-client/commit/c22d5961580165d1a86ed40e74ebf7bb117dabbb))
* **JS:** remove pointless code ([577a203](https://github.com/GIScience/ors-map-client/commit/577a2039c519bef51e516cd3150491cb731a9642))
* **JS:** remove unnecessary return statements ([c549979](https://github.com/GIScience/ors-map-client/commit/c549979d0314b07e3eb05e294827c43d40736e30))
* **JS:** simplify redundant if statements ([db0e5e0](https://github.com/GIScience/ors-map-client/commit/db0e5e0d32d5aa03d3c50a3a9e6aeb9a70075a26))
* optimize imports ([78c11f6](https://github.com/GIScience/ors-map-client/commit/78c11f6ec80ec2f6aab456c836885084f066f8ce))
* suppress HttpUrlsUsage ([e24682f](https://github.com/GIScience/ors-map-client/commit/e24682fdd3c0c7fbca5b0a8b00b73e1ee6d81afe))
* suppress spell check for static lists ([70a842d](https://github.com/GIScience/ors-map-client/commit/70a842df86bdde470e014960455ae10eac9de2b8))
* suppress spell check for test data ([002aa6d](https://github.com/GIScience/ors-map-client/commit/002aa6d1e2fa24781fa3d3d3d4121b644dda1660))
* **XML:** remove duplicate attribute scoped ([5bcb07f](https://github.com/GIScience/ors-map-client/commit/5bcb07f92294a631e8fffa22b0d01de6952243bb))


### Code Refactoring

* **app-config:** adjust zoom levels to production values ([faf2ec9](https://github.com/GIScience/ors-map-client/commit/faf2ec97ea2634812b856c8bb04e6e54a67ebf33))
* cleanup various problems ([#389](https://github.com/GIScience/ors-map-client/issues/389)) ([14872a6](https://github.com/GIScience/ors-map-client/commit/14872a65a044f8d001b271167ac3beff256c008c))
* **constants:** fix and rename links ([bd454bd](https://github.com/GIScience/ors-map-client/commit/bd454bd4586aacbcbf02328400eab893321143ae))
* fix typo in function name and variables ([22e36a0](https://github.com/GIScience/ors-map-client/commit/22e36a0de5f41dddd04d21cae0d80704fcb47578))
* fix typos in CSS classes ([b50257b](https://github.com/GIScience/ors-map-client/commit/b50257ba15844e78f060fb1eae03f60e504c981c))
* **footer:** color links & use v-layout ([7434bb4](https://github.com/GIScience/ors-map-client/commit/7434bb4f3121ca5e5ff10daeffaaf8c9a097b426))
* **footer:** reduce padding ([0cc55de](https://github.com/GIScience/ors-map-client/commit/0cc55defd54521c5bc77b1afb94123080a3eed24))
* **footer:** use official short HeiGIT name ([c23eeda](https://github.com/GIScience/ors-map-client/commit/c23eeda44cd9cdc80a7ff972478002efc7552456))
* **footer:** use single footer height ([a8e3584](https://github.com/GIScience/ors-map-client/commit/a8e358407cf99e268fbde9a0f12163a67c4a96c7))
* geoUtils.getBounds() ([338e6ee](https://github.com/GIScience/ors-map-client/commit/338e6ee04aff3d03cd0611f7d61d17ca3efe5ea0))
* handle timeout correctly ([c1f7bfb](https://github.com/GIScience/ors-map-client/commit/c1f7bfb933ac10ff61ed001c65c41dfaa0eb072c))
* increase orsApiRequestTimeout ([8284954](https://github.com/GIScience/ors-map-client/commit/8284954a4e2a305d9a0d8664ade2ea91a58dd6b9))
* remove unused function ([03ae195](https://github.com/GIScience/ors-map-client/commit/03ae19556f4db5a92681bbf4097220c303f27189))
* remove unused function routeSummary ([e8f886b](https://github.com/GIScience/ors-map-client/commit/e8f886b220f3bc4f4132fae4735df70adaca35fd))
* remove unused functions ([d889b63](https://github.com/GIScience/ors-map-client/commit/d889b63041fb8aed702fc728d15c8b592fd223b8))
* rename event name to camel case convention ([da605f9](https://github.com/GIScience/ors-map-client/commit/da605f97712b86f9734ad0d2c75d11f55aa3dbd0))
* rename to camel case convention ([87b66af](https://github.com/GIScience/ors-map-client/commit/87b66af0cffa4b6032415b8509e0f4372c2d624a))
* rename variables for readability ([b1458fe](https://github.com/GIScience/ors-map-client/commit/b1458fe44ac98c8f31ebf6a0c2f83893030dce7c))
* replace deprecated hash keyword ([f25b8fb](https://github.com/GIScience/ors-map-client/commit/f25b8fbe500c156823c966a8ff91b46d09273622))
* replace property with padding shorthand ([5c22853](https://github.com/GIScience/ors-map-client/commit/5c2285380e33d4a47fbc083e23b0df9111f1be88))
* simplify if statement ([9cabcca](https://github.com/GIScience/ors-map-client/commit/9cabcca05abb4d289edacac7ae2bbe36562d0b2e))
* switch to 'for of' loop ([7735ba9](https://github.com/GIScience/ors-map-client/commit/7735ba9b4f8684efe0fb052e48776c01e5def108))
* update JSDocs ([2e0458b](https://github.com/GIScience/ors-map-client/commit/2e0458b3cd6733b1bb21cf0299d591d1d595433b))
* use Array.prototype.at() method ([2d50894](https://github.com/GIScience/ors-map-client/commit/2d50894fd1d82fd8d51479523c759de4101dd9d1))
* use for-of instead of for-in loops ([0ff7847](https://github.com/GIScience/ors-map-client/commit/0ff7847a6825416755d3540135c41aec62e4ad29))


### Tests

* adjust test to cypress 12 ([93b0dec](https://github.com/GIScience/ors-map-client/commit/93b0decf636f0548e88d89759cc7a843bb0fdcf2))
* fix linting issue with unsafe chaining ([b106976](https://github.com/GIScience/ors-map-client/commit/b106976088b15c4984a33f0a191d45eb80858c70))


### Build System

* **deps:** update chromedriver to 127.0.1 ([419334d](https://github.com/GIScience/ors-map-client/commit/419334d091c35d76131e9b70695ee8acfb26fefb))
* **deps:** update openrouteservice-js to v0.3.2 ([d3aae38](https://github.com/GIScience/ors-map-client/commit/d3aae3811d9dbb1925ba85fe5f82994b2854b349))
* **deps:** update ors-js to 0.4.1 ([9128c7d](https://github.com/GIScience/ors-map-client/commit/9128c7d5efffdd13b1d68bebb21e883145a285e7))
* migrate to vue chartjs 5.2.0 ([#390](https://github.com/GIScience/ors-map-client/issues/390)) ([a249e38](https://github.com/GIScience/ors-map-client/commit/a249e38e3e3ee0490ef507c4760b03369302c7e8))
* refactor altitude component to work with vue-chartjs 5.2 ([7f28bdd](https://github.com/GIScience/ors-map-client/commit/7f28bddd35d7a1b84a2c217c66b4a1b85aa64627))
* switch from node-sass to sass ([8ccddf5](https://github.com/GIScience/ors-map-client/commit/8ccddf59968325f22a0d89024c48d17406bf2feb))
* update dependencies ([febbca4](https://github.com/GIScience/ors-map-client/commit/febbca470b90d7db071e695710136f73cdda76df))
* update dependencies ([#395](https://github.com/GIScience/ors-map-client/issues/395)) ([a31a7f1](https://github.com/GIScience/ors-map-client/commit/a31a7f1ae8e4561b40699eb1a47680d76c3eaf7b))
* update openrouteservice-js to v0.3.1 ([#393](https://github.com/GIScience/ors-map-client/issues/393)) ([33b6475](https://github.com/GIScience/ors-map-client/commit/33b6475984a21288d73c7fa65cc9c1e678738768))
* update to node 20 & pnpm 9 ([b7f8e37](https://github.com/GIScience/ors-map-client/commit/b7f8e375e82fcba8440d10272f84e9be0bbbd753))


### CI

* add --host value to make gh actions work ([3dc8124](https://github.com/GIScience/ors-map-client/commit/3dc8124be0c5c7aaaa1f919e1e8f2ceee5e5c7f4))
* update actions ([c86992f](https://github.com/GIScience/ors-map-client/commit/c86992fdb48137f65a720bb97c28f12bc151a72d))
* upgrade pnpm version in docker to 8 ([6de0b6d](https://github.com/GIScience/ors-map-client/commit/6de0b6d3e2dd1ed5f8cf9b7904fa8eff4cc1987e))
* upgrade pnpm version to 8 ([2c26a24](https://github.com/GIScience/ors-map-client/commit/2c26a2424c323077aa21158447bae4119b2d9f3f))

## [2.1.0](https://github.com/GIScience/ors-map-client/compare/v2.0.0...v2.1.0) (2023-06-23)


### Features

* remove distance and duration text from route popup ([#366](https://github.com/GIScience/ors-map-client/issues/366)) ([6e4d420](https://github.com/GIScience/ors-map-client/commit/6e4d420ab48e6de0a60319bef3ed43b42f5c63b8))


### Bug Fixes

* avoid_countries not working ([#372](https://github.com/GIScience/ors-map-client/issues/372)) ([550024c](https://github.com/GIScience/ors-map-client/commit/550024ca2312bb223cff52383878ea90c6ed44ff))
* user location functionality ([#364](https://github.com/GIScience/ors-map-client/issues/364)) ([5e41779](https://github.com/GIScience/ors-map-client/commit/5e41779a0c8477c8fc3957246fa5a287474de047))
* Fix the usage of the legacy osm tile service to the new one. ([#375](https://github.com/GIScience/ors-map-client/issues/375)) ([5a3b590](https://github.com/GIScience/ors-map-client/commit/5a3b590a0720a7ff34c4ffd235143f21e2f1bfb8))


### CI

* fix env in heal.yml ([2bd403a](https://github.com/GIScience/ors-map-client/commit/2bd403a1d937a79d0fbf1f761e68d53b890a9000))


### Others

* **cve:** Upgrade 5 packages to close CVEs ([#367](https://github.com/GIScience/ors-map-client/issues/367)) ([96769cd](https://github.com/GIScience/ors-map-client/commit/96769cd5c3e4792c3c60b496e80a1e2fac00bf5e))
* **deps:** downgrade chart.js dependency due to ui issue ([0edc754](https://github.com/GIScience/ors-map-client/commit/0edc754b96d73b930e6662f1880b0975fc057aeb))

## [2.0.0](https://github.com/GIScience/ors-map-client/compare/v1.29.0...v2.0.0) (2023-05-09)


### Features

* change default isochrone color & enable alternative colors ([165b0a4](https://github.com/GIScience/ors-map-client/commit/165b0a47e4570ce0171243d4d1536c675c5a923e))
* Add Czech language ([c0b8258](https://github.com/GIScience/ors-map-client/commit/c0b82583e0ac39fd22a490bf778c7abbdcb0d783))
* **i18n:** add Romanian translations ([bf08ce2](https://github.com/GIScience/ors-map-client/commit/bf08ce281d2c6ea92b2ca5fccd763335664140d3))
* **i18n:** add translation builder and globals for romanian ([3b96348](https://github.com/GIScience/ors-map-client/commit/3b9634800762f466db6e72aee93319c83ffbbbd4))
* load plugin images properly ([bcaba6a](https://github.com/GIScience/ors-map-client/commit/bcaba6a23ba3d8d476e25abb7a3da343a9a4dff2))
* Make logos adjustable ([47185f8](https://github.com/GIScience/ors-map-client/commit/47185f8b87e05e3bbff91aa6fe6ef4fa598289bf))
* **tests:** Init cypress framework ([10631c1](https://github.com/GIScience/ors-map-client/commit/10631c1ea759f822daa81ca1db1e2c6c41fb7bb7))


### Bug Fixes

* Add missing element to component-index.html ([67863e1](https://github.com/GIScience/ors-map-client/commit/67863e1c9cb42e57fa72b5aff6014423bb9be7af))
* change to https links in mock data ([7e583ad](https://github.com/GIScience/ors-map-client/commit/7e583ad08e730401c24374cfabc8856099b68672))
* **constants.js:** add missing switch in field types ([bfdba3f](https://github.com/GIScience/ors-map-client/commit/bfdba3f37017c0f1a851437b82fda231e324c459))
* **cypress:** process.env.ORSKEY variable not resolving ([49c290d](https://github.com/GIScience/ors-map-client/commit/49c290dbf2f3161bb207c4a6d5a60daa803dd947))
* flaky test ([5fe8261](https://github.com/GIScience/ors-map-client/commit/5fe826151e2c3e2f2f57bc204f9d5105b5f250c7))
* floating menu using event bus ([0193e60](https://github.com/GIScience/ors-map-client/commit/0193e60c67038a73ef9c2782a19d8588e04119cd))
* git and ssl versions in Dockerfile ([b29576b](https://github.com/GIScience/ors-map-client/commit/b29576b19821ee870b9979e7adeb2cd77819a07c))
* **i18n:** remove empty first line ([1d1d9a4](https://github.com/GIScience/ors-map-client/commit/1d1d9a433eab895d719a6ff816fa7e81f8dc7ee0))
* **i18n:** revise german translation ([805afc1](https://github.com/GIScience/ors-map-client/commit/805afc1400e5b83ea3100a0f21d97e727d66fc4c))
* **map-definitions.js:** add maxZomm value for when custom tile provider is created ([e29350b](https://github.com/GIScience/ors-map-client/commit/e29350b285463bfbae1602cb85d3a433fcd4b560))
* Remove pre-commit step no-commit-to-branch ([af8a313](https://github.com/GIScience/ors-map-client/commit/af8a313b627478af147389f3240d77b16f68173b))
* Remove unnecessary installation step. ([a7b1a4e](https://github.com/GIScience/ors-map-client/commit/a7b1a4e712e294dad1721946eb07c0dcc5d7e504))
* **route-information-popup:** popup text splits mid-word ([cb3579c](https://github.com/GIScience/ors-map-client/commit/cb3579c14253761b199217362f3cbd1785cbd669))
* **route-information-popup:** popup text splits mid-word ([df1d005](https://github.com/GIScience/ors-map-client/commit/df1d005f0ba7b7056e1dc7c7d847dfd6fc284fce))
* Tests after webpack 5 migration ([9865f2c](https://github.com/GIScience/ors-map-client/commit/9865f2ce0e66e236eba0e28b67ebceb5c559bd13))


### CI

* **test:** Adjust GitHub test workflow ([61e5aac](https://github.com/GIScience/ors-map-client/commit/61e5aac8abd299ea5c515a217e75808f2d2b3b9e))
* update github runner version ([73072b8](https://github.com/GIScience/ors-map-client/commit/73072b8c6c671c403d6ba3eb7e9b8fd8ede51b07))


### Docs

* adapt EventBus documentation ([66d30e1](https://github.com/GIScience/ors-map-client/commit/66d30e1e0d11a7920cee3c9bef9579bb2e5fb8bc))
* add dynamic inputs readme and additional documentation to the main readme ([6139a2b](https://github.com/GIScience/ors-map-client/commit/6139a2b00d968a0ec44d1ba490dc1caaaf475dbb))
* Add instructions for docker and docker compose ([796a48a](https://github.com/GIScience/ors-map-client/commit/796a48a4c944df51674befb5d0e85f0464b21b89))
* Adjust doc files ([f3cef99](https://github.com/GIScience/ors-map-client/commit/f3cef998df1f4c9101f1aed4cdc104f63b960948))
* Fix old links. ([c165369](https://github.com/GIScience/ors-map-client/commit/c165369d89768bf2277a8da56e713b05bc2ebed3))
* improve plugins documentation ([11d2238](https://github.com/GIScience/ors-map-client/commit/11d22388a8203a3dd9dbbb16d6bd0eced1671a36))
* **plugins.md:** improve plugins documentation ([1ec61b7](https://github.com/GIScience/ors-map-client/commit/1ec61b7e7ec5e9b4d91715c3fe52b128b8ad425c))
* **test:** Adjust docs for tests with cypress ([9771971](https://github.com/GIScience/ors-map-client/commit/977197185a1f283a7e75cfb924a40b9fa602af34))


### Styling

* Format project with prettier for json, yaml and markdown. ([456db08](https://github.com/GIScience/ors-map-client/commit/456db08bcd3779966197526a3282cb6dd74b1e53))
* **MapLeftClick:** add space between lat & lon output ([7738051](https://github.com/GIScience/ors-map-client/commit/773805146d7b440ef58e579bd2fb51d0917c8b07))
* pre-commit eslint automatic linter fixes. ([b6626ab](https://github.com/GIScience/ors-map-client/commit/b6626ababe23faf528d0270a274b17a59e9b7804))
* pre-commit eslint manual fixes. ([76569c4](https://github.com/GIScience/ors-map-client/commit/76569c4245d83e531356d40d6f9e45b89625d7ad))
* run pre-commit end-of-file-fixer. ([f3aa047](https://github.com/GIScience/ors-map-client/commit/f3aa0474ebf8ae6a1ab7d8ea6c691a30e7056939))
* run pre-commit trailing-whitespace. ([522da4c](https://github.com/GIScience/ors-map-client/commit/522da4c5d0e0bde11cd48b26a3040c9804c67303))
* Sort package.json according to best practices. ([c0bc087](https://github.com/GIScience/ors-map-client/commit/c0bc087a4bf68271b5f9143140db202f5326dc21))


### Tests

* Add cypress examples ([2c2ac86](https://github.com/GIScience/ors-map-client/commit/2c2ac86d59c9e5dc19142ce667b3cd347b36dcef))
* Add tests for new util functions ([ec2e775](https://github.com/GIScience/ors-map-client/commit/ec2e7756c3f1da9e682fa55a30ef5229191c303f))
* **integration:** Migrate About component test ([d7ac997](https://github.com/GIScience/ors-map-client/commit/d7ac997d5bbcebc0e30c05b2fb4d9d78ee4881f5))
* Migrate about-page test ([83f1505](https://github.com/GIScience/ors-map-client/commit/83f1505672963c09d694d240e0ad88b79e0e39c3))
* Migrate app-render.spec.js ([3c842ed](https://github.com/GIScience/ors-map-client/commit/3c842ed69d9ce4338ba57d159d37bc46a775b5f8))
* Migrate Box component test ([8d430c6](https://github.com/GIScience/ors-map-client/commit/8d430c6a5d42e4782e741543c816ca9d38b32b76))
* Migrate directions test ([472b50f](https://github.com/GIScience/ors-map-client/commit/472b50fcd90717e5b4ab47e3bf020af78e4cdccf))
* Migrate download test ([8a59aca](https://github.com/GIScience/ors-map-client/commit/8a59acac02e0db5143c061020c970744b15a37a2))
* Migrate download.spec.js ([2992821](https://github.com/GIScience/ors-map-client/commit/29928214a36ba33f496241537764f74394e25cf1))
* Migrate embedded-mode test ([1068b30](https://github.com/GIScience/ors-map-client/commit/1068b30cad93c2c18c826895bbc5acf6d93accd2))
* Migrate form-fields.spec.js ([9ccfe7a](https://github.com/GIScience/ors-map-client/commit/9ccfe7a5d15c452ede0ef1be772e54143f97b51f))
* Migrate geo-utils test ([336c1ff](https://github.com/GIScience/ors-map-client/commit/336c1ffc257b3bc4198aff1d1649e235ae905a13))
* Migrate header.spec.js ([bc97b9e](https://github.com/GIScience/ors-map-client/commit/bc97b9e06a6390d7d0c2883b4fd7d69a574cf46e))
* Migrate landing-page test to home_page.cy.js ([db26803](https://github.com/GIScience/ors-map-client/commit/db2680337101a1c211262715d8bff6d563aba019))
* Migrate map-render.spec.js ([ee4e60a](https://github.com/GIScience/ors-map-client/commit/ee4e60a031b715371c1c363e4d5c8ccd94beee89))
* Migrate muild-map-data.spec.js ([3e5161b](https://github.com/GIScience/ors-map-client/commit/3e5161b582bad9bc6746bf0b45d127ce34ccde28))
* Migrate not-found test ([2d65828](https://github.com/GIScience/ors-map-client/commit/2d658280c7395682888a67097f85b41f426e59cc))
* Migrate ors-api-runner.spec.js ([e70d02f](https://github.com/GIScience/ors-map-client/commit/e70d02fe623a2bbc9bc1c45c771bd066e1588f59))
* Migrate place test ([a941cef](https://github.com/GIScience/ors-map-client/commit/a941cefe83f5c9fd254e790e8e46fcc26d0a0897))
* Migrate place-input.spec.js ([dca867b](https://github.com/GIScience/ors-map-client/commit/dca867bbef887edd2af3407b76b7fc1aaa160a58))
* Migrate places-carousel.spec.js ([c305cee](https://github.com/GIScience/ors-map-client/commit/c305cee6399ff34e47aaec2161bd986ad4f301df))
* Migrate reach test ([4210f68](https://github.com/GIScience/ors-map-client/commit/4210f68611df8a882be2d2f03a2e519a9c200238))
* Migrate route-importer.spec.js ([3d97c7d](https://github.com/GIScience/ors-map-client/commit/3d97c7dc55565297a1ea37cbf129f98c8174711a))
* Migrate search-place test ([15760d6](https://github.com/GIScience/ors-map-client/commit/15760d66aeef5a0595461f92096a7e194e371cad))
* Migrate settings-page test ([a767742](https://github.com/GIScience/ors-map-client/commit/a767742db73d4eca1f735818f0fce56561bd77a1))
* Migrate share.spec.js ([2e5957a](https://github.com/GIScience/ors-map-client/commit/2e5957a705c8634be071bcead6d9ce3094d51755))
* Move sidebar toggle test ([ec56b4e](https://github.com/GIScience/ors-map-client/commit/ec56b4e86728be39270dfdd1cf26c1d26cce3ddb))
* Remove main.spec.js ([1ae02a1](https://github.com/GIScience/ors-map-client/commit/1ae02a1c942d523662c6d69229d1aac5f667c454))
* Remove old testfolder structure ([49dada4](https://github.com/GIScience/ors-map-client/commit/49dada48a42d5f49e0fe4597c758e667b9fc2c13))
* **route-information-popup:** popup text splits mid-word ([e3beb53](https://github.com/GIScience/ors-map-client/commit/e3beb5316b746fad6c05fc50834cf8ede36282fe))


### Code Refactoring

* area value presentation ([8e11046](https://github.com/GIScience/ors-map-client/commit/8e11046efa3db46f9dcaa299f34c07e4dfc2e229))
* capitalize EventBus in comments ([ea161b0](https://github.com/GIScience/ors-map-client/commit/ea161b0815dad3cdf956c12b9266a6432c9afe76))
* **fragments:** remove unused DatePicker component ([6a188c8](https://github.com/GIScience/ors-map-client/commit/6a188c893812aacf723435af1f1e1d546b8a7494))
* **isochrones:** changes colouring of isochrones to be a red to blue scale ([749c686](https://github.com/GIScience/ors-map-client/commit/749c6862e44197b7522d7c54c0cd1eddd7b8392d))
* move eventBus to standalone module ([8acd75e](https://github.com/GIScience/ors-map-client/commit/8acd75e73ef0a6147064cc791751b5cc732ea06d)), closes [#324](https://github.com/GIScience/ors-map-client/issues/324)
* **ors-response-util.js:** remove not used import ([cc15b43](https://github.com/GIScience/ors-map-client/commit/cc15b43ea13e2323960bd02cef6691724a2663d6))
* **route-smoothness.js:** fix a typo ([1228cf8](https://github.com/GIScience/ors-map-client/commit/1228cf8695ed3c7430df681ad274a7e26c1cfdb1))
* use EventBus module also for context.eventBus ([389f39f](https://github.com/GIScience/ors-map-client/commit/389f39fec7adf8c8b5430110cd0929025dabadbb))
* use global EventBus in tests ([ac3205f](https://github.com/GIScience/ors-map-client/commit/ac3205fcf9e6caf0c3ef45e46321af34ed25bd2f))
* Enhance MapViewData constructor ([b4767b9](https://github.com/GIScience/ors-map-client/commit/b4767b975bf57d80338ddce11628cb504afae0ef))


### Build System

* Add docker and docker compose ([a34b926](https://github.com/GIScience/ors-map-client/commit/a34b926d9c81cef39cd7cfa29fc02e1e674ae716))
* Add test and build scripts for the docker setup ([234cabc](https://github.com/GIScience/ors-map-client/commit/234cabcace5ef68d10d327c619fcbb45b9320129))
* Adjust lint task to cypress test location ([43d3c5d](https://github.com/GIScience/ors-map-client/commit/43d3c5d375936ec2be3987469a8e1294e9b80965))
* **Dockerfile:** fix dependency versioning ([0f2e67b](https://github.com/GIScience/ors-map-client/commit/0f2e67b41d3514f1a3e682cb591eaa1404def1e9))
* **Dockerfile:** Relax version pinning ([a459606](https://github.com/GIScience/ors-map-client/commit/a459606c73ced35747ba42e46512a5edcff7d83c))
* Migrate to webpack 5 and node 14 ([18d703e](https://github.com/GIScience/ors-map-client/commit/18d703e356205e0d79439a01896dec6052de0bac))
* Move mock data to cypress/fixtures ([d21d1f2](https://github.com/GIScience/ors-map-client/commit/d21d1f24459234220bcdddd1164bacaf4249f671))
* Remove npm version check ([5dd666f](https://github.com/GIScience/ors-map-client/commit/5dd666f5116b8a1b35f554e2dc818d5b345a0231))
* Remove old test dependencies ([2a69fa6](https://github.com/GIScience/ors-map-client/commit/2a69fa653ec5c30e8a1f906752a06b8e9a58eb43))
* **Webpack:** Add cypress/fixtures alias ([26953e4](https://github.com/GIScience/ors-map-client/commit/26953e4e223e32f3423ce29e1ad2753b8ae7a14f))
* Replace npm with pnpm. ([252af42](https://github.com/GIScience/ors-map-client/commit/252af42cbc3eaa5f4bd97a24aa3813c446789498))


### Others

* Add cypress/downloads to .gitignore ([5d12a87](https://github.com/GIScience/ors-map-client/commit/5d12a8785fc92c20edb708c33cc0bb818e7575fd))
* Add pre-commit config,  Readme instructions and a workflow check. ([9836022](https://github.com/GIScience/ors-map-client/commit/98360228d51f7ea9a01f0f48b8395fa32ac6f035))
* Add pre-commit hooks for docker and file endings. ([d771ae0](https://github.com/GIScience/ors-map-client/commit/d771ae03c572493b82ca3072281405e28bcd43fb))
* Clean dependencies. ([364d400](https://github.com/GIScience/ors-map-client/commit/364d40000768a6b3ff513c1b798fbf6a5c2b2596))
* Delete and add index.html to gitignore. ([b5cfb9b](https://github.com/GIScience/ors-map-client/commit/b5cfb9b846a910e0b42038ac080491da2190b1de))
* Fix some typos ([bff27d1](https://github.com/GIScience/ors-map-client/commit/bff27d1b96f0370ef5f2b0c8d9c1c95bb06114e7))
* **pre-commit:** exclude CHANGELOG.md from prettier ([881cc02](https://github.com/GIScience/ors-map-client/commit/881cc0247f6a017b514cc75c8c87fe62a984e0bf))
* **pre-commit:** ignore autogenerated pnpm-lock.yaml ([0bc3530](https://github.com/GIScience/ors-map-client/commit/0bc353066e801095c401579f88d816dd417643f4))
* Remove leftover remnants from old test framework ([224e0a8](https://github.com/GIScience/ors-map-client/commit/224e0a860a8e033440da6993f6478617505d7b0b))
* Remove unused stats.json file ([8b74441](https://github.com/GIScience/ors-map-client/commit/8b74441bebb88d72c3affe51be3cbe36f3f21582))

## [1.29.0](https://github.com/GIScience/ors-map-client/compare/v1.28.2...v1.29.0) (2022-01-19)

### Features

- add surface_quality_known and allow_unsuitable parameters for wheelchair profile ([daa1799](https://github.com/GIScience/ors-map-client/commit/daa1799b3c34500b3631cb73dd10d7fce8b51c1c))
- **app-state.js:** update the html document lang when the app language is changed ([5fa4508](https://github.com/GIScience/ors-map-client/commit/5fa450884d71750b8c501780d3b1318d1e2c1440))

### Bug Fixes

- **download.spec.js:** replace findAll for find when accessing download-format element ([f437d18](https://github.com/GIScience/ors-map-client/commit/f437d18ead012abf4205a72f9e25bfb75714dcec))
- **maps.route.js:** avoid redirecting to next route if it is the same of the current one ([e0dbe76](https://github.com/GIScience/ors-map-client/commit/e0dbe761c81f21076feea247ade24410c7e3eccc))
- **mapviewmarker.vue:** fix styles ([8669e0c](https://github.com/GIScience/ors-map-client/commit/8669e0c9cf74fadbaf8c6bf560f0bdce6e9f2775))
- **mylocation.vue:** fix styles ([9582035](https://github.com/GIScience/ors-map-client/commit/9582035a5b744b5b9a867edda7e294858196a4fa))
- **ors-map-filters-example.js:** fix the roud_trip hidden property value ([0f2860e](https://github.com/GIScience/ors-map-client/commit/0f2860e1ef3b4f4a90c9e112346ae49a6493dc32))
- **place-input.js:** fix coordinates switch and related suggestions listing ([08d0d2a](https://github.com/GIScience/ors-map-client/commit/08d0d2a164ee0391504e11de46248d5178d1c0ae))
- **place-input.js:** fix switch coords and raw coords displaying ([902a4cd](https://github.com/GIScience/ors-map-client/commit/902a4cda0f09fb779c99d6ec7f4758541d745e35))
- **place-input.spec.js:** make place-input test compatible with last component fix ([f1cd7fb](https://github.com/GIScience/ors-map-client/commit/f1cd7fb9fcb1e72b26e7c144d835cfe8450ff679))
- **place.js:** build lng lat array always from lng and lat attributes ([20e3b2b](https://github.com/GIScience/ors-map-client/commit/20e3b2b79e7d1ca6ad3b77f36ae36d67ff18a4b9))
- **share.js:** remove copy-to-clipboard child element from share container instead of from body ([f540f24](https://github.com/GIScience/ors-map-client/commit/f540f2429fa9290a1061d9e4da34238b6bd00bdd))

### Others

- **test.yml:** switch to GIScience test action ([f961dd0](https://github.com/GIScience/ors-map-client/commit/f961dd0631cf9ff6833461f83b6ba016d55a241a))

### Docs

- **changelog.md:** fix typos in changelog.md ([470478e](https://github.com/GIScience/ors-map-client/commit/470478e994634066fe7ebf0d35db53581dd6f2c6))
- **download.spec.js:** add file type doc for each menu index clicked ([af50f09](https://github.com/GIScience/ors-map-client/commit/af50f0975eb01b6cbb7ace587bb95c8ac67f272c))
- **place.js:** add missing method documentation ([170049b](https://github.com/GIScience/ors-map-client/commit/170049be9609eb00bc4b65e98066c7f4908abd05))

### Code Refactoring

- add default lang attribute to html documents ([89606b9](https://github.com/GIScience/ors-map-client/commit/89606b9374c2f5e5e21768fb76f80391cb398910))
- **dependency-service.js:** remove unused parameters ([0ef4401](https://github.com/GIScience/ors-map-client/commit/0ef4401ec8a9ece4c79acc9813174f83636df82b))
- **download.spec.js:** remove commented line ([19c3a03](https://github.com/GIScience/ors-map-client/commit/19c3a030cef8ad887e8567867b909b6d353e5131))
- fix code smells ([6485f5e](https://github.com/GIScience/ors-map-client/commit/6485f5e00a6425a378292a8da6eeee9ebe6dcb7b))
- **form-fields.spec.js:** change the way the randon field is accessed and clicked on the test ([aeadef8](https://github.com/GIScience/ors-map-client/commit/aeadef8b867aa8d09a087f1f10f8a6da3a140b02))
- **form-fields.spec.js:** refactor form-fields test ([39486c7](https://github.com/GIScience/ors-map-client/commit/39486c7c00bb5fb53625aa6e682b77ba905ff8b7))
- **formfields.vue:** remove unused sub props modal logic and child dialog fields component ([36b36d9](https://github.com/GIScience/ors-map-client/commit/36b36d966419dac1561f4fe0c5b35309f3bcf030))
- **formfields.vue:** rename random input class to random-input ([971fcbf](https://github.com/GIScience/ors-map-client/commit/971fcbf08abd5f0a7905a3e2fc5c056b58b6fb81))
- **map-view.css:** remove duplicated style ([68bb3e5](https://github.com/GIScience/ors-map-client/commit/68bb3e57a5144dc22c565170dc3243f225c9501c))
- **ors-l-polyline.css:** remove overlapping style ([3876e14](https://github.com/GIScience/ors-map-client/commit/3876e145e66015e9afb1165080fb9e98509d3eee))
- **placeinput.vue:** add classes to some elements necessary to test running ([85665d6](https://github.com/GIScience/ors-map-client/commit/85665d6c0b5d3e04ff8e4465fc35644c6dc66ec4))
- **roudn-trip:** fix typo ([c886cc5](https://github.com/GIScience/ors-map-client/commit/c886cc56bb5b914f6f528fdf6188c7ba8f2ceb74))
- **share.spec.js:** refactor share test to avoid some intermitent failures ([a7f15eb](https://github.com/GIScience/ors-map-client/commit/a7f15eb253c4e15573ceb1ca543a566033554d30))
- **slidercombo.vue:** add css class to root element and remove unused watch parameter ([48ee0e2](https://github.com/GIScience/ors-map-client/commit/48ee0e2f0eb36a7c29c8688b9fe050dd9b05fff0))

### Tests

- **base-karma.conf.js:** disable captureConsole ([5dd55fa](https://github.com/GIScience/ors-map-client/commit/5dd55faf25c3e93de9dd61dec901a11b6a461dfa))
- **base-karma.conf.js:** set captureconsole to true ([d74cfcc](https://github.com/GIScience/ors-map-client/commit/d74cfccf9d10fb144a33853b104feaf27084c4b1))
- **download.spec.js:** increase pause for gpx donwload test ([594465e](https://github.com/GIScience/ors-map-client/commit/594465e5a0a6fbf0c12dc1b391eeee048b80ea1f))
- **form-fields.spec.js:** add formfields test ([e24caab](https://github.com/GIScience/ors-map-client/commit/e24caabef5c4d8c17ca136233198068fdf59f211))
- **form-fields:** fix generate random seed test ([6256c8e](https://github.com/GIScience/ors-map-client/commit/6256c8ec4bf417cd88e98e24d7464f55d8941a21))
- **main.spec.js:** add main.js test ([aec126c](https://github.com/GIScience/ors-map-client/commit/aec126c65473fe72c4fa777d2e2bac7c6d516062))
- **place-input.spec.js:** extend place-input test coverage ([f8c2cce](https://github.com/GIScience/ors-map-client/commit/f8c2cce8164c04bd0d38aebfe2c315f570776775))
- **reach.spec.js:** increase wait timeout for isochrones reandering test ([9edc071](https://github.com/GIScience/ors-map-client/commit/9edc071b5af375efa6f030cbddc5a0fa927c1f9e))

### [1.28.2](https://github.com/GIScience/ors-map-client/compare/v1.28.1...v1.28.2) (2022-01-03)

### Bug Fixes

- **box.js:** fix method typo ([8fb2a0c](https://github.com/GIScience/ors-map-client/commit/8fb2a0c84d3383ed079997fed381287574473710))

### Performance Improvements

- **share.spec.js:** remove inconsistent assert in share component ([604ec6d](https://github.com/GIScience/ors-map-client/commit/604ec6d6dcaca91abac775a1a842c103859ab89e))

### Code Refactoring

- **about.vue:** add class to about container ([d8f82d4](https://github.com/GIScience/ors-map-client/commit/d8f82d471a8df193f416dec7c3e26b07a738248e))
- **box.vue:** add custom classes to header corner buttons ([5682d5f](https://github.com/GIScience/ors-map-client/commit/5682d5ff5c22f2f8d6ba7ffd288cee9f6c0d3703))
- **download.js:** remove unused prop and duplicated format extension ([ab8f0b8](https://github.com/GIScience/ors-map-client/commit/ab8f0b8d113faab3a8a1cea613d430d1d14a1004))
- **download.vue:** add class to elements ([f24e8f0](https://github.com/GIScience/ors-map-client/commit/f24e8f0407b04f79fed56340e085636fd1476821))
- **download:** refactor download component adding css classes and emitting downloadclosed event ([581dec1](https://github.com/GIScience/ors-map-client/commit/581dec1bfc19e04642ae41838ec3d6332918d972))
- **share:** append copy-to-clipboard text area to component's root element ([4cbf7ee](https://github.com/GIScience/ors-map-client/commit/4cbf7eee98e655f85433845dc058558e611a3cd0))

### Others

- **.gitignore:** add e2e download folder to gitignore ([ae98757](https://github.com/GIScience/ors-map-client/commit/ae98757ee966e7db270e60ceb852511ed786b2cb))
- add gitkeep to downloads folder ([25c2df2](https://github.com/GIScience/ors-map-client/commit/25c2df2b7ed85a0742e6454cbd3b303135bb6f89))
- ignore files in downloads folder, but keep download folder ([600d564](https://github.com/GIScience/ors-map-client/commit/600d564c1087bb0e668f66af93b5ef65469b745e))

### Tests

- **about.spec.js:** add about test ([f74a30c](https://github.com/GIScience/ors-map-client/commit/f74a30c6b9db4ecb8418364c16fd98f0b49ef8d4))
- add e2e download test for all export formats ([631e57f](https://github.com/GIScience/ors-map-client/commit/631e57f916a748823d8de5da04dfb827487ae004))
- add integration test for download component ([61c70a2](https://github.com/GIScience/ors-map-client/commit/61c70a26d801844bafee068df2dedee16c6c327f))
- add not found test for non-existing route ([c29563d](https://github.com/GIScience/ors-map-client/commit/c29563de5b1aa26c1afc32655b2c7ba7194f4fd8))
- **app-render.spec.js:** replace promise resolving for await ([0d3ac5f](https://github.com/GIScience/ors-map-client/commit/0d3ac5f290b776cebed50dedd26fa7ed7340ace3))
- **base-karma.conf.js:** add the --disable-dev-shm-usage flag ([3444cab](https://github.com/GIScience/ors-map-client/commit/3444cab8f96dd6a3344c8f8d56a6b7a306f37256))
- **base-karma.conf.js:** increase karma timeouts ([6de7923](https://github.com/GIScience/ors-map-client/commit/6de7923739b9c456508aa631a694b42c1a9c62d2))
- **box.spec.js:** add unit test for box component ([c8eac13](https://github.com/GIScience/ors-map-client/commit/c8eac13a30e7e6e30f496575bef45bacd67fd7d6))
- create delete downloaded file command for nightwatch ([bab3b0b](https://github.com/GIScience/ors-map-client/commit/bab3b0b4e08e6d253d1dc0670601cf563502b5bd))
- **download.spec.js:** improve download tests ([4102f49](https://github.com/GIScience/ors-map-client/commit/4102f49c9fce695f1aff6ae84bcb81a0f15ed96a))
- **download.spec.js:** resize window before running download action ([0f25cbe](https://github.com/GIScience/ors-map-client/commit/0f25cbe4e6860f611479213beabc036d54c4f24a))
- **header.spec.js:** replace promises for await ([af9552b](https://github.com/GIScience/ors-map-client/commit/af9552be669ee297038fb4d3a7f46625a201c290))
- **nightwatch.conf.js:** add 10000 wait timeout ([91a8d13](https://github.com/GIScience/ors-map-client/commit/91a8d13d95a8a035e7e7c226dfeadba465c963f7))
- **nightwatch.conf.js:** add custom commands and default download folder ([6a6e604](https://github.com/GIScience/ors-map-client/commit/6a6e60479c3d207ea3409f4aa894e38007616c2b))
- **nightwatch.conf.js:** rename download folder to downloads ([bec4afb](https://github.com/GIScience/ors-map-client/commit/bec4afb720bbcc2c0110669c3c58f5f5fd722ce6))
- **nightwatch.conf.js:** use flag that tells browser to use temp files instead of shared memory ([8766964](https://github.com/GIScience/ors-map-client/commit/8766964691ed8a940918cf52356ecc99c6f1087f))
- remove download test files ([4890237](https://github.com/GIScience/ors-map-client/commit/489023729ca5d756884f89b6db7ffd7758a8bc2a))
- remove files from e2e download folder ([231728d](https://github.com/GIScience/ors-map-client/commit/231728daa80eb2a154b2affa5dddb5ef3716ccfb))
- rename download folder to downloads ([5af1c18](https://github.com/GIScience/ors-map-client/commit/5af1c1821206e221a910b5a9a7237aa16b70b7db))
- **search-place.spec.js:** add longer timeout for app-content visibility ([6da9888](https://github.com/GIScience/ors-map-client/commit/6da9888f8efe17400c9bf246be462077405b7efa))

### Docs

- **automated-test.md:** add missing packages in the automated test doc ([f90b83b](https://github.com/GIScience/ors-map-client/commit/f90b83b93daca81d4eb99ebb64177bbcd8bf0314))
- **learned-lessons.md:** document learned lessons ([6471d11](https://github.com/GIScience/ors-map-client/commit/6471d11830beda32e66b05ced9a98a28d0e77d34))
- **learned-lessons.md:** improve learned lessons doc ([bf432c6](https://github.com/GIScience/ors-map-client/commit/bf432c6eec5e5e252a3136c29cd3de125db14779))

### [1.28.1](https://github.com/GIScience/ors-map-client/compare/v1.28.0...v1.28.1) (2021-12-09)

### Bug Fixes

- **map-view.js:** save tile provider id when a new base layer is selected ([2405de5](https://github.com/GIScience/ors-map-client/commit/2405de5cdcff5c840ebd27c424ea0a6a42571292))

## [1.28.0](https://github.com/GIScience/ors-map-client/compare/v1.27.5...v1.28.0) (2021-12-09)

### Features

- add synchronization between map center/zoom and app url ([02949e1](https://github.com/GIScience/ors-map-client/commit/02949e1183214c33a1f5c116ece74b798b8fffe1))
- max zoom defined at tile layer provider level via app-config ([c3f5e4b](https://github.com/GIScience/ors-map-client/commit/c3f5e4bead90e11de112e0d38084fa11cd39fff7))

### Bug Fixes

- fix share embedded code url in url short mode ([d83456f](https://github.com/GIScience/ors-map-client/commit/d83456f5f51a272d1a3e2a2fb689a82954de040a))

### Tests

- improve route-importer test coverage ([bcba63c](https://github.com/GIScience/ors-map-client/commit/bcba63cf993a919160365b5fe77fdfa628cb4d41))
- **share.spec.js:** extend share component test ([8fbd0b3](https://github.com/GIScience/ors-map-client/commit/8fbd0b3ffeffbaafd91554c53ff4eafe4fd00eb5))

### Code Refactoring

- **map-definitions.js:** use default tiles provider from mapSettings ([817bd36](https://github.com/GIScience/ors-map-client/commit/817bd36ce9e720df0a415a1d9ef89be1918dc78f))
- **route-importer.js:** refactor file uploaded handling ([6154e03](https://github.com/GIScience/ors-map-client/commit/6154e0397a8fc1f4829aef7f3ccd52c801d42695))
- **route-importer.js:** remove unused code ([c0699b8](https://github.com/GIScience/ors-map-client/commit/c0699b8a6839572d5d728b371bd59c454239ec77))

### Docs

- add missing parameter type/description ([89c710a](https://github.com/GIScience/ors-map-client/commit/89c710abdcb3dd28a2e9bcda56c28facac538490))
- fix type typo ([61b5cd8](https://github.com/GIScience/ors-map-client/commit/61b5cd884fc5fc16185d4eda12cceabc6c4a5906))

### [1.27.5](https://github.com/GIScience/ors-map-client/compare/v1.27.4...v1.27.5) (2021-12-02)

### Tests

- **test.yml:** add bit.ly env secrets ([7e93653](https://github.com/GIScience/ors-map-client/commit/7e93653bb4c21c0e9054ede43361f4713dfba840))

### [1.27.4](https://github.com/GIScience/ors-map-client/compare/v1.27.3...v1.27.4) (2021-12-01)

### Build System

- use bit.ly credentials from env keys, if present ([5589dd0](https://github.com/GIScience/ors-map-client/commit/5589dd088b72444f00daaec033ba35ea942f9959))

### Tests

- increate wait for element timeout ([5f27627](https://github.com/GIScience/ors-map-client/commit/5f276273a27616b2a11769a2f3c559c691b81b42))

### [1.27.3](https://github.com/GIScience/ors-map-client/compare/v1.27.2...v1.27.3) (2021-12-01)

### Bug Fixes

- **ors-l-polyline.js:** fix the default opacity value ([086fdc1](https://github.com/GIScience/ors-map-client/commit/086fdc18314cb0d97f47a5bff1b845b8366e82bd))

### Others

- **webpack.base.conf.js:** add support for importing raw files like gpx, kml, txt and geojson ([be1384f](https://github.com/GIScience/ors-map-client/commit/be1384f3cbc1b4300396afdde9a659ed698682ac))

### Docs

- **app-hooks.js:** fix parameter type typo ([2bab02c](https://github.com/GIScience/ors-map-client/commit/2bab02c88b7c54505da2f3155a952041cdb58b56))

### Code Refactoring

- **date-picker.js:** remove unused oldval parameter in model watch function ([e422aab](https://github.com/GIScience/ors-map-client/commit/e422aabc26e3aec6c2c1753dba243dfffaf67746))
- **map-render.spec.js:** remove unused imports ([81c734b](https://github.com/GIScience/ors-map-client/commit/81c734b761d4bbbd0906434978e868f7e1a4a8af))
- pass share url as a prameter to share component ([caedb08](https://github.com/GIScience/ors-map-client/commit/caedb08444c67ee99089741891c45ffb51c322cd))
- **place-input.spec.js:** replace timeout for await ([1d09fc3](https://github.com/GIScience/ors-map-client/commit/1d09fc3ac956f6e1f101de5b210c6cdc55918e6e))
- **route-importer.js:** fix variable typo ([6d9c8d1](https://github.com/GIScience/ors-map-client/commit/6d9c8d1af8f552674ca639fadd91d3081fa02ffa))
- **routeimporter.vue:** add css class to elements ([efb0081](https://github.com/GIScience/ors-map-client/commit/efb008134701c8bb1fd7e999cc611086c4520418))

### Tests

- **route-importer.spec.js:** add test for route-importer component ([eb46748](https://github.com/GIScience/ors-map-client/commit/eb46748d5b1787937558a0b161b6fe96ed0813c6))
- **share.spec.js:** add test for share component ([aa004ce](https://github.com/GIScience/ors-map-client/commit/aa004ced7948d0470944a4da922d6d8141764c12))

### [1.27.2](https://github.com/GIScience/ors-map-client/compare/v1.27.1...v1.27.2) (2021-11-26)

### Bug Fixes

- **share.js:** update share url before displaying modal and sync share with route stop ([bfdf1f7](https://github.com/GIScience/ors-map-client/commit/bfdf1f737971cbb597ece90b8dcc4838652c6874)), closes [#245](https://github.com/GIScience/ors-map-client/issues/245)

### [1.27.1](https://github.com/GIScience/ors-map-client/compare/v1.27.0...v1.27.1) (2021-11-25)

### Bug Fixes

- update cyclosm tile url in config example ([693162e](https://github.com/GIScience/ors-map-client/commit/693162e2f316381cdcee016a23f58c729be4cc31))

### Code Refactoring

- remove unused pretty-code-viewer component ([2efaf0a](https://github.com/GIScience/ors-map-client/commit/2efaf0aa87d487ea0f7497c8c92869c34cf52bda))

### Others

- update npm packages ([20a3530](https://github.com/GIScience/ors-map-client/commit/20a35306ae504368c080e64da2a11da79b7271a5))

## [1.27.0](https://github.com/GIScience/ors-map-client/compare/v1.26.0...v1.27.0) (2021-11-22)

### Features

- **route-importer:** add support for importing .geojson files ([80922a1](https://github.com/GIScience/ors-map-client/commit/80922a152bcdad45611913af107eb8d342477c10)), closes [#243](https://github.com/GIScience/ors-map-client/issues/243)

### Bug Fixes

- fix the capitalization of the german word ([28efb62](https://github.com/GIScience/ors-map-client/commit/28efb62ca7a43279960c4fe8b6d36af480977e6e)), closes [#243](https://github.com/GIScience/ors-map-client/issues/243)

## [1.26.0](https://github.com/GIScience/ors-map-client/compare/v1.25.2...v1.26.0) (2021-11-22)

### Features

- add support for calculated min/max values and add calc parameters for isochrones interval ([af5dba3](https://github.com/GIScience/ors-map-client/commit/af5dba3609734acd2bd3a488efa734c1ec1cea8d))
- **main.js:** emit appLoaded event via eventbus once the app is loaded ([a0732be](https://github.com/GIScience/ors-map-client/commit/a0732bed1b54096fc6296be404c9b6722a9b4e3e))
- skip pushing a new route when the route is not valid ([b3221e4](https://github.com/GIScience/ors-map-client/commit/b3221e479996bd4423e6d99a9f1543865c873dff))

### Bug Fixes

- **app.js:** remove commit on created and run menu adjustment on appload event ([a66afb8](https://github.com/GIScience/ors-map-client/commit/a66afb8608c615770229383b0a6709520e1b0a6b))
- **main-menu.js:** run modifyMenu hook without loadapp wrapper ([9471cb2](https://github.com/GIScience/ors-map-client/commit/9471cb2199960b334ea3cc53584ef5bef7eda801))

### Others

- update chromedriver to 96.0.0 ([6a425b2](https://github.com/GIScience/ors-map-client/commit/6a425b2fd5b30b1f7696dc749e73166415c418d4))

### Tests

- **app-render.spec.js:** improve render tests by using await and reordering the event emit/on ([bba2b9d](https://github.com/GIScience/ors-map-client/commit/bba2b9ddb5f1414a58c3d2c3b99418fac744fb10))

### Code Refactoring

- **app-loader.js:** simplify, refactor and rename methods ([3cb6fd9](https://github.com/GIScience/ors-map-client/commit/3cb6fd98aef687f3efa4b5863372096bd165ac3f))

### Docs

- **plugin-example.js:** fix the reference to the getInstance method ([d5f2ef1](https://github.com/GIScience/ors-map-client/commit/d5f2ef1216703b0d267c511a5ebd0c9438f55e33))
- **readme.md:** fix the path to hooks-example.js file ([fab3f4b](https://github.com/GIScience/ors-map-client/commit/fab3f4b5881377bd36d1fe498b5f99c639d62d39))

### [1.25.2](https://github.com/GIScience/ors-map-client/compare/v1.25.1...v1.25.2) (2021-11-05)

### Code Refactoring

- add css class to route importer component ([872f1ce](https://github.com/GIScience/ors-map-client/commit/872f1cebd071149ad43d017de6021090082b9bfd))
- **header.vue:** remove unused button and add css class to toggle btn ([6900e61](https://github.com/GIScience/ors-map-client/commit/6900e617659f4d135e7f669fc3c3eb4882141142))

### Tests

- add tests for header and places-caroussel components and extend other tests ([42f75db](https://github.com/GIScience/ors-map-client/commit/42f75db7afe92ac4dc228e046cd3ba29cb4ccdab))
- adjust karma debug config for integration and unit tests ([fc8a2ea](https://github.com/GIScience/ors-map-client/commit/fc8a2ea13b4ac94b7af57c5621b404246f7e3af0))
- **base-karma.debug.conf.js:** fix base debug karma object return ([321be3d](https://github.com/GIScience/ors-map-client/commit/321be3d6327d6cb0a1b0ac4c8e3a12dd872595e5))
- rename, split and improve e2e tests ([bca9890](https://github.com/GIScience/ors-map-client/commit/bca9890fe13bbbd5f83e4880324f1cf046117caf))

### [1.25.1](https://github.com/GIScience/ors-map-client/compare/v1.25.0...v1.25.1) (2021-11-04)

### Docs

- **readme.md:** fix app-config path in docs and add extra details about deployment ([e83294f](https://github.com/GIScience/ors-map-client/commit/e83294f1d835eebaee1ee1a4b62d916a7c80c248))

### Code Refactoring

- **formactions.vue:** add class to each map-form-btn ([c3af03a](https://github.com/GIScience/ors-map-client/commit/c3af03af9a40c3060b6ab77eb0cf27e80ed07e7c))
- **mapform.vue:** add class to tab content containers ([0c9116b](https://github.com/GIScience/ors-map-client/commit/0c9116b14d0bfcad55835d4bdf4a62539befde9e))

### Tests

- **app-render.js:** add test for reach endpoint and directions for round trip ([1c6340d](https://github.com/GIScience/ors-map-client/commit/1c6340dd5d37a34e578d616ca752f1d1b85108ff))

## [1.25.0](https://github.com/GIScience/ors-map-client/compare/v1.24.0...v1.25.0) (2021-11-04)

### Features

- add the meta image to assets ([d0fd68e](https://github.com/GIScience/ors-map-client/commit/d0fd68e3bf155172e2d300c264ac4e5caad762cd))
- **dev.html:** add image and og meta to root dev/index html file ([52e886d](https://github.com/GIScience/ors-map-client/commit/52e886d0402887f4168ceec291c6985793db4b51))

### Docs

- **readme.md:** update the deployment flow and branch policy ([73c7b98](https://github.com/GIScience/ors-map-client/commit/73c7b988ef1af81de38893f1ec01e721a97b6520))

## [1.24.0](https://github.com/GIScience/ors-map-client/compare/v1.23.1...v1.24.0) (2021-11-03)

### Features

- **altitudepreview.vue:** add a class to the expand button ([df417de](https://github.com/GIScience/ors-map-client/commit/df417dee39975af91481178a9327eced8a708803))

### Bug Fixes

- **map-left-click:** fix the displaying of out of range coordinates ([8bb87a6](https://github.com/GIScience/ors-map-client/commit/8bb87a6fe3db87f98848c6791255a303b9ecd319))

### Code Refactoring

- use dash-case for naming spect files ([053fce4](https://github.com/GIScience/ors-map-client/commit/053fce4ea8df0423bddfcd9d1f9a2e9ea60e655e))

### Tests

- add altitude graph and place info displaying e2e tests ([59da1c1](https://github.com/GIScience/ors-map-client/commit/59da1c1d10549273818bf93e0ae5b3419cb59d3f))
- add geo-utils unit tests ([c4ce8e8](https://github.com/GIScience/ors-map-client/commit/c4ce8e836eedf9e0f62b76b419fb4052af7b6346))
- generate test coverage report only on full test run but allow run tests by type ([df02b90](https://github.com/GIScience/ors-map-client/commit/df02b90c70879ec9e987ee81f46328fdfc4958eb)), closes [#242](https://github.com/GIScience/ors-map-client/issues/242)

### [1.23.1](https://github.com/GIScience/ors-map-client/compare/v1.23.0...v1.23.1) (2021-11-02)

### Tests

- disable check for marker div in isochrones rendering ([d84e75a](https://github.com/GIScience/ors-map-client/commit/d84e75abeefaf1ed873e8ca7998e0309dbc986ab))
- enable marker check in isochrones rendering ([f24d967](https://github.com/GIScience/ors-map-client/commit/f24d967e437ce9a8e8ec5305c58a6780fb1d5bf5))
- **nightwatch.conf.js:** disable browser flag disable-web-security ([5ac612f](https://github.com/GIScience/ors-map-client/commit/5ac612f789f04b4e096701ccd7e9d147a703dbbb))

## [1.23.0](https://github.com/GIScience/ors-map-client/compare/v1.22.1...v1.23.0) (2021-11-02)

### Features

- add support for page not found mode when URL is malformed ([7e8febf](https://github.com/GIScience/ors-map-client/commit/7e8febf7810de4ca17431e9909b9fa2f78404b56))

### Code Refactoring

- move the maps modal css classes to box element ([14f6ffd](https://github.com/GIScience/ors-map-client/commit/14f6ffdeaeb10da4f31218f61dd1aa0f7572a49d))

### Tests

- **app-render.js:** add app render/loading tests for all pages/entry points ([252828e](https://github.com/GIScience/ors-map-client/commit/252828e7903821111bc20dc0fe5ae8072fe53298))
- set up custom asserts ([63547a9](https://github.com/GIScience/ors-map-client/commit/63547a9f73a47d0f20e6d5e1e010728e4ff1db73))

### [1.22.1](https://github.com/GIScience/ors-map-client/compare/v1.22.0...v1.22.1) (2021-10-27)

### Tests

- reorganize the tests commands and update the automated-test documentation ([db6d21e](https://github.com/GIScience/ors-map-client/commit/db6d21e32492986bbb0520dc5ed27a30d3385ad6))
- test embed mode only in e2e test ([2d5d98b](https://github.com/GIScience/ors-map-client/commit/2d5d98b97ac717ea11b25180c8f415e2cce5ec3b))

## [1.22.0](https://github.com/GIScience/ors-map-client/compare/v1.21.5...v1.22.0) (2021-10-27)

### Features

- **footer.vue:** add the privacy policy and terms of service links in sidebar footer ([84baea7](https://github.com/GIScience/ors-map-client/commit/84baea77f6f27eb6aa8bb0f8b782af113a8fabe4)), closes [#237](https://github.com/GIScience/ors-map-client/issues/237)

### Bug Fixes

- fix privacy policy and term of service links in about page ([f05da0d](https://github.com/GIScience/ors-map-client/commit/f05da0dfa71b5e5c707795e5de6f4a8295a13ccd)), closes [#237](https://github.com/GIScience/ors-map-client/issues/237)
- show isochrone population in the sidebar and hide population label when showing place polygon ([9bdaae2](https://github.com/GIScience/ors-map-client/commit/9bdaae21d9cfbe616f712a65b3b320435b46ead7)), closes [#238](https://github.com/GIScience/ors-map-client/issues/238)

### Docs

- **readme.md:** update the tests location in tests section ([c6b21ec](https://github.com/GIScience/ors-map-client/commit/c6b21ec7eba0616d0377be298cb274350a4aa2d2))

### Tests

- disable e2e test build progress output ([9fa9049](https://github.com/GIScience/ors-map-client/commit/9fa904905bd9e9e6003cfe613d1118d2bf413412))
- include e2e in global test script command ([dfd59ff](https://github.com/GIScience/ors-map-client/commit/dfd59ffadc5a7d390edd4ff20f102370cd25139f))
- **karma.conf.js:** fix the karma config coverage preprocessor path ([4094f0e](https://github.com/GIScience/ors-map-client/commit/4094f0eb2d9b1f29feb7e58aae269e08dd922f09))
- make e2e test runner to wait for the compiler/bundle to be ready ([4a8a6b0](https://github.com/GIScience/ors-map-client/commit/4a8a6b04cf2f96a4badaa4a4bba427e2132773bf))
- **nightwatch.conf.js:** update the test folders to tests and the Chrome browser options ([d70fadc](https://github.com/GIScience/ors-map-client/commit/d70fadc1dd901a1c72607b73ee1c211db0ef2965))
- remove unused jest config file ([61252c7](https://github.com/GIScience/ors-map-client/commit/61252c7cafbcd829e6d361f4ab65a1735fd3862a))
- update the chromedriver version to 94 ([0f5b5ba](https://github.com/GIScience/ors-map-client/commit/0f5b5ba182972f5f6373785367be6f98cdb7d17d))

### Code Refactoring

- **app-config-example.js:** disable eslint no-undef in config file to avoid require error ([b85d43e](https://github.com/GIScience/ors-map-client/commit/b85d43e873121b029deb15db1982d74566d36701))

### [1.21.5](https://github.com/GIScience/ors-map-client/compare/v1.21.4...v1.21.5) (2021-10-25)

### CI

- **test.yml:** change CI test title to Run-tests ([b371eec](https://github.com/GIScience/ors-map-client/commit/b371eec0fd8067404418b200ec5a1ff4747ad7fa))

### Tests

- await for app view/data load before proceeding with the test ([a15b1c8](https://github.com/GIScience/ors-map-client/commit/a15b1c8a6256f39f09dc257fe159ea7b261773db))
- increate timeout for embed mode rendering check ([727a0ea](https://github.com/GIScience/ors-map-client/commit/727a0ea608fca02c57d3fd3125f35caa84b63c75))
- rename some tests ([2262ef2](https://github.com/GIScience/ors-map-client/commit/2262ef28c034198f548072ccf5ebb479d32a4005))

### Docs

- **readme.md:** add GitHub test action badge ([1e736e6](https://github.com/GIScience/ors-map-client/commit/1e736e6936a9555be15f4e4a7e9685c1162ce5ba))
- **readme.md:** fix readme test badge link ([18b4df3](https://github.com/GIScience/ors-map-client/commit/18b4df3a3b829bcccf5915fd4daf0891c746edda))

### [1.21.4](https://github.com/GIScience/ors-map-client/compare/v1.21.3...v1.21.4) (2021-10-22)

### Others

- remove unused testing-related packages ([2efdbf1](https://github.com/GIScience/ors-map-client/commit/2efdbf15a319f39e0003d36added2c4c894c474b))

### Docs

- **automated-test.md:** improve automated test docs ([9fc8483](https://github.com/GIScience/ors-map-client/commit/9fc8483d27eb2e8eafc5965af868df9134ae4646))

### [1.21.3](https://github.com/GIScience/ors-map-client/compare/v1.21.2...v1.21.3) (2021-10-22)

### Performance Improvements

- use single karma configuration for unit and integration tests ([5a992c6](https://github.com/GIScience/ors-map-client/commit/5a992c61512820d0c8a10762819b1af6734a9a97))

### Tests

- add place-input test ([0be80a6](https://github.com/GIScience/ors-map-client/commit/0be80a64864c786d5fba628e1a9be8f19c9f77bc))
- add support for vue server render testing ([357495c](https://github.com/GIScience/ors-map-client/commit/357495cca2bdb43cc456034995b5b295b6a81883))
- add test for place input ([32781e0](https://github.com/GIScience/ors-map-client/commit/32781e0a340b0bbcfdd0bedf409d0154b849cc34))
- add unit test infrastructure with vue-test-utils ([a3cf6eb](https://github.com/GIScience/ors-map-client/commit/a3cf6eb3c486089977398822bb8786d51fb4ce50))

### Others

- remove test coverage results from repository ([8c806d5](https://github.com/GIScience/ors-map-client/commit/8c806d5a6b6ad5060adbb66dd72d4f8d1f8377f4))

### [1.21.2](https://github.com/GIScience/ors-map-client/compare/v1.21.1...v1.21.2) (2021-10-15)

### Tests

- adjust app embed render spec ([7f7f3a8](https://github.com/GIScience/ors-map-client/commit/7f7f3a8a8e13ebd7ec3561f0f0186f58bc4e0f5a))

### [1.21.1](https://github.com/GIScience/ors-map-client/compare/v1.21.0...v1.21.1) (2021-10-15)

### Bug Fixes

- **app-loader.js:** fix embed mode check ([48a6207](https://github.com/GIScience/ors-map-client/commit/48a6207ffc0fb3f01e7ae094b914ec2d03729f40))

### Tests

- **test.yml:** update GitHub action test version ([fb7402f](https://github.com/GIScience/ors-map-client/commit/fb7402fd265bfd79815db56433396bdab9b7246c))
- update test specs ([57f947f](https://github.com/GIScience/ors-map-client/commit/57f947f66526ff067e0dc8576de11c196fcaa7f2))

### Docs

- include docs about automated tests ([371fc5e](https://github.com/GIScience/ors-map-client/commit/371fc5e4b53ac8e55c4458c27d0f31a7b9b13a7f))

## [1.21.0](https://github.com/GIScience/ors-map-client/compare/v1.20.5...v1.21.0) (2021-10-14)

### Features

- **app-loader.js:** use env ors key if app config has an invalid key ([ebe343e](https://github.com/GIScience/ors-map-client/commit/ebe343ede10792ef78bd3e5ab667d1b9e02eb1ce))

### Tests

- add ORSKEY to process.env variables ([a0c3bd5](https://github.com/GIScience/ors-map-client/commit/a0c3bd5122ab681fd26dde4275792ac15c8b06b8))
- use chromeheadless in karma test ([3b742e2](https://github.com/GIScience/ors-map-client/commit/3b742e2ea879cc79f364d6e464dd5ece2126970b))
- use custom chrome launcher in karma test ([6418c82](https://github.com/GIScience/ors-map-client/commit/6418c8291d0add4728d4a85348109607def09559))

### Others

- add ORSKEY to webpack en variables ([76bc94a](https://github.com/GIScience/ors-map-client/commit/76bc94a40d5d12d5b3d460ae6568254c5ce77f9c))

### CI

- **test.yml:** add GitHub workflow for testing ([09f52dd](https://github.com/GIScience/ors-map-client/commit/09f52ddf5320a411a9580b76c8446b6bf9221058))

### [1.20.5](https://github.com/GIScience/ors-map-client/compare/v1.20.4...v1.20.5) (2021-10-14)

### Others

- **gitignore:** ignore selenium-server.log ([5798fad](https://github.com/GIScience/ors-map-client/commit/5798fad501afc2bdc8489eaadf0fe3278bd0b13e))

### Tests

- switch back to chrome headless in karma tests ([9b57c08](https://github.com/GIScience/ors-map-client/commit/9b57c089a85988b4511a547daac676234b082437))
- use ChromeHeadless in karma tests ([2d5f16f](https://github.com/GIScience/ors-map-client/commit/2d5f16f8c1a1d697a989074538b40fb4fcfaca3c))

### [1.20.4](https://github.com/GIScience/ors-map-client/compare/v1.20.3...v1.20.4) (2021-10-14)

### [1.20.3](https://github.com/GIScience/ors-map-client/compare/v1.20.2...v1.20.3) (2021-10-12)

### Tests

- remove key output in test ([baa87ad](https://github.com/GIScience/ors-map-client/commit/baa87ad951290cd2f14df9fa5d32bb1b3a1a2f1b))

### [1.20.2](https://github.com/GIScience/ors-map-client/compare/v1.20.1...v1.20.2) (2021-10-12)

### Others

- **github-actions-test.yml:** adjust github action ([ddd1aa3](https://github.com/GIScience/ors-map-client/commit/ddd1aa3a2641f7296d8eb9e6c00d10d8077474a0))

### [1.20.1](https://github.com/GIScience/ors-map-client/compare/v1.20.0...v1.20.1) (2021-10-12)

### Tests

- renamed unit to integration test ([d978fc5](https://github.com/GIScience/ors-map-client/commit/d978fc508d9478cf334796ecf569666d49ca0c42))

## [1.20.0](https://github.com/GIScience/ors-map-client/compare/v1.19.0...v1.20.0) (2021-10-11)

### Features

- basic e2e setup ([cb6019f](https://github.com/GIScience/ors-map-client/commit/cb6019f9b0f8128dfc62516a826216f29daa3f27))

### Tests

- add app, map-view and ors-api tests ([cf4beff](https://github.com/GIScience/ors-map-client/commit/cf4beff6a746744844966e4ba501d4d85fc298cd))
- add basic unit test ([aeeb0dd](https://github.com/GIScience/ors-map-client/commit/aeeb0dd5a8e7f2e234e2d383678d3236f3212df4))
- add isochrone build map data and improve other tests ([5e9c5a2](https://github.com/GIScience/ors-map-client/commit/5e9c5a2eb4167f8bf9f77f3059cfd43235291dbc))
- add karma-jasmin-webpack test infrastructure ([f6668ca](https://github.com/GIScience/ors-map-client/commit/f6668ca43cf6855aaeede39282725e42a8b66220))
- define basic tests ([64a0ad2](https://github.com/GIScience/ors-map-client/commit/64a0ad2f0479e4083d56e4032b5845dfed292f15))
- new unit tests configuration using FirefoxHeadless ([d46262e](https://github.com/GIScience/ors-map-client/commit/d46262ee0ac11c57deb8c076f318055006c8216d))

### Docs

- **map-view-data-builder.js:** fix documentation spelling ([a3616a2](https://github.com/GIScience/ors-map-client/commit/a3616a23a2f551541d48053bbf24a2dbfb52d573))

### Styling

- **ors-menu.js:** fix identation ([0ac8b0a](https://github.com/GIScience/ors-map-client/commit/0ac8b0a63bae2f4c1f66abc062379e7146055569))

### Others

- config karma debug tests to show all erros ([6b11d76](https://github.com/GIScience/ors-map-client/commit/6b11d760db2ac86d95630c3256fcd70103c550b2))
- remove test and coverage files ([d959816](https://github.com/GIScience/ors-map-client/commit/d959816dbbb37a0f6b608f56d1d63a18b41dcd17))
- remove unused packages and rename test command ([111843b](https://github.com/GIScience/ors-map-client/commit/111843b64ac6eb6d38ce9b4b5ea4d034e8e4e070))

### Code Refactoring

- **app-loader.js:** refactor method names ([8046929](https://github.com/GIScience/ors-map-client/commit/804692926089994d53a1bef36ded790956613daf))
- change the dialogs attach target element to body ([44e2c9c](https://github.com/GIScience/ors-map-client/commit/44e2c9c8dd218a7c130b1f1a7754e9d47ca003ac))
- **place-input:** add class name for place suggestion element ([0cd3d00](https://github.com/GIScience/ors-map-client/commit/0cd3d008065ac879fc4ab751794ee0900a86a49c))
- **profile-selector.js:** remove unused parameters in watchers ([4dc70c3](https://github.com/GIScience/ors-map-client/commit/4dc70c3cd2cb27c48d8be29759567ee0a55fcf4c))

## [1.19.0](https://github.com/GIScience/ors-map-client/compare/v1.18.0...v1.19.0) (2021-10-04)

### Features

- increase hgv dimentions filter values and help message ([16fc741](https://github.com/GIScience/ors-map-client/commit/16fc741804d46d07974db0609a16a8d9dbda3207))

### Bug Fixes

- **admin-area-loader.js:** make the admin loader compatible with ors-nominatim data structure ([ffd09a6](https://github.com/GIScience/ors-map-client/commit/ffd09a6ae790786117b011c6fea1dacd6fdf8269))

## [1.18.0](https://github.com/GIScience/ors-map-client/compare/v1.17.1...v1.18.0) (2021-10-01)

### Features

- place search and results displaying improved ([d9e7d55](https://github.com/GIScience/ors-map-client/commit/d9e7d550bda033636c2b1d21bed8b757dcb1f321))
- use separated county search in place search ([fd5f3e9](https://github.com/GIScience/ors-map-client/commit/fd5f3e9f3fbe70bc71853f1f9d7a7a2b68e5d5c2))

### Bug Fixes

- **place-input:** fix switching raw coordinates ([fe88dce](https://github.com/GIScience/ors-map-client/commit/fe88dcebf9fab6dbc172eb6dc80092fc9d6a0ab0)), closes [#171](https://github.com/GIScience/ors-map-client/issues/171)

### Code Refactoring

- remove unused code ([68641d0](https://github.com/GIScience/ors-map-client/commit/68641d04d17f2070521d6bdbb4f019c0708d4b11))
- remove unused code in main.js ([ed830fd](https://github.com/GIScience/ors-map-client/commit/ed830fd77e7e6499f54b17d46ed892369c64708b))

### [1.17.1](https://github.com/GIScience/ors-map-client/compare/v1.17.0...v1.17.1) (2021-09-16)

### Bug Fixes

- **maps.js:** fix app loading using /reach url ([ae39c88](https://github.com/GIScience/ors-map-client/commit/ae39c883c8550819d1bc3ceb7382981b7ede3b76))

## [1.17.0](https://github.com/GIScience/ors-map-client/compare/v1.16.0...v1.17.0) (2021-08-31)

### Features

- **default-map-settings:** define alwaysFitBounds map setting default as false ([935e101](https://github.com/GIScience/ors-map-client/commit/935e101199beda1bc0bbdccdb8e8c350e3d90c7d))

### Bug Fixes

- **floatingmenu:** fix menu item target parameter ([f25cedc](https://github.com/GIScience/ors-map-client/commit/f25cedc115eee318d808a8ae91c06a34c9064ff5))

### Styling

- **ors-menu:** adjust code identation ([15735c3](https://github.com/GIScience/ors-map-client/commit/15735c30c920db5f4610dee2a236b1b000dca356))

### Build System

- **package-lock.json:** update some dependencies ([3422fbe](https://github.com/GIScience/ors-map-client/commit/3422fbe7f6a575672808640728ed773454a5f06a))

### Code Refactoring

- **print.js:** remove console.log and adjust quote formatting ([2bb4652](https://github.com/GIScience/ors-map-client/commit/2bb46529e4197c894611b039719e817ddf2fb7c3))
- decouple the app loading from the app main ([ffe14b9](https://github.com/GIScience/ors-map-client/commit/ffe14b9b78b49f33a556f4b140bd51e753c0554d))
- migrate getInstance method from main to AppLoader class ([29d29db](https://github.com/GIScience/ors-map-client/commit/29d29db4f01071c64734508eb0ac7f9c51eba406))

## [1.16.0](https://github.com/GIScience/ors-map-client/compare/v1.15.1...v1.16.0) (2021-08-04)

### Features

- **place-input:** hide new info badge and tooltip when simple place input is focused ([01e9923](https://github.com/GIScience/ors-map-client/commit/01e9923ea3c05487e4ce649e01198136f18a38de))

### [1.15.1](https://github.com/GIScience/ors-map-client/compare/v1.15.0...v1.15.1) (2021-08-04)

### Bug Fixes

- **map-left-click:** do not show info for place when sidebar is open and map view is clicked ([318c2f9](https://github.com/GIScience/ors-map-client/commit/318c2f9169ead99b4dd0faff8067d6d71443ea5f))

## [1.15.0](https://github.com/GIScience/ors-map-client/compare/v1.14.1...v1.15.0) (2021-08-04)

### Features

- do not show sidebar automatically in mobile if directions started via a pointerTriggeredAction ([751805c](https://github.com/GIScience/ors-map-client/commit/751805c25305a7132817ef9eb994ab0f95058841))

### [1.14.1](https://github.com/GIScience/ors-map-client/compare/v1.14.0...v1.14.1) (2021-08-04)

### Bug Fixes

- hide place info box when no place is selected ([18096c2](https://github.com/GIScience/ors-map-client/commit/18096c2470279b28cf9fe3796fd63c7d577ceefc))

## [1.14.0](https://github.com/GIScience/ors-map-client/compare/v1.13.2...v1.14.0) (2021-08-04)

### Features

- improve controls visibility when sidebar is open ([af4dfbd](https://github.com/GIScience/ors-map-client/commit/af4dfbdf1bd4d7339dd9b7e3849ddb844a7782a3))

### Bug Fixes

- **map-form-mixin:** sidebar open state consider the app and embed mode ([1550460](https://github.com/GIScience/ors-map-client/commit/1550460214ed3900c7d311ba34ba7c6d89243fdd))

### [1.13.2](https://github.com/GIScience/ors-map-client/compare/v1.13.1...v1.13.2) (2021-08-03)

### Bug Fixes

- **floatingmenu:** size and layout ([44cbf98](https://github.com/GIScience/ors-map-client/commit/44cbf986ca720d98aaeb0da42b9e57c4f6a11b96))

### [1.13.1](https://github.com/GIScience/ors-map-client/compare/v1.13.0...v1.13.1) (2021-08-03)

### Bug Fixes

- **places-and-directions:** route limits error message ([c014481](https://github.com/GIScience/ors-map-client/commit/c014481216d1c0c010bad5658668e4eff056e3ab))

## [1.13.0](https://github.com/GIScience/ors-map-client/compare/v1.12.0...v1.13.0) (2021-08-03)

### Features

- map floating btns boxing and shadow ([840b132](https://github.com/GIScience/ors-map-client/commit/840b132639a33ccdc98b9e55fcc7d8f47b0119e8))

## [1.12.0](https://github.com/GIScience/ors-map-client/compare/v1.11.0...v1.12.0) (2021-08-03)

### Features

- adjust map floating btns style ([3951153](https://github.com/GIScience/ors-map-client/commit/3951153b46a1da96efb90083e37f550ddc04169c))

### Bug Fixes

- **settings.i18n.de-de.js:** wrong Italian translation in German ([7378c79](https://github.com/GIScience/ors-map-client/commit/7378c797f522c4834d4897d54358e120ced284b8)), closes [#165](https://github.com/GIScience/ors-map-client/issues/165)

## [1.11.0](https://github.com/GIScience/ors-map-client/compare/v1.10.0...v1.11.0) (2021-08-02)

### Features

- **about.vue:** create the aboutContentDefined hook ([424504f](https://github.com/GIScience/ors-map-client/commit/424504f2a94cd7d8f6a7daccb1d647505cc9bfb7))

### Code Refactoring

- **box.js:** remove unused parameter and changed variable name ([bf624f4](https://github.com/GIScience/ors-map-client/commit/bf624f48720cef61133341f2cfa6a79562050c70))

## [1.10.0](https://github.com/GIScience/ors-map-client/compare/v1.9.1...v1.10.0) (2021-08-02)

### Features

- **floating-menu:** add floatingMenuItemsDefined hook ([215f008](https://github.com/GIScience/ors-map-client/commit/215f008c8bbf86e60f9aefda1af629b6986db05d))

### [1.9.1](https://github.com/GIScience/ors-map-client/compare/v1.9.0...v1.9.1) (2021-08-02)

### Bug Fixes

- **places-and-directions.js:** direct flag of last place set to false after place removal ([21867d4](https://github.com/GIScience/ors-map-client/commit/21867d4b9b02290d1a976ccaf75f829e77867745))

## [1.9.0](https://github.com/GIScience/ors-map-client/compare/v1.8.0...v1.9.0) (2021-08-02)

### Features

- improve place suggestion UI ([5e8ed57](https://github.com/GIScience/ors-map-client/commit/5e8ed57ea0ff538008142283b08b1a08e7b39f5b))
- **map-view-leaflet.css:** do not increase layer control size when in touch mode ([557c64f](https://github.com/GIScience/ors-map-client/commit/557c64f23713244e1396e7d91b90693c92c20e50))
- **map-view.css:** square the accessibility-btn ([0186124](https://github.com/GIScience/ors-map-client/commit/018612418b8146414d3aff67025e4a32c67b4cae))
- **ors-l-polyline:** do not show route popup on new route when in low resolution or mobile devices ([9374d22](https://github.com/GIScience/ors-map-client/commit/9374d2252f17d4c96017050134f11cad9dd4b2d4))
- show new info badge instead of opening sidebar automatically when in low resolution ([ff0049e](https://github.com/GIScience/ors-map-client/commit/ff0049ebdf2ca29e9b8447e39319272212f40f9a))

## [1.8.0](https://github.com/GIScience/ors-map-client/compare/v1.7.1...v1.8.0) (2021-07-29)

### Features

- sidebar overflow and my-location btn visibility when height graph is open ([c1b64fc](https://github.com/GIScience/ors-map-client/commit/c1b64fc46e929cac699b6897162c8e17208bea73))

### [1.7.1](https://github.com/GIScience/ors-map-client/compare/v1.7.0...v1.7.1) (2021-07-29)

### Bug Fixes

- **map-view.js:** disable gestureHandling based on embed mode ([c47ba76](https://github.com/GIScience/ors-map-client/commit/c47ba767ee4a5809ecd395dc5c0542e60f487302))

## [1.7.0](https://github.com/GIScience/ors-map-client/compare/v1.6.1...v1.7.0) (2021-07-29)

### Features

- **hooks-example.js:** remove hook priority from appLoaded example ([a6622eb](https://github.com/GIScience/ors-map-client/commit/a6622eb3555f3bbbda272b64b50dbad9e6aa128a))
- improve map dynamic controls visibility ([8c2a857](https://github.com/GIScience/ors-map-client/commit/8c2a85767bee55d7c1556705b1d3040157659ecf))

### Bug Fixes

- disable swipe for tabs and sidebar ([6be0dad](https://github.com/GIScience/ors-map-client/commit/6be0dad0418431e85fb5d368af254dcb8a4e02c9))

### [1.6.1](https://github.com/GIScience/ors-map-client/compare/v1.6.0...v1.6.1) (2021-07-28)

### Bug Fixes

- **map-view:** uI elements z-index and positioning ([6ea7bca](https://github.com/GIScience/ors-map-client/commit/6ea7bcacdcd29834d117a4bb09e80ada7ee7c0cb))
- **sidebar:** use stateless naviagation drawer ([8125c9e](https://github.com/GIScience/ors-map-client/commit/8125c9e87d80c7d772b639fbffbae7c684283a57))
- improve right/letf map click handling ([609ad07](https://github.com/GIScience/ors-map-client/commit/609ad078b2e3237c12b12af991601f1417e2284d))
- moving marker on mobile with touch event ([d7bb23a](https://github.com/GIScience/ors-map-client/commit/d7bb23a56a8afd593fa1e837a41a64c67a060bf2))

## [1.6.0](https://github.com/GIScience/ors-map-client/compare/v1.5.1...v1.6.0) (2021-07-27)

### Features

- support for promise in directions and isochrone args hooks ([529e114](https://github.com/GIScience/ors-map-client/commit/529e1147e7f9a1e59249bd2157d85d2dd834ee6e))

### Code Refactoring

- **map-view.js:** remove unused reject ([6b362bb](https://github.com/GIScience/ors-map-client/commit/6b362bbdcc4df7b81381527f5b5fbb41bdc8f044))

### [1.5.1](https://github.com/GIScience/ors-map-client/compare/v1.5.0...v1.5.1) (2021-07-22)

### Bug Fixes

- **maps.route.js:** use max place inputs allowed declared on app-config.js ([d934e2b](https://github.com/GIScience/ors-map-client/commit/d934e2b370afc132056c4790edf75404b88b0d7d)), closes [#163](https://github.com/GIScience/ors-map-client/issues/163)

## [1.5.0](https://github.com/GIScience/ors-map-client/compare/v1.4.1...v1.5.0) (2021-07-20)

### Features

- **mapview.vue:** add opacity option for WMS tile layer ([bdf522f](https://github.com/GIScience/ors-map-client/commit/bdf522fcc10a0ba813f494acd20ce9817dccc901))

### [1.4.1](https://github.com/GIScience/ors-map-client/compare/v1.4.0...v1.4.1) (2021-07-20)

### Bug Fixes

- **app-hooks.js:** pass the arg throught multiple calls in runPluginHook ([af08fea](https://github.com/GIScience/ors-map-client/commit/af08feab0d9708c314193270458be944729cf2ba))
- **maps.css:** refresh button width set to min-width ([0b41af2](https://github.com/GIScience/ors-map-client/commit/0b41af2500e477c00043b54a907c8442f06d91da))
- **maps.vue:** activePlaceIndex name corrected ([4ab0ba3](https://github.com/GIScience/ors-map-client/commit/4ab0ba3972f93a8847011161a5401137a300292f))

### Others

- remove not used marker images ([c28e3a6](https://github.com/GIScience/ors-map-client/commit/c28e3a6f36a9636c01f067920305c72be55268dd))

### Code Refactoring

- **geo-utils.js:** change variable and method names ([883e66c](https://github.com/GIScience/ors-map-client/commit/883e66c89ca01bfee2000bd21034494e3f8d736e))
- **map-view.js:** simplified loadMapData and outsourced the focus place task ([f639ea8](https://github.com/GIScience/ors-map-client/commit/f639ea883ad4ef8c64d27540f31425e204617449))

## [1.4.0](https://github.com/GIScience/ors-map-client/compare/v1.3.0...v1.4.0) (2021-07-19)

### Features

- add layerProvidersLoaded hook ([2a4284e](https://github.com/GIScience/ors-map-client/commit/2a4284e545d943bcb3ad9a97df704e570c77da42))
- add support for WMS overlayer ([b759a38](https://github.com/GIScience/ors-map-client/commit/b759a38f18e7266a62c625b92fad56ba6b502d1a))

## [1.3.0](https://github.com/GIScience/ors-map-client/compare/v1.2.0...v1.3.0) (2021-07-19)

### Features

- **plugins:** simplify plugins load via hooks ([52d684f](https://github.com/GIScience/ors-map-client/commit/52d684f6a77b657c8b03174bfe6fbe72afe68ddf))

### Bug Fixes

- **admin area loader:** fix the admin area loader feature ([d140ab6](https://github.com/GIScience/ors-map-client/commit/d140ab6be9d1514bf851b14c464ad5820c026dd5))

### Code Refactoring

- **app-hooks.js:** fix spelling of priority parameter ([736adf1](https://github.com/GIScience/ors-map-client/commit/736adf18101b671351d3e4d649865f18e2381cdc))
- **map-view.js:** improve code and outsource tasks ([60829c4](https://github.com/GIScience/ors-map-client/commit/60829c4d9e1759beca2dba1350c1f8654bae1c0c))
- **maps.js:** fix spelling of property ([32ea7c4](https://github.com/GIScience/ors-map-client/commit/32ea7c4e8e04dcc5f81a103a788d96da6715a471))

### Docs

- **hooks-example.js:** fix spelling on hooks example docs ([c8abfcf](https://github.com/GIScience/ors-map-client/commit/c8abfcf087f6e4ee48e71cd9bbdc9ac71be081dd))
- **readme:** updated contribute section ([75f99e3](https://github.com/GIScience/ors-map-client/commit/75f99e3eab61956d077321565acf2e1607a1d71b))
- **readme.md:** remove the reference to the shared-services folder ([30e92a8](https://github.com/GIScience/ors-map-client/commit/30e92a8704c03639e4ede895f5f7268467c52a2c))

## [1.2.0](https://github.com/GIScience/ors-map-client/compare/v1.1.10...v1.2.0) (2021-07-08)

### Features

- add green and noise extra info ([61aff08](https://github.com/GIScience/ors-map-client/commit/61aff08109c2d84e5fb421a45d55336ce9778b21)), closes [#162](https://github.com/GIScience/ors-map-client/issues/162)

### Code Refactoring

- refactoring of the code for new eslint rules ([04d0a8e](https://github.com/GIScience/ors-map-client/commit/04d0a8e3258488104bae1f0e596f991b179daffd))

### Docs

- command to copy config files simplified ([2a81372](https://github.com/GIScience/ors-map-client/commit/2a813729dd1d8a9d51cb72081dd429edb78c393b))

### Others

- **en-translation-source-merged.json:** update the translation source merged file ([e49514a](https://github.com/GIScience/ors-map-client/commit/e49514a120a66392ee348e8b10969a0ff0909853))

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

- Removed altitude component i18n files, since it is not used anymore

### 1.0.6 (2021-03-25)

### Features

- support for gpx, xml and kml multi segment routes

### Bug Fixes

- Fix building routes as alternative routes in file importer

### 1.0.5 (2021-03-25)

### Bug Fixes

- Stop displaying old route when the route waypoints changed, and a new route cannot be calculated
- Build extra info highlight color based on an item index or value

### 1.0.4 (2021-03-24)

### Bug Fixes

- Show place-markers when the route cannot be calculated
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
