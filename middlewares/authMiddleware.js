const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "sua_chave_secreta_aqui";

// Middleware para verificar autenticação JWT
function authenticateToken(req, res, next) {
  // Extrair o token do header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      mensagem: "Token de autenticação não fornecido",
    });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Adicionar informações do usuário ao request
    next();
  } catch (erro) {
    return res.status(403).json({
      mensagem: "Token inválido ou expirado",
      erro: erro.message,
    });
  }
}

// Função para gerar token JWT
function gerarToken(usuario) {
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    SECRET_KEY,
    { expiresIn: "24h" } // Token expira em 24 horas
  );
  return token;
}

module.exports = {
  authenticateToken,
  gerarToken,
};
