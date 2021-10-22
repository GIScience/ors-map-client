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
- `Selenium` and `nightwatch` for e2e tests (not yet fully used)

## Running tests locally

To run the tets, use npm commands, as follows:

- Run test in single run

    ```sh
    # To run tests
    npm run test
    ```

- Run tests in watch/debug mode

    ```sh
    # To run tests in debug mode
    npm run test:debug
    # After the test starts, open the browser on localhost:<port-specified in karma.debug.conf.js>
    ```

## Automated CI tests

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
- vue-server-renderer
- vue-template-compiler
- phantomjs-prebuilt
