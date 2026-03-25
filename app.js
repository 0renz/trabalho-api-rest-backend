// app.js — Ponto de entrada da aplicação. Configuração e montagem.

const express = require("express");
const app = express();

// Importação das rotas organizadas por recurso
const coisaRoutes = require("./routes/coisaRoutes");

// Importação do middleware centralizado de erros
const errorHandler = require("./middlewares/errorHandler");

// =============================================
// Configuração de Middlewares Globais
// =============================================
app.use(express.json());

// =============================================
// Montagem das Rotas
// =============================================
app.use("/alguma-coisa", coisaRoutes);

// =============================================
// Middleware de Tratamento Centralizado de Erros
// =============================================
app.use(errorHandler);

// =============================================
// Inicialização do Servidor
// =============================================
const PORTA = 3000;

app.listen(PORTA, function () {
  console.log("API rodando em http://localhost:" + PORTA);
});
