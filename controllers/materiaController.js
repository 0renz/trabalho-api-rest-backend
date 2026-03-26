// materiaController.js
const materiaDAO = require("../dao/materiaDAO");
const alunoDAO = require("../dao/alunoDAO");
const alunoMateriaDAO = require("../dao/alunoMateriaDAO");

// Função para cadastrar uma matéria

function cadastrarMateria(req, res) {
  try {
    const { nome, descricao} = req.body;

    // Validação básica
    if (!nome || !descricao) {
      return res.status(400).json({
        mensagem: "Nome e descrição são obrigatórios",
      });
    }

    const novaMateria = materiaDAO.inserir({
      nome: nome,
      descricao: descricao,
    });

    res.status(201).json({
      mensagem: "Matéria cadastrada com sucesso",
      materia: novaMateria,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar matéria",
      erro: erro.message,
    });
  }
}

// Função para buscar todas as matérias
const buscarTodasAsMaterias = async (req, res) => {
  try {
    const materias = await materiaDAO.buscarTodos();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar matérias", error: error.message });
  }
};

// Consultar alunos por matéria
function consultarAlunosPorMateria(req, res) {
  try {
    const materiaId = parseInt(req.params.materiaId);

    // Validação: matéria deve existir
    const materia = materiaDAO.buscarPorId(materiaId);
    if (!materia) {
      return res.status(404).json({
        mensagem: "Matéria não encontrada",
      });
    }

    // Buscar todas as associações para essa matéria
    const associacoes = alunoMateriaDAO.buscarPorMateriaId(materiaId);

    // Montar lista de alunos
    const alunos = associacoes.map(function (assoc) {
      return alunoDAO.buscarPorId(assoc.alunoId);
    });

    res.status(200).json({
      mensagem: "Alunos encontrados",
      materia: materia,
      alunos: alunos,
      quantidade: alunos.length,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao consultar alunos por matéria",
      erro: erro.message,
    });
  }
}

module.exports = {
  cadastrarMateria,
  buscarTodasAsMaterias,
  consultarAlunosPorMateria
};