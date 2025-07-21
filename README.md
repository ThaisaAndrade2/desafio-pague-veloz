
# 🚀 Automação de Testes - API e UI (Desafios PagueVeloz)

Este repositório reúne dois projetos de automação de testes feitos para o processo seletivo da PagueVeloz:  
- **Desafio 01:** Testes automatizados da API JSONPlaceholder  
- **Desafio 02:** Testes automatizados de UI no site Commit Quality

---

## 📖 Visão Geral

Cada desafio está organizado em sua própria pasta para facilitar a manutenção e execução dos testes:

- `desafio-01-api` — Contém a suíte de testes de API com Cypress focada em validar endpoints, estrutura de dados, status e performance.  
- `desafio-02-frontend` — Contém a suíte de testes de interface do usuário (UI) usando Cypress com Cucumber, validando fluxos, formulários e interações no site Commit Quality.

Para rodar os testes corretamente, é importante entrar na pasta específica do desafio desejado e seguir os passos de instalação e execução para aquele projeto.

---

## 💻 Tecnologias e Padrões Utilizados

Ambos os projetos foram desenvolvidos com foco em qualidade e boas práticas de automação, utilizando:

- **Cypress:** Framework principal para automação dos testes (API e UI)  
- **Faker.js:** Para geração de dados dinâmicos e realistas durante os testes  
- **Chai JSON Schema:** Validação dos contratos das respostas de API (apenas no desafio API)  
- **Cypress Cucumber Preprocessor:** (apenas no desafio UI) Para escrever testes em BDD com Gherkin  
- **Factories:** Organização e reaproveitamento de dados de teste  
- **Comandos customizados do Cypress:** Abstração e reutilização de ações comuns para tornar os testes mais legíveis e fáceis de manter  
- **Variáveis de ambiente:** Configurações específicas para cada projeto via `cypress.config.js`

---

## 🚦 Pré-requisitos Gerais

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (v18.x ou superior)  
- npm (v9.x ou superior, geralmente vem com o Node.js)  
- Git (para clonar este repositório)

---

## ⚙️ Como Rodar os Testes

### 1. Testes de API (Desafio 01)

```bash
cd desafio-01-api
npm install
npm run test:api       # Executa os testes em modo headless
npm run cy:open        # Abre o Cypress em modo interativo
```

### 2. Testes de UI (Desafio 02)

```bash
cd desafio-02-frontend
npm install
npm run cy:run         # Executa todos os testes em modo headless
npm run cy:open        # Abre o Cypress em modo interativo
```

No desafio UI, você também pode rodar testes filtrando por tags, como:

```bash
npm run cy:run:happy    # Apenas cenários com a tag @HappyFlow
npm run cy:run:unhappy  # Apenas cenários com a tag @UnhappyFlow
```

---

## 📂 Estrutura do Repositório

```
/desafio-pague-veloz
 ┣ 📂 desafio-01-api
 ┃ ┗ (arquivos e pastas do projeto de testes de API)
 ┣ 📂 desafio-02-frontend
 ┃ ┗ (arquivos e pastas do projeto de testes de UI)
 ┗ (arquivos gerais do repositório, como README.md)
```

---

## 🙋 Contato

📬 [Conecte-se comigo no LinkedIn](https://www.linkedin.com/in/thaisa-andrade/)

---

## ✨ Contribuições

Encontrou algum problema ou quer sugerir melhorias?  
Abra uma issue ou envie um pull request.

Contribuições são sempre bem-vindas e ajudam o projeto a crescer!

---

Se precisar de qualquer ajuda, estou aqui para ajudar! 😊
