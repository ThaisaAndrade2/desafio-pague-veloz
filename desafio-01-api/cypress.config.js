const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com', 

    env: {
      responseTimeLimit: 500 //Tempo máximo de resposta em milissegundos para API
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});