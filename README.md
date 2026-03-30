# API de Gerenciamento de Alunos e Matérias

## 📚 Descrição do Domínio/Cenário

Esta API REST foi desenvolvida para resolver o problema de **gestão acadêmica em instituições de ensino superior**. O cenário escolhido contempla:

### Contexto
Em uma faculdade, há a necessidade de:
- **Cadastrar alunos** com seus dados pessoais e informações de matrícula
- **Gerenciar matérias** oferecidas pela instituição
- **Associar alunos às matérias** em que estão matriculados
- **Consultar relacionamentos** entre alunos e matérias

Um aluno pode estar matriculado em **várias matérias** e uma matéria pode ter **vários alunos**. A API fornece endpoints para:
- Criar e listar alunos e matérias
- Matricular alunos em matérias
- Consultar matérias de um aluno específico
- Consultar alunos matriculados em uma matéria específica



### Relacionamento Many-to-Many
A tabela `AlunoMateria` (join table) foi criada para representar a relação N:N:
```
Alunos (1) ─────────── (N) AlunoMateria (N) ─────────── (1) Materias
```



## ⚙️ Instalação e Execução Local

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 12 ou superior)

### Passo 1: Clonar o Repositório
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd trabalho-api-rest-backend
```

### Passo 2: Instalar Dependências
```bash
npm install
```

Dependências principais:
- `express` - Framework web
- `sequelize` - ORM para banco de dados
- `pg` e `pg-hstore` - Driver PostgreSQL
- `jsonwebtoken` - Autenticação JWT
- `dotenv` - Gerenciamento de variáveis de ambiente

### Passo 3: Configurar o Banco de Dados

#### Criar banco de dados PostgreSQL
```bash
# Acesse o psql (PostgreSQL CLI)
psql -U postgres

# Dentro do psql, execute:
CREATE DATABASE api_faculdade;
\q
```

#### Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```bash
# Arquivo: .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=api_faculdade
```

Isso inserirá alunos e matérias de exemplo para testes.


## 🚀 Comandos para Execução Local

 `npm install` | Instala todas as dependências do projeto 
 `npm start` | Inicia o servidor em http://localhost:3000 
 `npm run seed` | Popula o banco com dados iniciais 

### Exemplo de Fluxo Completo
```bash
# 1. Instalar dependências
npm install && npm start

# 2. Em outro terminal, executar seed (opcional)
npm run seed

# 3. Acessar a API
curl http://localhost:3000/alunos

# 4. Acessar documentação Swagger
# Abra no navegador: http://localhost:3000/api-docs
```



## 📋 Tabela de Rotas da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Realizar login |
| POST | `/auth/register` | Registrar novo usuário |

### Alunos
| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| **POST** | `/alunos` | Cadastrar novo aluno | 201 |
| **GET** | `/alunos` | Listar todos os alunos | 200 |
| **GET** | `/alunos/{alunoId}/materias` | Listar matérias de um aluno | 200 |
| **POST** | `/alunos/{alunoId}/materias/{materiaId}` | Matricular aluno em matéria | 201 |

### Matérias
| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| **POST** | `/materias` | Cadastrar nova matéria | 201 |
| **GET** | `/materias` | Listar todas as matérias | 200 |
| **GET** | `/materias/{materiaId}/alunos` | Listar alunos de uma matéria | 200 |

---

## 🗂️ Estrutura de Diretórios

```
trabalho-api-rest/
├── app.js                    # Arquivo principal da aplicação
├── package.json              # Dependências e scripts
├── .env                      # Variáveis de ambiente
├── README.md                 # Este arquivo
│
├── config/
│   └── database.js           # Configuração do Sequelize e PostgreSQL
│
├── models/
│   ├── index.js             # Inicialização dos modelos
│   ├── Aluno.js             # Modelo de Aluno
│   ├── Materia.js           # Modelo de Matéria
│   └── AlunoMateria.js      # Modelo de Associação (Join Table)
│
├── controllers/
│   ├── alunoController.js    # Lógica de negócio para Alunos
│   ├── materiaController.js  # Lógica de negócio para Matérias
│   └── authController.js     # Lógica de autenticação
│
├── dao/
│   ├── alunoDAO.js          # Data Access Object para Alunos
│   ├── materiaDAO.js        # Data Access Object para Matérias
│   └── alunoMateriaDAO.js   # Data Access Object para Associações
│
├── routes/
│   ├── alunoRoutes.js       # Rotas de Alunos
│   ├── materiaRoutes.js     # Rotas de Matérias
│   └── authRoutes.js        # Rotas de Autenticação
│
├── middlewares/
│   ├── authMiddleware.js    # Middleware de autenticação JWT
│   └── errorHandler.js      # Tratamento de erros
│
├── scripts/
│   └── seed.js              # Script para popular banco com dados iniciais
│
└── docs/
    ├── swagger.json         # Documentação OpenAPI/Swagger
    └── index.html           # Visualizador Swagger
```

---

## 📊 Modelo de Dados

### Tabela: Alunos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | INTEGER | Identificador único (PK) |
| `nome` | VARCHAR(255) | Nome do aluno |
| `email` | VARCHAR(255) | Email do aluno |
| `matricula` | VARCHAR(50) | Número de matrícula (único) |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data de atualização |

### Tabela: Materias
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | INTEGER | Identificador único (PK) |
| `nome` | VARCHAR(255) | Nome da matéria |
| `codigo` | VARCHAR(50) | Código da matéria |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data de atualização |

### Tabela: AlunoMaterias (Join Table)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | INTEGER | Identificador único (PK) |
| `alunoId` | INTEGER | Referência a Alunos (FK) |
| `materiaId` | INTEGER | Referência a Materias (FK) |
| `createdAt` | TIMESTAMP | Data de associação |
| `updatedAt` | TIMESTAMP | Data de atualização |

---

## 🔒 Segurança

### Autenticação JWT
A API utiliza **JSON Web Tokens** para autenticação. Headers:
```bash
Authorization: Bearer <seu_token_aqui>
```
---

## 🛠️ Configuração do Ambiente

### Variáveis de Ambiente (.env)
```bash
# Banco de Dados PostgreSQL
DB_HOST=localhost         # Host do servidor PostreSQL
DB_PORT=5432             # Porta padrão do PostgreSQL
DB_USER=postgres         # Usuário do PostgreSQL
DB_PASSWORD=1234         # Senha do PostgreSQL
DB_NAME=api_faculdade    # Nome do banco de dados
```

---

## 📖 Documentação da API

A documentação interativa da API está disponível em:
```
http://localhost:3000/api-docs
```
Acesse esta URL em um navegador web para explorar todos os endpoints com a interface **Swagger UI**.

---
## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Ver arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨 Autor
**Lorenzo Costa Schauenberg**
