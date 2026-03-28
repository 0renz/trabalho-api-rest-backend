// Contexto: API REST de cadastro de alunos e matérias

/* Definição: Em uma faculdade, é necessário cadastrar os alunos e associá-los às suas matérias, que também são cadastradas manualmente.
Um aluno pode estar matriculado em várias matérias, e uma matéria pode ter vários alunos matriculados. 
A API deve permitir o cadastro de alunos, matérias e a associação entre eles. 
Além disso, deve ser possível consultar os alunos matriculados em uma matéria específica e as matérias em que um aluno está matriculado.
*/

const express = require("express");
const { sequelize } = require("./models");

const app = express();

// Importação das rotas
const alunoRoutes = require("./routes/alunoRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const authRoutes = require("./routes/authRoutes");

// Handler de erros
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/alunos", alunoRoutes);
app.use("/materias", materiaRoutes);
app.use(errorHandler);

// Escrita da documentação OpenAPI (Swagger) da API, disponível em endpoint acessível (ex.: /api-docs ).
app.use("/api-docs", express.static("docs"));

// Sincroniza os modelos com o banco de dados e inicia o servidor
const PORTA = 3000;

// Sincroniza o banco de dados
sequelize.sync({ alter: false }).then(() => {
  console.log("Banco de dados sincronizado!");
  
  app.listen(PORTA, function () {
    console.log("API rodando em http://localhost:" + PORTA);
  });
}).catch(erro => {
  console.error("Erro ao sincronizar banco de dados:", erro);
  process.exit(1);
});
