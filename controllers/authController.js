const { gerarToken } = require("../middlewares/authMiddleware");

// Função para login e gerar token JWT
// aceita qualquer usuário com nome e senha
async function login(req, res) {
  try {
    const { nome, senha } = req.body;

    // Validação básica
    if (!nome || !senha) {
      return res.status(400).json({
        mensagem: "Nome e senha são obrigatórios",
      });
    }

    // Para fins de demonstração, vamos criar um usuário simples
    // Em produção, você verificaria no banco de dados
    const usuario = {
      id: 1,
      nome: nome,
    };

    // Gerar token JWT
    const token = gerarToken(usuario);

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token: token,
      usuario: usuario,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao realizar login",
      erro: erro.message,
    });
  }
}

module.exports = {
  login,
};
