# Automated test

The automated test for this applications are focused on integration tests.

The tests were implemented harmonizing:

- Load webpack context before running the tests (support for import, alias, custom extensions, test env)
- Debugging the test specs and the source code
- Work on browserS without GUI (headless)
- Able of testing DOM elements
- Work with project's Vue.js version
- `Jasmine` as testing framework
- `Vue Test Utils` for manipulating vue components
- `@vue/server-test-utils` for rendering vue components
- `Karma` as tester runner
- `Mocha` for reporting test results
- `Selenium` and `nightwatch` for e2e tests

## Running tests locally

In oder to run the tests, it is required that you have Chrome and Firefox browsers installed locally. The CI tests in github uses a custom action environment which includes those browsers. If you don't have a version of each one that are compatible with the test runner, you must install them. If you are using a Debian-like OS, you can install them by running:

```sh
# Install Chrome and Firefox browsers in a Debian-like OS
sudo apt update \
&& apt install -y curl wget \
&& echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list \
&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
&& apt update \
&& apt install -y google-chrome-stable firefox
```

To run the tests, use npm commands, as follows:

- Run unit/integration tests individually, in a single run

    ```sh
    # Run unit tests
    npm run test:unit

    # Run integration tests
    npm run test:integration
    ```

- Run e2e tests individually, in a single run

  To run the e2e tests, it is necessary to have Java installed locally (for Selenium server). The CI tests in github uses a custom action environment which includes a Java installation.

  If you are using a Debian-like OS, you can install java by running:

  ```sh
  # Install Java in a Debian-like OS
  sudo apt update && apt install -y default-jdk
  ```

  Once Java is installed, to run e2e tests, use the command:

  ```sh
  # Run e2e tests
  npm run test:e2e
  ```

- Run all the tests in a single run (if your environment matches the requirements informed above)

  ```sh
  # Run all tests (e2e, unit and integration)
  npm run test
  ```

- Run unit/integration tests in watch/debug mode

    ```sh
    # Run unit tests in debug mode
    npm run test:unit-debug
    # After the test starts, open the browser on localhost:<port-specified in tests/karma.debug.conf.js>

    # Run integration tests in debug mode
    npm run test:integration-debug
    # After the test starts, open the browser on localhost:<port-specified in tests/karma.debug.conf.js>
    ```

## Automated CI tests on push

The application includes a github action workflow, stored in `.github/workflows/test.yml`, that triggers the test run when it is pushed to the github repository. In order to run the testes, a custom github action was created and published to github market place and is referenced in the `test.yml` file. More details can be seen on [https://github.com/amoncaldas/github-action-webapp-front-end-test](https://github.com/amoncaldas/github-action-webapp-front-end-test)

## Testing dedicated packages

The following packages are used for the testing solution:

- @vue/server-test-utils
- @vue/test-utils
- cross-env
- jasmine
- mocha
- karma
  - karma-chrome-launcher
  - karma-coverage
  - karma-firefox-launcher
  - karma-jasmine-html-reporter
  - karma-mocha
  - karma-phantomjs-launcher
  - karma-sourcemap-loader
  - karma-spec-reporter
  - karma-webpack
- nightwatch
- selenium-server
- chromedriver
- vue-server-renderer
- vue-template-compiler
- phantomjs-prebuilt
- webpack-karma-jasmine
- @babel/polyfill
- @babel/preset-env
- sinon
- sinon-chai
