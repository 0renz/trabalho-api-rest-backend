const alunoDAO = require("../dao/alunoDAO");
const materiaDAO = require("../dao/materiaDAO");
const alunoMateriaDAO = require("../dao/alunoMateriaDAO");

async function cadastrarAluno(req, res) {
  try {
    const { nome, email, matricula } = req.body;

    // Validação básica
    if (!nome || !email || !matricula) {
      return res.status(400).json({
        mensagem: "Nome, email e matrícula são obrigatórios",
      });
    }

    const novoAluno = await alunoDAO.inserir({
      nome: nome,
      email: email,
      matricula: matricula,
    });

    res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso",
      aluno: novoAluno,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar aluno",
      erro: erro.message,
    });
  }
}


async function associarAlunoMateria(req, res) {
  try {
    const alunoId = parseInt(req.params.alunoId);
    const materiaId = parseInt(req.params.materiaId);

    // Validação: aluno deve existir
    const aluno = await alunoDAO.buscarPorId(alunoId);
    if (!aluno) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    // Validação: matéria deve existir
    const materia = await materiaDAO.buscarPorId(materiaId);
    if (!materia) {
      return res.status(404).json({
        mensagem: "Matéria não encontrada",
      });
    }

    // Verifica se já está associado
    const jaAssociado = await alunoMateriaDAO.verificarAssociacao(
      alunoId,
      materiaId
    );
    if (jaAssociado) {
      return res.status(400).json({
        mensagem: "O aluno já está matriculado nesta matéria",
      });
    }

    // Realizar a associação
    const associacao = await alunoMateriaDAO.associar(alunoId, materiaId);

    res.status(201).json({
      mensagem: "Aluno associado à matéria com sucesso",
      associacao: associacao,
      aluno: aluno,
      materia: materia,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao associar aluno à matéria",
      erro: erro.message,
    });
  }
}

async function consultarMateriasPorAluno(req, res) {
  try {
    const alunoId = parseInt(req.params.alunoId);

    // Validação: aluno deve existir
    const aluno = await alunoDAO.buscarPorId(alunoId);
    if (!aluno) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    // Buscar todas as associações para esse aluno
    const associacoes = await alunoMateriaDAO.buscarPorAlunoId(alunoId);

    // Montar lista de matérias
    const materias = await Promise.all(
      associacoes.map(function (assoc) {
        return materiaDAO.buscarPorId(assoc.materiaId);
      })
    );

    res.status(200).json({
      mensagem: "Matérias encontradas",
      aluno: aluno,
      materias: materias,
      quantidade: materias.length,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao consultar matérias por aluno",
      erro: erro.message,
    });
  }
}

async function buscarTodosOsAlunos(req, res) {
  try {
    const alunos = await alunoDAO.buscarTodos();
    res.status(200).json({
      mensagem: "Alunos encontrados",
      alunos: alunos,
      quantidade: alunos.length,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar alunos",
      erro: erro.message,
    });
  }
}

module.exports = {
  cadastrarAluno: cadastrarAluno,
  associarAlunoMateria: associarAlunoMateria,
  consultarMateriasPorAluno: consultarMateriasPorAluno,
  buscarTodosOsAlunos: buscarTodosOsAlunos,
};
