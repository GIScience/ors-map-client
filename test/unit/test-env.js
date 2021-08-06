/* eslint-disable no-undef */
// Define the ORSKEY for local tests.
// The same variable is defined in travis-ci to run automated tests
if (!process.env.ORSKEY) {
  process.env.ORSKEY =
    '5b3ce3597851110001cf62484c2b303725d843b5b765b5e83e8e3c30'
}
