# language: pt
Funcionalidade: Validações de busca de produto

@HappyFlow @buscar_produto
Cenário: Consultar produto existente
Dado que acesso a página principal
Quando estamos na página de "Products"
E  o campo de busca é preenchido com um produto "existente"
E clico no botão "Filter"
Então o produto deve ser encontrado


@UnhappyFlow @buscar_produto
Cenário: Consultar produto inexistente
Dado que acesso a página principal
Quando estamos na página de "Products"
E o campo de busca é preenchido com um produto "inexistente"
E clico no botão "Filter"
Então o produto não deve ser encontrado


@HappyFlow @buscar_produto
Cenário: Visualizar mais produtos
Dado que acesso a página principal
Quando estamos na página de "Products"
E clico no botão "Show More"
Então novos itens são exibidos e o botão "Show More" desaparece

@HappyFlow @buscar_produto
Cenário: Limpar campo de busca - Depois de pesquisa-lo - Produto existente
Dado que acesso a página principal
E estamos na página de "Products"
E  o campo de busca é preenchido com um produto "existente"
E o campo de busca deve exibir o valor do produto
E clico no botão "Filter"
E o produto deve ser encontrado
Quando clico no botão "Reset"
Então o campo de busca deve ser limpo


@HappyFlow @buscar_produto
Cenário: Limpar campo de busca - Antes de pesquisa-lo - Produto inexistente
Dado que acesso a página principal
E estamos na página de "Products"
E  o campo de busca é preenchido com um produto "inexistente"
E o campo de busca deve exibir o valor do produto
Quando clico no botão "Reset"
Então o campo de busca deve ser limpo