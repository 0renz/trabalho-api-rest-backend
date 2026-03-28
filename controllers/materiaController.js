// materiaController.js
const materiaDAO = require("../dao/materiaDAO");
const alunoDAO = require("../dao/alunoDAO");
const alunoMateriaDAO = require("../dao/alunoMateriaDAO");

// Função para cadastrar uma matéria
async function cadastrarMateria(req, res) {
  try {
    const { nome, codigo } = req.body;

    // Validação básica
    if (!nome || !codigo) {
      return res.status(400).json({
        mensagem: "Nome e código são obrigatórios",
      });
    }

    const novaMateria = await materiaDAO.inserir({
      nome: nome,
      codigo: codigo,
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
async function buscarTodasAsMaterias(req, res) {
  try {
    const materias = await materiaDAO.buscarTodos();
    res.status(200).json({
      mensagem: "Matérias encontradas",
      materias: materias,
      quantidade: materias.length,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar matérias",
      erro: error.message,
    });
  }
}

// Consultar alunos por matéria
async function consultarAlunosPorMateria(req, res) {
  try {
    const materiaId = parseInt(req.params.materiaId);

    // Validação: matéria deve existir
    const materia = await materiaDAO.buscarPorId(materiaId);
    if (!materia) {
      return res.status(404).json({
        mensagem: "Matéria não encontrada",
      });
    }

    // Buscar todas as associações para essa matéria
    const associacoes = await alunoMateriaDAO.buscarPorMateriaId(materiaId);

    // Montar lista de alunos
    const alunos = await Promise.all(
      associacoes.map(function (assoc) {
        return alunoDAO.buscarPorId(assoc.alunoId);
      })
    );

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
  cadastrarMateria: cadastrarMateria,
  buscarTodasAsMaterias: buscarTodasAsMaterias,
  consultarAlunosPorMateria: consultarAlunosPorMateria,
};