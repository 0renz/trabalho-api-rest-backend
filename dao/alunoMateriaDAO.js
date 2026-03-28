const { Aluno, Materia, AlunoMateria } = require('../models');

function buscarTodos() {
  return AlunoMateria.findAll();
}

function buscarPorAlunoId(alunoId) {
  return AlunoMateria.findAll({
    where: { alunoId: alunoId }
  });
}

function buscarPorMateriaId(materiaId) {
  return AlunoMateria.findAll({
    where: { materiaId: materiaId }
  });
}

async function verificarAssociacao(alunoId, materiaId) {
  return await AlunoMateria.findOne({
    where: {
      alunoId: alunoId,
      materiaId: materiaId
    }
  });
}

async function associar(alunoId, materiaId) {
  // Verifica se já está associado
  const jaAssociado = await verificarAssociacao(alunoId, materiaId);
  if (jaAssociado) {
    return null;
  }

  return await AlunoMateria.create({
    alunoId: alunoId,
    materiaId: materiaId,
  });
}

async function desassociar(alunoId, materiaId) {
  const associacao = await AlunoMateria.findOne({
    where: {
      alunoId: alunoId,
      materiaId: materiaId
    }
  });

  if (!associacao) {
    return null;
  }

  await associacao.destroy();
  return associacao;
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorAlunoId: buscarPorAlunoId,
  buscarPorMateriaId: buscarPorMateriaId,
  verificarAssociacao: verificarAssociacao,
  associar: associar,
  desassociar: desassociar,
};
