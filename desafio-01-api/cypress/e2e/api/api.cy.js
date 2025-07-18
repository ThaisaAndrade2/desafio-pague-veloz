// Importando apenas as ferramentas de DADOS necessárias
import { generateData } from "../../support/factories/factory.js";
import { getRandomPostId } from "../../support/helpers.js";

describe("Testes da API (JSON Placeholder) - Validação dos endpoints", () => {
  //Variaveis reutilizáveis
  const responseTimeLimit = Cypress.env("responseTimeLimit");
  const postIdInexistente = 999;
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

  //* [Happy Flow] */
  it("[POST][Cenario 01] - Deve criar uma nova postagem com sucesso", () => {
    const postData = generateData();
    cy.log("Dados gerados pela Factory:", JSON.stringify(postData));

    cy.createPost(postData).then((response) => {
      cy.validateStatusAndTime(response, 201, responseTimeLimit);
      cy.validateSchemaAndContent(response.body, postSchema, postData);
    });
  });

  it("[GET][Cenario 02] - Deve listar todas as postagens existentes", () => {
    cy.getAllPosts().then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
      expect(response.body).to.be.an("array").and.not.to.be.empty;
      cy.validateSchemaAndContent(response.body[0], postSchema);
    });
  });

  it("[GET][Cenario 03] - Deve listar uma postagem específica por ID", () => {
    getRandomPostId().then((postId) => {
      cy.getItemByPostId(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        cy.validateSchemaAndContent(response.body, postSchema, { id: postId });
        expect(response.body).to.be.an("object").and.not.be.an("array");
      });
    });
  });

  it("[GET][Cenario 04] - Deve listar comentários de uma postagem por query", () => {
    getRandomPostId().then((postId) => {
      cy.getPostCommentsByQuery(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        expect(response.body).to.be.an("array");
        if (response.body.length > 0) {
          cy.validateSchemaAndContent(response.body[0], commentsSchema, {
            postId: postId,
          });
        }
      });
    });
  });

  it("[PATCH][Cenario 05] - Deve atualizar parcialmente uma postagem", () => {
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

  it("[PUT][Cenario 06] - Deve substituir totalmente uma postagem", () => {
    getRandomPostId().then((postId) => {
      const newPostData = generateData();
      const putPayload = { id: postId, ...newPostData };

      cy.updatePostByPut(postId, putPayload).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        cy.validateSchemaAndContent(response.body, postSchema, putPayload);
      });
    });
  });

  it("[DELETE][Cenario 07] - Deve deletar uma postagem por ID", () => {
    getRandomPostId().then((postId) => {
      cy.deletePostById(postId).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        expect(response.body).to.be.empty;
      });
    });
  });

  //* [Unhappy Flow] */
  it("[GET][Cenario 08] - Busca geral - ID inexistente", () => {
    cy.getItemByPostId(postIdInexistente).then((response) => {
      cy.validateStatusAndTime(response, 404, responseTimeLimit);
    });
  });

  it("[POST][BUG 01][Cenario 09] - Realizando uma postagem com parametros extra não mapeados", () => {
    const postData = generateData();
    const postDataWithExtraField = {
      ...postData,
      nome: "Thaisa",
    };
    cy.log("Campo extra inexistente:", JSON.stringify(postDataWithExtraField));

    cy.createPost(postDataWithExtraField).then((response) => {
      cy.validateStatusAndTime(response, 201, responseTimeLimit);

      expect(response.body).to.have.property("nome", "Thaisa");

      expect(response.body.title).to.eq(postData.title);
      expect(response.body.body).to.eq(postData.body);
      expect(response.body.userId).to.eq(postData.userId);
    });
  });

  it("[POST][BUG 02][Cenario 10] - Realizando uma postagem sem atributos no body", () => {
    const emptyBody = {};
    cy.log("Enviando requisição com corpo vazio:", JSON.stringify(emptyBody));

    cy.createPost(emptyBody).then((response) => {
      cy.validateStatusAndTime(response, 201, responseTimeLimit);
      expect(response.body).to.have.property("id");
    });
  });

  it("[GET][BUG 03][Cenario 11] - Busca por recurso aninhado - ID inexistente", () => {
    cy.getPostComments(postIdInexistente).then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
    });
  });

  it("[GET][BUG 04][Cenario 12] - Busca por parametro (query) - ID inexistente", () => {
    cy.getPostCommentsByQuery(postIdInexistente).then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
    });
  });

  it("[PATCH][BUG 05][Cenario 13] - Realizando uma atualização com ID inexistente", () => {
    const partialUpdate = { title: generateData().title };
    cy.updatePostByPatch(postIdInexistente, partialUpdate).then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
    });
  });

  it("[POST][BUG 06][Cenario 14] - Realizando uma postagem com tipo de dado incorreto", () => {
    const postData = generateData();
    postData.userId = "Texto aleatório";

    cy.createPost(postData).then((response) => {
      cy.validateStatusAndTime(response, 201, responseTimeLimit);
      expect(response.body.userId).to.eq("Texto aleatório");
    });
  });

  it("[PATCH][BUG 07][Cenario 15] - Realizando uma atualização com body sem dados", () => {
    getRandomPostId().then((postId) => {
      const emptyBody = {};
      cy.updatePostByPatch(postId, emptyBody).then((response) => {
        cy.validateStatusAndTime(response, 200, responseTimeLimit);
        expect(response.body.id).to.eq(postId);
        expect(response.body).to.have.all.keys("userId", "id", "title", "body");      });
    });
  });

  it('[PUT][BUG 08][Cenario 16] - Realizando uma atualização com ID inexistente', () => {
    const newPostData = generateData();
    cy.updatePostByPut(postIdInexistente, newPostData).then((response) => {
      cy.validateStatusAndTime(response, 500, responseTimeLimit);
    });
  });

  it('[DELETE][BUG 09][Cenario 17] - Deletando um registro inexistente', () => {
    cy.deletePostById(postIdInexistente).then((response) => {
      cy.validateStatusAndTime(response, 200, responseTimeLimit);
    });
  });
});
