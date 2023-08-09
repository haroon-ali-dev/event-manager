const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      auth0_username: process.env.AUTH0_USERNAME,
      auth0_password: process.env.AUTH0_PASSWORD,
      auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
