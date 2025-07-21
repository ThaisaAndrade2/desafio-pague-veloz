// cypress-report.js

const report = require("multiple-cucumber-html-reporter");
const os = require("os");
const dayjs = require("dayjs");

// Tenta ler as informações salvas pelo Cypress.
// Se o arquivo não existir, usa valores padrão.
let runInfo = {};
try {
  runInfo = require("./cypress/reports/run-info.json");
} catch (e) {
  console.log("Não foi possível ler o arquivo run-info.json. Usando valores padrão.");
  runInfo = {
    browserName: "N/A",
    browserVersion: "N/A"
  }
}

const aData = dayjs().format("DD-MM-YYYY_HH-mm-ss");

report.generate({
  screenshotsDir: "cypress/screenshots/",
  jsonDir: "cypress/reports/",
  reportPath: "cypress/reports/cucumber-html-report/",
  embedScreenshots: true,
  metadata: {
    browser: {
      // --> DADOS AUTOMÁTICOS DO CYPRESS <--
      name: runInfo.browserName,
      version: runInfo.browserVersion,
    },
    device: "Máquina Local",
    platform: {
      // --> DADOS AUTOMÁTICOS DO NODE.JS <--
      name: os.platform(),
      version: os.release(),
    },
  },
  reportName: "Relatório de Testes - " + aData,
  customData: {
    title: "Informações da Execução",
    data: [
      { label: "Projeto", value: "Desafio PagueVeloz Frontend" },
      { label: "URL Base", value: runInfo.runUrl || 'N/A' },
      { label: "Data", value: runInfo.runDate || new Date().toLocaleString() }
    ],
  },
  displayDuration: true,
  openReportInBrowser: true,
  pageTitle: "Relatório de Teste",
});