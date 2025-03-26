import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  projectId: '2npvgh',
  e2e: {
    specPattern: [
      "cypress/e2e/*.{cy,spec}.{js,jsx,ts,tsx}",
      "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}"
    ],
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}"
  },
})
