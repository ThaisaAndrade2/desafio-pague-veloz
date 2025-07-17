import { faker } from '@faker-js/faker';

/**
 * Busca todos os posts e retorna um ID aleatório da lista para ser usado em outros testes.
 * @returns {Cypress.Chainable<number>} - Retorna um ID de post válido que existe na API.
 */

export function getRandomPostId() {
  return cy.request({
    method: 'GET',
    url: '/posts',
  }).then((response) => {
    // Validações básicas para garantir que a lista veio corretamente
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array').and.not.to.be.empty;

    // Pega um postID aleatório do array da resposta
    const randomPost = faker.helpers.arrayElement(response.body);
    
    // Retorna apenas o ID
    return randomPost.id;
  });
}
