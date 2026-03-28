const express = require("express");
const router = express.Router();

const materiaController = require("../controllers/materiaController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Rota para cadastrar uma matéria (requer autenticação)
router.post("/", authenticateToken, materiaController.cadastrarMateria);

// Rota para buscar todas as matérias (sem autenticação)
router.get("/", materiaController.buscarTodasAsMaterias);

// Rota para consultar os alunos matriculados em uma matéria específica (sem autenticação)
router.get("/:materiaId/alunos", materiaController.consultarAlunosPorMateria);

module.exports = router;