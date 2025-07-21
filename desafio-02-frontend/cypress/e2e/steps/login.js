import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginFactory } from "../../support/factories/dados.factory"; 

// Step para preencher os dados de login com valores vindos do feature ou gerados automaticamente
When("preencho os dados de login com: usuário {string} e senha {string}", function (username, password) {
  const dataUserFromFeature = {
    Username: username,
    Password: password,
  };

  let finalLoginData = LoginFactory.create(); // Gera dados automáticos pela factory

  // Aplica regras de sobrescrita ou exclusão conforme os valores recebidos
  Object.keys(dataUserFromFeature).forEach(key => {
    const value = dataUserFromFeature[key];
    if (value === '-') {
      // Se for '-', remove a chave para não preencher esse campo
      delete finalLoginData[key];
    } else if (value !== 'automaticamente gerado') {
      // Se tiver valor manual, sobrescreve o valor gerado pela factory
      finalLoginData[key] = value;
    }
    // Se for 'automaticamente gerado', mantém o valor original da factory
  });

  // Mapeamento dos campos de login para os seletores no HTML
  const fieldMap = {
    'Username': '[data-testid="username-textbox"]',
    'Password': '[data-testid="password-textbox"]',
  };

  // Preenche cada campo de login conforme os dados finais
  Object.entries(finalLoginData).forEach(([fieldName, fieldValue]) => {
    const selector = fieldMap[fieldName];
    if (selector && fieldValue != null) {
      cy.get(selector).clear().type(fieldValue);
    }
  });
});

// Step para clicar no botão de login
When('clico no botão login', () => {
  cy.get('[data-testid="login-button"]').click();
});

// Step para validar login bem sucedido (Só exemplo pois não tinha credencial validas)
Then('o login deve ser bem-sucedido e sou redirecionado para a página principal', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.get('[data-testid="navbar-products"]').should('be.visible');
});

// Step para validar que continuamos na página de login em casos de falha
Then('continuamos na página de login', () => {
  cy.url().should('include', '/login');
  cy.get('[data-testid="login-button"]').should('be.visible');
});
