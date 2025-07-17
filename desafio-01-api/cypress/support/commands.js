/**
 * Adiciona um log da URL completa antes de cada requisição. (Isso ajuda na depuração!!)
 * @param {string} method - O método HTTP realizado (GET, POST, etc.).
 * @param {string} url - A URL completa da requisição.
 */
function logRequest(method, url) {
  cy.log(`[${method}] ${url}`);
}

// =======================================================
// Comandos de requests para a API
// =======================================================

Cypress.Commands.add('createPost', (postData) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('POST', `${baseUrl}/posts`);
  cy.request({ method: 'POST', url: '/posts', body: postData, failOnStatusCode: false });
});

Cypress.Commands.add('getAllPosts', () => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('GET', `${baseUrl}/posts`);
  cy.request({ method: 'GET', url: '/posts', failOnStatusCode: false });
});

Cypress.Commands.add('getItemByPostId', (postId) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('GET', `${baseUrl}/posts/${postId}`);
  cy.request({ method: 'GET', url: `/posts/${postId}`, failOnStatusCode: false });
});

Cypress.Commands.add('getPostComments', (postId) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('GET', `${baseUrl}/posts/${postId}/comments`);
  cy.request({ method: 'GET', url: `/posts/${postId}/comments`, failOnStatusCode: false });
});

Cypress.Commands.add('getPostCommentsByQuery', (postId) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('GET', `${baseUrl}/comments?postId=${postId}`);
  cy.request({ method: 'GET', url: '/comments', qs: { postId }, failOnStatusCode: false });
});

Cypress.Commands.add('updatePostByPatch', (postId, updatedData) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('PATCH', `${baseUrl}/posts/${postId}`);
  cy.request({ method: 'PATCH', url: `/posts/${postId}`, body: updatedData, failOnStatusCode: false });
});

Cypress.Commands.add('updatePostByPut', (postId, fullPostData) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('PUT', `${baseUrl}/posts/${postId}`);
  cy.request({ method: 'PUT', url: `/posts/${postId}`, body: fullPostData, failOnStatusCode: false });
});

Cypress.Commands.add('deletePostById', (postId) => {
  const baseUrl = Cypress.config('baseUrl');
  logRequest('DELETE', `${baseUrl}/posts/${postId}`);
  cy.request({ method: 'DELETE', url: `/posts/${postId}`, failOnStatusCode: false });
});

// =======================================================
// Comandos de validações mais gerais
// =======================================================

/**
 * Valida o status e o tempo de resposta de uma requisição.
 */
Cypress.Commands.add('validateStatusAndTime', (response, expectedStatus, timeLimit) => {
  const durationMessage = `O tempo de resposta foi de ${response.duration}ms, maior que o limite de ${timeLimit}ms!`;
  expect(response.status, `Status esperado: ${expectedStatus}`).to.eq(expectedStatus);
  expect(response.duration, durationMessage).to.be.lte(timeLimit);
});

/**
 * Valida o schema e o conteúdo do corpo da resposta.
 */
Cypress.Commands.add('validateSchemaAndContent', (responseBody, schema, expectedContent = {}) => {
  expect(responseBody).to.be.jsonSchema(schema);
  
  Object.entries(expectedContent).forEach(([key, value]) => {
    expect(responseBody[key], `Validação do campo: ${key}`).to.eq(value);
  });
});