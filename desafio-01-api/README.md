
# 🚀 Projeto de Automação de Testes de API com Cypress

![Cypress](https://img.shields.io/badge/Cypress-v13.13.0-blue?style=for-the-badge&logo=cypress&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

Este repositório contém a suíte de testes automatizados para a API **[json placeholder|https://jsonplaceholder.typicode.com]**, desenvolvida com foco em **qualidade, estabilidade e performance dos endpoints**.

---

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [💻 Tecnologias e Padrões](#-tecnologias-e-padrões)
- [🚦 Pré-requisitos](#-pré-requisitos)
- [⚙️ Instalação](#️-instalação)
- [🛠️ Configuração do Ambiente](#-configuração-do-ambiente)
- [🏃 Execução dos Testes](#-execução-dos-testes)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🙋 Autor](#-autor)
- [✨ Contribuições](#-contribuições)

---

## ## 📖 Sobre o Projeto

Oiêe, meu nome é Thaisa Andrade! ✨

Esse projeto é o desafio 01 do processo seletivo para QA na PagueVeloz. A ideia aqui foi automatizar testes na API [JSONPlaceholder](https://jsonplaceholder.typicode.com), que é bastante usada para estudos e validações de testes de API.

O foco principal foi **validar os retornos dos endpoints** em termos de estrutura dos dados, status code e tempo de resposta, garantindo que tudo esteja funcionando certinho e dentro do esperado.

A suíte inclui também validações de performance e estrutura, deixando o projeto mais confiável e pronto para produção.

É isso! Espero que o projeto atenda a todos os requisitos e que vocês curtam tanto quanto eu curti desenvolver esse projeto 💛

---

## 💻 Tecnologias e Padrões

Este projeto foi desenvolvido utilizando **boas práticas de automação de testes** e tecnologias modernas:

- 🧪 **[Cypress](https://www.cypress.io/):** Framework principal para automação de testes de API
- 🎭 **[Faker.js](https://fakerjs.dev/):** Geração de dados dinâmicos e massivos para evitar dados fixos e melhorar a cobertura
- 🔒 **[Chai JSON Schema](https://www.chaijs.com/plugins/chai-json-schema/):** Validação de contrato das respostas, garantindo a consistência do schema
- 🏭 **Factories:** Implementação do padrão *Factory* para organização e manutenção dos dados de teste
- 🤹 **Comandos Customizados do Cypress:** Requisições complexas e reutilizáveis abstraídas para maior legibilidade
- 🌎 **Variáveis de Ambiente:** Configurações sensíveis e específicas por ambiente gerenciadas via `cypress.config.js`, permitindo flexibilidade e segurança

---

## 🚦 Pré-requisitos

Certifique-se de ter instalado em seu ambiente:

✅ **Node.js** v18.x ou superior ([nodejs.org](https://nodejs.org/en/))  
✅ **npm** v9.x ou superior (vem junto com o Node.js)  
✅ **Git** (para clonar o repositório)

---

## ⚙️ Instalação

1. Clone este repositório:

```bash
git clone https://github.com/ThaisaAndrade2/desafio-pague-veloz
```

2. Navegue até a pasta do projeto:

```bash
cd seu repositorio
```

3. Instale as dependências:

```bash
npm install
```

---

## 🛠️ Configuração do Ambiente

As configurações específicas ficam no `cypress.config.js`:

```javascript
module.exports = {
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    env: {
      responseTimeLimit: 500 // Limite de tempo em ms
    }
  }
}
```

---

## 🏃 Execução dos Testes

Para rodar os testes em modo headless:

```bash
npx cypress run
```

Para abrir a interface do Cypress e acompanhar os testes em tempo real:

```bash
npx cypress open
```

---

## 📂 Estrutura do Projeto

```
📁 cypress
┣ 📁 downloads
┣ 📁 e2e
┃ ┣ 📁 api
┃ ┃ ┣ 📄 api.cy.js # Arquivo de teste da API
┣ 📁 fixtures
┃ ┣ 📁 schemas
┃ ┃ ┣ 📄 post_schema.json # Schema de validação do POST
┃ ┣ 📄 example.json
┣ 📁 support
┃ ┣ 📁 factories
┃ ┃ ┣ 📄 factory.js # Funções para geração de dados dinâmicos
┃ ┣ 📄 commands.js # Comandos customizados do Cypress
┃ ┣ 📄 e2e.js
┣ 📁 node_modules
┣ 📄 .gitignore
┣ 📄 cypress.config.js # Configurações do Cypress
┣ 📄 package-lock.json
┣ 📄 package.json # Dependências e scripts
┣ 📄 README.md # Documentação do projeto
```

---

## 🙋 Sobre mim

Esse projeto foi desenvolvido por mim **[Thaisa Andrade]**, para um processo seletivo (Mandem energias positivas, estou bem animada💃🏽🎉)

💼 Profissional de Qualidade de Software
📬 Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/thaisa-andrade/)

---

## ✨ Contribuições

Contribuições são sempre bem-vindas!

Caso veja algo em que eu possa melhorar abra uma issue ou envie um pull request com sugestões, melhorias ou correções.

---
