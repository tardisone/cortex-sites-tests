const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  env: {
    stage: 'qa',
    app: 'careesma',
    scope: 'smoke',
    executionPlatforms: ['desktop', 'mobile'],
  },
  fixturesFolder: './cypress/fixtures',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  projectId: '9dqmua',
  screenshotsFolder: './cypress/screenshots',
  video: false,
  videosFolder: './cypress/videos',
  redirectionLimit: 50,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins')(on, config)
    },
    specPattern: './cypress/e2e/clientsites/**/*.{js,jsx,ts,tsx}',
    experimentalSessionAndOrigin: true,
  },
})
