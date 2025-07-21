import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProductsFactory } from "../../support/factories/dados.factory";
import { buttonMap } from "../../support/mappings"; 

// Função auxiliar para obter o seletor do botão pelo nome, usando o mapeamento centralizado
function getSelectorFromButtonName(buttonName) {
  const selector = buttonMap[buttonName];

  if (!selector) {
    throw new Error(
      `O botão "${buttonName}" não foi encontrado no mapeamento (mappings.js).`
    );
  }

  return selector;
}

let currentProduct; // Armazena o produto atual para validações futuras

// Função que retorna um produto existente ou inexistente conforme o tipo solicitado
const getProductForSearch = (productType) => {
  let product;
  if (productType === "existente") {
    product = ProductsFactory.existingProducts()[0]; // Primeiro produto existente
  } else if (productType === "inexistente") {
    product = ProductsFactory.nonExistingProducts()[0]; // Primeiro produto inexistente
  } else {
    throw new Error(
      `Tipo de produto inválido: ${productType}. Use 'existente' ou 'inexistente'.`
    );
  }
  currentProduct = product;
  return product;
};

// Preenche o campo de busca com o nome do produto gerado
When("o campo de busca é preenchido com um produto {string}", (productType) => {
  const product = getProductForSearch(productType);

  cy.get(".filter-textbox")
    .type(product.Name)
    .should("have.value", product.Name);
  cy.log(`Campo de busca preenchido com: "${product.Name}"`);
});

// Valida se o produto atual está visível na lista
Then("o produto deve ser encontrado", () => {
  if (!currentProduct) {
    throw new Error("Nenhum produto foi definido no passo anterior para validação.");
  }
  cy.get("table.product-list-table")
    .find(`td[data-testid="name"]:contains("${currentProduct.Name}")`)
    .should("be.visible");
  cy.log(`Produto "${currentProduct.Name}" encontrado na lista.`);
});

// Valida se a mensagem de não encontrado é exibida e a tabela não existe
Then("o produto não deve ser encontrado", () => {
  cy.get('p.add-product-message')
    .should('contain.text', 'No products found')
    .and('be.visible');
  cy.log(`Mensagem "No products found" exibida, confirmando que o produto não foi encontrado.`);

  cy.get('table.product-list-table').should('not.exist');
});

// Valida se novos itens foram carregados e o botão "Show More" sumiu
Then('novos itens são exibidos e o botão "Show More" desaparece', () => {
  cy.get("table.product-list-table tbody tr").should(
    "have.length.within",
    11,
    12
  );
  cy.log("A lista de produtos foi estendida com novos itens.");

  const showMoreButtonSelector = getSelectorFromButtonName("Show More");
  cy.get(showMoreButtonSelector).should("not.exist");
  cy.log('O botão "Show More" desapareceu.');
});

// Valida se o campo de busca contém o nome do produto atual
Then('o campo de busca deve exibir o valor do produto', () => {
  if (!currentProduct) {
    throw new Error('Nenhum produto foi definido no passo anterior para validação do campo de busca.');
  }
  cy.get('.filter-textbox').should('have.value', currentProduct.Name);
  cy.log(`O campo de busca exibe o valor do produto: "${currentProduct.Name}"`);
});

// Valida se o campo de busca foi limpo
Then('o campo de busca deve ser limpo', () => {
  cy.get('.filter-textbox').should('have.value', '');
  cy.log('O campo de busca foi limpo.');
});
