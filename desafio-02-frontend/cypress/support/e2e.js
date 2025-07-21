// Hook que executa UMA VEZ ANTES de cada arquivo .feature
before(() => {
  cy.log('Hook "Before All" (início do arquivo de feature)');
  // Ex: Limpar uma base de dados antes de iniciar os testes da feature
});

// Hook que executa ANTES de CADA cenário
beforeEach(() => {
  cy.log('Hook "Before Each" (início de um novo cenário)');
  // Ex: Limpar cookies ou local storage para garantir um estado limpo
  cy.clearCookies();
  cy.clearLocalStorage();
});

after(() => {
  cy.log('Hook "After All" (fim de todos os cenários no arquivo)');
})