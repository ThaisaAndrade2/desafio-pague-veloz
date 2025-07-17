// Importando o comando customizado para criar dados do body da requisição
import { generateData } from '../../support/factories/factory.js';

describe('Testes da API', () => {

  it('Realizando um POST com dados dinâmicos e validando o schema da resposta', () => {
    
    // Carregando o arquivo de schema
    cy.fixture('schemas/post_schema.json').then((postSchema) => {

      // Definindo o tempo máximo de resposta
      const responseTimeLimit = Cypress.env('responseTimeLimit');

      // Criando os dados dinâmicos
      const userData = generateData();
 
      cy.log('Dados gerados pela Factory:', JSON.stringify(userData));

      // Fazendo a requisição com os dados gerados e as validações necessárias
      cy.createPost(userData).then((response) => {

        // Verificando o status Code
        expect(response.status).to.eq(201);

        // Verificando o tempo de resposta é menor ou igual ao limite definido
        expect(response.duration, `O tempo de resposta foi de ${response.duration}ms, o que é maior que o limite de ${responseTimeLimit}ms!`).to.be.lte(responseTimeLimit);

        // Validação do schema da resposta
        expect(response.body).to.be.jsonSchema(postSchema);

        // Validação do conteúdo da resposta
        expect(response.body.userId).to.eq(userData.userId);
        expect(response.body.title).to.eq(userData.title);
        expect(response.body.body).to.eq(userData.body);
      });
    });
  });
});