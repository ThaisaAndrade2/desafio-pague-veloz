import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { FormFactory } from "../../support/factories/dados.factory";

// Step para preencher o formulário com dados vindos do feature ou gerados automaticamente
When('preencho o formulário com os dados: nome {string}, preço {string} e data {string}', function (name, price, date_stocked) {

  const dataFromFeature = {
    Name: name,
    Price: price,
    Date: date_stocked,
  };

  let finalProductData = FormFactory.create(); // Dados gerados automaticamente pela factory

  // Ajusta os dados finais conforme input do feature
  Object.keys(dataFromFeature).forEach(key => {
    const value = dataFromFeature[key];
    if (value === '-') {
      // Se for '-', remove a chave para não preencher esse campo
      delete finalProductData[key];
    } else if (value !== 'automaticamente gerado') {
      // Se tiver valor manual, sobrescreve o valor da factory
      finalProductData[key] = value;
    }
    // Se for 'automaticamente gerado', mantém o valor gerado pela factory
  });

  this.productData = finalProductData; // Salva no contexto do cenário

  const fieldMap = {
    'Name': '[data-testid="product-textbox"]',
    'Price': '[data-testid="price-textbox"]',
    'Date': '[data-testid="date-stocked"]',
  };

  // Preenche os campos do formulário conforme os dados finais
  Object.entries(this.productData).forEach(([fieldName, fieldValue]) => {
    const selector = fieldMap[fieldName];
    if (selector && fieldValue != null) {
      cy.get(selector).clear().type(fieldValue);
    }
  });
});

// Valida se os dados foram salvos corretamente na lista
Then('os dados enviados foram salvos com sucesso', function () {
  cy.get('[data-testid="navbar-products"]').should('have.class', 'active');

  const submittedData = this.productData;

  cy.get('tbody tr').first().within(() => {
    cy.get('[data-testid="name"]').should('have.text', submittedData.Name);
    cy.get('[data-testid="price"]').should('have.text', submittedData.Price);
    cy.get('[data-testid="dateStocked"]').should('have.text', submittedData.Date);
  });
});

// Valida que os dados não foram salvos (ex: tentativa inválida)
Then('os dados enviados não foram salvos', function () {
  cy.get('[data-testid="submit-form"]').should('be.visible');

  const submittedData = this.productData;

  cy.get('tbody tr').first().within(() => {
    cy.get('[data-testid="name"]').should('not.have.text', submittedData.Name);
  });
});
