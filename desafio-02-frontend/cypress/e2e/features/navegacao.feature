                  # language: pt
                  Funcionalidade: Validações de navegação gerais

                  @HappyFlow
                  Esquema do Cenário: Acessar a página inicial com sucesso by baseUrl + <path>
                  Dado que acesso a página "/<path>"
                  E estamos na página de "<pagina>"

                  Exemplos:
                  | pagina      | path        |
                  | Add Product | add-product |
                  | Practice    | practice    |
                  | Login       | login       |

                  @HappyFlow
                  Esquema do Cenário:  Acessar a página inicial com sucesso by navBar: <pagina>
                  Dado que acesso a página principal
                  Quando clico na opção do navegador "<navBar>"
                  E estamos na página de "<pagina>"

                  Exemplos:
                  | pagina      | navBar             |
                  | Products    | Products navBar    |
                  | Add Product | Add Product navBar |
                  | Practice    | Practice navBar    |
                  | Login       | Login navBar       |


                  @UnhappyFlow
                  Esquema do Cenário: Teste Botão "<botão>" - Validar ações do botão
                  Dado que acesso a página principal
                  E clico no botão "<botão>"

                  Exemplos:
                  | botão         |
                  | Add a Product |
                  | Show More     |
                  | Filter        |


                  @UnhappyFlow
                  Esquema do Cenário: Validar erros - <descrição_do_erro>
                  Dado que acesso a página principal
                  E clico no botão "Add a Product"
                  E estamos na página de "Add Product"
                  Quando clico no botão "Submit"
                  Então o campo "<campo_com_erro>" deve exibir o erro "<mensagem_de_erro>"
                  E deve exibir a mensagem de erro geral de "formulário"

                  Exemplos:
                  | dados                             | campo_com_erro | mensagem_de_erro                             |
                  | Todos os campos sem preenchimento | Name           | Name must be at least 2 characters.          |
                  | Somente Date sem preenchimento    | Date Stocked   | Date must not be empty.                      |
                  | Somente price sem preenchimento   | Price          | Price must not be empty and within 10 digits |


