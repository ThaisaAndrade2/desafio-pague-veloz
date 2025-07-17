Cypress.Commands.add('createPost', (postData) => {
  cy.request({
    method: 'POST',
    url: '/posts',
    body: postData,
    failOnStatusCode: false
  });
});