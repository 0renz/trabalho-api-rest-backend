const express = require("express");
const router = express.Router();

const alunoController = require("../controllers/alunoController");

// Rota para cadastrar um aluno
router.post("/", alunoController.cadastrarAluno);

// Rota para associar um aluno a uma matéria
router.post("/:alunoId/materias/:materiaId", alunoController.associarAlunoMateria);

// Rota para consultar as matérias em que um aluno está matriculado
router.get("/:alunoId/materias", alunoController.consultarMateriasPorAluno);

// Rota para buscar todos os alunos
router.get("/", alunoController.buscarTodosOsAlunos);


module.exports = router;
