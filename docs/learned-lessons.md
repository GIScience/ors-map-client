# Learned lessons

This document list some issues and how they were solved

## Error in Karma test: Disconnected because no message in 10000 ms

http://alexeyhorn.com/javascript/karma/2017/05/31/fix-karma-disconnected-error.html

## Error in nighwatch/sellenium test: session deleted because of page crash

Add the '--disable-dev-shm-usage' flag to the browser.

https://svdoscience.com/2021-03-17/fix-session-deleted-page-crash-selenium-grid-chrome-docker

## Support for aliases in imports outside webpack cotnext

Install the module-alias package - https://github.com/ilearnio/module-alias

Add to package.json (for an alias to @):

```js
"_moduleAliases": {
    "@": "src/"
  }
```

## Allow the use of import outside webpack

Install the @babel/register package - https://www.npmjs.com/package/@babel/register

Add to the file where you want to use import, before any import statment:

```js
require('@babel/register')
```

## Use babel.config.js to support dynamic compiling rules

babel.config.js replaces .babelrc and can have dynamic behavior
