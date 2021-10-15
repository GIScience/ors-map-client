# Automated test

The automated test for this applications are focused on integration tests.

The tests were implemented harmonizing:

- load webpack context before running the tests (support for import, alias, custom extensions, test env)
- debugging the test specs and the source code
- work on browserS without GUI (headless)
- able of testing DOM elements
- Work with project's Vue.js version
- Uses Jasmine as testing tool
- Use karma tester.

## Running tests locally

To run the tets, use npm commands, as follows:

- Run test in single run

    ```sh
    # To run tests
    npm run integration
    ```

- Run tests in watch/debug mode

    ```sh
    # To run tests in debug mode
    npm run integration-debug
    # After the test starts, open the browser on localhost:<port-specified in karma.debug.conf.js>
    ```

## Automated CI tests

The application includes a github action workflow, stored in `.github/workflows/test.yml`, that triggers the test run when it is pushed to the github repository. In order to run the testes, a custom github action was created and published to github market place and is referenced in the `test.yml` file. More details can be seen on [https://github.com/amoncaldas/github-action-webapp-front-end-test](https://github.com/amoncaldas/github-action-webapp-front-end-test)