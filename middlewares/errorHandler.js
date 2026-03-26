// tratamento de erros

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    mensagem: "Ocorreu um erro no servidor",
    erro: err.message,
  });
}

module.exports = errorHandler;
