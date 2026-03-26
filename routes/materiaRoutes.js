const express = require("express");
const router = express.Router();

const materiaController = require("../controllers/materiaController");

// Rota para cadastrar uma matéria
router.post("/", materiaController.cadastrarMateria);

// Rota para buscar todas as matérias
router.get("/", materiaController.buscarTodasAsMaterias);

// Rota para consultar os alunos matriculados em uma matéria específica
router.get("/:materiaId/alunos", materiaController.consultarAlunosPorMateria);

module.exports = router;