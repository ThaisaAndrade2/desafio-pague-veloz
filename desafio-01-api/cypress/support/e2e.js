// Importando o plugin de JSON Schema para validação de schemas JSON
chai.use(require('chai-json-schema'));

// Importando o comando customizado para criar dados do body da requisição
import './commands'