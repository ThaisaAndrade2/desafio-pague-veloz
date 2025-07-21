            # language: pt
            Funcionalidade: Validações de Login

            @HappyFlow @login
            Cenário: Acessar a página inicial com sucesso by path
            Dado que acesso a página "/login"
            E estamos na página de "Login"


            @UnhappyFlow @login
            Esquema do Cenário: Validar erros de login - <validacao>
            Dado que acesso a página principal
            E clico na opção do navegador "Login navBar"
            E estamos na página de "Login"
            Quando preencho os dados de login com: usuário "<username>" e senha "<password>"
            E clico no botão "Login"
            Então uma mensagem de erro é exibida "<mensagem_de_erro>"
            E continuamos na página de login

            Exemplos:
            | validacao                                            | username               | password               | mensagem_de_erro                     |
            # --- Cenários todos os campos vazios ---
            | Todos os campos vazios                               | -                      | -                      | Please enter a username and password |
            # --- Cenários com preenchimento automático ---
            | Todos os campos preenchidos automático               | automaticamente gerado | automaticamente gerado | Invalid username or password         |
            | Apenas usuário preenchido (automático) e senha vazio | automaticamente gerado | -                      | Please enter a username and password |
            | Apenas senha preenchido (automático) e usuário vazio | -                      | automaticamente gerado | Please enter a username and password |
            ### --- Cenários com preenchimento manual ---
            | Todos os campos manuais                              | Teste                  | Teste                  | Invalid username or password         |
            | Apenas senha preenchido (manual) e usuário vazio     | -                      | Teste                  | Please enter a username and password |
            | Apenas usuário preenchido (manual) e senha vazio     | Teste                  | -                      | Please enter a username and password |


