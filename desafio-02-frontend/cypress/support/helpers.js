import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { navBarMap, buttonMap, generalErrorMap, navButtonMap } from './mappings';

function getTestIdFromLinkText(linkText) {
  const linkInfo = navBarMap[linkText];
  if (!linkInfo) {
    throw new Error(`O texto do link "${linkText}" não foi encontrado no mapeamento (mappings.js).`);
  }
  return linkInfo;
}

//button
function getSelectorFromButtonName(buttonName) {
  const selector = buttonMap[buttonName];

  if (!selector) {
    throw new Error(`O botão "${buttonName}" não foi encontrado no mapeamento (mappings.js).`);
  }

  return selector;
}

//nav
function getSelectorFromNavName(navButtonName) {
  const selector = navButtonMap[navButtonName];

  if (!selector) {
    throw new Error(`A opção do navegador "${navButtonName}" não foi encontrado no mapeamento (mappings.js).`);
  }

  return selector;
}


function getGeneralErrorMessageByKey(key) {
  const message = generalErrorMap[key];
  if (message === undefined) {
    throw new Error(`A chave de erro geral "${key}" não foi encontrada no mapeamento (mappings.js).`);
  }
  return message;
}

// baseUrl com o path: 'https://commitquality.com'
Given("que acesso a página principal", () => {
  cy.visit("/");

  Object.values(navBarMap).forEach(linkInfo => {
    cy.get(`[data-testid="${linkInfo.testid}"]`).should('be.visible');
  });
});

// baseUrl com o path: 'https://commitquality.com' + '/login'
Given("que acesso a página {string}", (path) => {
  cy.visit(path);
});

// validar botões
When('clico no botão {string}', (buttonName) => {
  const buttonSelector = getSelectorFromButtonName(buttonName);
  cy.get(buttonSelector).click();
});

// validar botões navBar
When('clico na opção do navegador {string}', (navButtonName) => {
  const navButtonSelector = getSelectorFromNavName(navButtonName);
  cy.get(navButtonSelector).click();
});

// validar links de navegação
Then('estamos na página de {string}', (linkText) => {
  const { testid } = getTestIdFromLinkText(linkText);
  cy.get(`[data-testid="${testid}"]`).should('have.class', 'active');
});

// Mensagem geral de erro
Then('deve exibir a mensagem de erro geral de {string}', (errorKey) => {
  const expectedMessage = getGeneralErrorMessageByKey(errorKey);
  cy.contains(expectedMessage).should('be.visible');
});

//mensagem de erro específica de erro (campo vs erro)
Then('o campo {string} deve exibir o erro {string}', (fieldLabels, errorMessages) => {
  const fields = fieldLabels.split(';').map(field => field.trim());
  const errors = errorMessages.split(';').map(msg => msg.trim());

  fields.forEach((field, index) => {
    const expectedError = errors[index];

    cy.contains('label', field)
      .parent()
      .within(() => {
        cy.get('.error-message')
          .should('contain.text', expectedError)
          .and('be.visible');
      });
  });
});

//mensagem de erro específica (formulário)
Then('uma mensagem de erro é exibida {string}', (expectedError) => {
  cy.contains(expectedError)
    .should('be.visible')
    .then(($element) => {
      cy.log(`Mensagem de erro exibida: "${$element.text()}"`);
    });
});

When('clico fora do formulário', () => {
  cy.get('.App').click();
});
