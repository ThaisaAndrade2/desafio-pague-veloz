                  # language: pt
                  Funcionalidade: Validações de formulário de produto

                  @HappyFlow @Form
                  Esquema do Cenário: Formulário com todos dados preenchidos - <validacao>
                  Dado que acesso a página principal
                  E clico no botão "Add a Product"
                  E estamos na página de "Add Product"
                  Quando preencho o formulário com os dados: nome "<name>", preço "<price>" e data "<date_stocked>"
                  E clico no botão "Submit"
                  Então os dados enviados foram salvos com sucesso

                  Exemplos:
                  | validacao                             | name                      | price                  | date_stocked           |
                  | Todos os campos automáticos           | automaticamente gerado    | automaticamente gerado | automaticamente gerado |
                  | Nome manual, resto automático         | Thaisa Andrade dos Santos | automaticamente gerado | automaticamente gerado |
                  | Preço manual, resto automático        | automaticamente gerado    | 999                    | automaticamente gerado |
                  | Data manual, resto automático         | automaticamente gerado    | automaticamente gerado | 2025-07-20             |
                  | Nome e Preço manuais, Data automática | Produto de Teste          | 123.45                 | automaticamente gerado |
                  | Nome e Data manuais, Preço automático | Outro Produto             | automaticamente gerado | 2025-07-21             |
                  | Preço e Data manuais, Nome automático | automaticamente gerado    | 500                    | 2025-07-22             |
                  | Todos os campos manuais               | Produto Final             | 1500                   | 2025-07-23             |


                  @UnhappyFlow @Form
                  Esquema do Cenário: Formulário com alguns dados não preenchidos - <validacao>
                  Dado que acesso a página "/add-product"
                  E estamos na página de "Add Product"
                  E preencho o formulário com os dados: nome "<name>", preço "<price>" e data "<date_stocked>"
                  Quando clico no botão "Submit"
                  Então o campo "<campo_com_erro>" deve exibir o erro "<mensagem_de_erro>"
                  E deve exibir a mensagem de erro geral de "formulário"

                  Exemplos:
                  | validacao                            | name                   | price                  | date_stocked           | campo_com_erro            | mensagem_de_erro                                                                                           |
                  # --- Cenários todos os campos vazios ---
                  | Todos os campos vazios               | -                      | -                      | -                      | Name; Price; Date Stocked | Name must be at least 2 characters.; Price must not be empty and within 10 digits; Date must not be empty. |
                  # --- Cenários com preenchimento automático ---
                  | Nome vazio, resto automático         | -                      | automaticamente gerado | automaticamente gerado | Name                      | Name must be at least 2 characters.                                                                        |
                  | Preço vazio, resto automático        | automaticamente gerado | -                      | automaticamente gerado | Price                     | Price must not be empty and within 10 digits                                                               |
                  | Data vazia, resto automático         | automaticamente gerado | automaticamente gerado | -                      | Date Stocked              | Date must not be empty.                                                                                    |
                  | Apenas Nome automático, resto vazio  | automaticamente gerado | -                      | -                      | Price; Date Stocked       | Price must not be empty and within 10 digits; Date must not be empty.                                      |
                  | Apenas Preço automático, resto vazio | -                      | automaticamente gerado | -                      | Name; Date Stocked        | Name must be at least 2 characters.; Date must not be empty.                                               |
                  | Apenas Data automática, resto vazio  | -                      | -                      | automaticamente gerado | Name; Price               | Name must be at least 2 characters.; Price must not be empty and within 10 digits                          |
                  # --- Cenários com preenchimento manual ---
                  | Apenas Nome manual, resto vazio      | Pro                    | -                      | -                      | Price; Date Stocked       | Price must not be empty and within 10 digits; Date must not be empty.                                      |
                  | Apenas Preço manual, resto vazio     | -                      | 19630.56               | -                      | Name; Date Stocked        | Name must be at least 2 characters.; Date must not be empty.                                               |
                  | Apenas Data manual, resto vazio      | -                      | -                      | 2025-07-20             | Name; Price               | Name must be at least 2 characters.; Price must not be empty and within 10 digits                          |
                  | Nome manual, Data vazia              | Produto Manual         | automaticamente gerado | -                      | Date Stocked              | Date must not be empty.                                                                                    |
                  | Preço manual, Nome vazio             | -                      | 99.99                  | automaticamente gerado | Name                      | Name must be at least 2 characters.                                                                        |


                  @UnhappyFlow @Form
                  Esquema do Cenário: Formulário com erros de data - <validacao>
                  Dado que acesso a página "/add-product"
                  Quando preencho o formulário com os dados: nome "<name>", preço "<price>" e data "<date_stocked>"
                  E clico fora do formulário
                  Então uma mensagem de erro é exibida "<mensagem_de_erro>"

                  Exemplos:
                  | validacao       | name                   | price                  | date_stocked | mensagem_de_erro                       |
                  | Data no futuro  | automaticamente gerado | automaticamente gerado | 2052-02-22   | Date must not be in the future.        |
                  | Data no passado | automaticamente gerado | automaticamente gerado | 1000-01-01   | Date must not be older than 100 years. |


                  @HappyFlow @Form
                  Esquema do Cenário: Cancelar o preenchimento do formulário - <validacao>
                  Dado que acesso a página principal
                  E clico no botão "Add a Product"
                  E estamos na página de "Add Product"
                  Quando preencho o formulário com os dados: nome "<name>", preço "<price>" e data "<date_stocked>"
                  E clico no botão "cancel"
                  Então estamos na página de "Products"

                  Exemplos:
                  | validacao                          | name                   | price                  | date_stocked           |
                  | Formulário preenchido              | automaticamente gerado | automaticamente gerado | automaticamente gerado |
                  | Formulário não preenchido          | -                      | -                      | -                      |
                  | Formulário parcialmente preenchido | automaticamente gerado | -                      | automaticamente gerado |
