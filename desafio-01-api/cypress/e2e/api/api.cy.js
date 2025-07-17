// Importando apenas as ferramentas de DADOS necessárias
import { generateData } from "../../support/factories/factory.js";
import { getRandomPostId } from "../../support/helpers.js";

describe("Testes da API (JSON Placeholder) - Validação dos endpoints", () => {
  //Variaveis reutilizáveis
  const responseTimeLimit = Cypress.env("responseTimeLimit");
  let postSchema;
  let commentsSchema;

  // Carregando os schemas uma vez para todos os testes
  before(() => {
    cy.fixture("schemas/post_schema.json").then((schema) => {
      postSchema = schema;
    });
    cy.fixture("schemas/post_comments_schema.json").then((schema) => {
      commentsSchema = schema;
    });
  });

  it("[POST] - Deve criar uma nova postagem com sucesso", () => {
    const postData = generateData();
    cy.log("Dados gerados pela Factory:", JSON.stringify(postData));

    cy.createPost(postData).then((response) => {
      cy.validateStatusAndTime(response, 201, responseTimeLimit);
      cy.validateSchemaAndContent(response.body, postSchema, postData);
    });
  });

  it("[GET] - Deve listar todas as postagens existentes", () => {
    cy.getAllPosts().then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
      expect(response.body).to.be.an("array").and.not.to.be.empty;
      cy.validateSchemaAndContent(response.body[0], postSchema);
    });
  });

  it("[GET] - Deve listar uma postagem específica por ID", () => {
    getRandomPostId().then((postId) => {
      cy.getItemByPostId(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        cy.validateSchemaAndContent(response.body, postSchema, { id: postId });
        expect(response.body).to.be.an("object").and.not.be.an("array");
      });
    });
  });

  it("[GET] - Deve listar comentários de uma postagem por query", () => {
    getRandomPostId().then((postId) => {
      cy.getPostCommentsByQuery(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          cy.validateSchemaAndContent(response.body[0], commentsSchema, { postId: postId });
        }
      });
    });
  });

  it("[PATCH] - Deve atualizar parcialmente uma postagem", () => {
    getRandomPostId().then((postId) => {
      cy.getItemByPostId(postId).then((originalResponse) => {
        const originalBody = originalResponse.body.body;
        const partialUpdate = { title: generateData().title };

        cy.updatePostByPatch(postId, partialUpdate).then((response) => {
          cy.validateStatusAndTime(response, 200, responseTimeLimit);
          cy.validateSchemaAndContent(response.body, postSchema, {
            id: postId,
            title: partialUpdate.title,
            body: originalBody,
          });
        });
      });
    });
  });

  it("[PUT] - Deve substituir totalmente uma postagem", () => {
    getRandomPostId().then((postId) => {
      const newPostData = generateData();
      const putPayload = { id: postId, ...newPostData };

      cy.updatePostByPut(postId, putPayload).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        cy.validateSchemaAndContent(response.body, postSchema, putPayload);
      });
    });
  });

  it('[DELETE] - Deve deletar uma postagem por ID', () => {
    getRandomPostId().then((postId) => {
      cy.deletePostById(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        expect(response.body).to.be.empty;
      });
    });
  });
});
