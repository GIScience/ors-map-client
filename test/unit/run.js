// How to use Jasmine with es6
// https://www.classandobjects.com/test_using_jasmine_react_es6_webpack/

// Jasmine tutorial:
// https://www.freecodecamp.org/news/jasmine-unit-testing-tutorial-4e757c2cbf42/

// Setup Istanbul with Jasmine:
// https://bryce.fisher-fleig.org/setting-up-istanbul-with-jasmine/

// eslint-disable-next-line no-undef
const Jasmine = require('jasmine')

try {
  // eslint-disable-next-line no-undef
  require('./test-env.js')
} catch (ex) {
  // Silence is gold!
}

// eslint-disable-next-line no-undef
var ORSKEY = process.env.ORSKEY

if (ORSKEY && ORSKEY !== 'put-an-ors-key-here' && ORSKEY != '') {
  let jasmine = new Jasmine()

  // Modify this line to point to your jasmine.json
  jasmine.loadConfigFile('./test/unit/jasmine.json')

  // Some tests take longer than the default 5000ms of Jasmine
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000
  jasmine.execute()
} else {
  // eslint-disable-next-line no-console
  console.log(
    '\x1b[33m%s\x1b[0m',
    'A valid ORSKEY was not set via spec/test-env.js file nor via environment variable. The tests were aborted.'
  )
  // eslint-disable-next-line no-undef
  process.exit(1)
}
