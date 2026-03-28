const { Materia } = require('../models');

function buscarTodos() {
  return Materia.findAll();
}

function buscarPorId(id) {
  return Materia.findByPk(id);
}

async function inserir(materia) {
  return await Materia.create({
    nome: materia.nome,
    codigo: materia.codigo,
  });
}

async function atualizar(id, dadosAtualizados) {
  const materia = await Materia.findByPk(id);
  
  if (!materia) {
    return null;
  }

  return await materia.update({
    nome: dadosAtualizados.nome,
    codigo: dadosAtualizados.codigo,
  });
}

async function remover(id) {
  const materia = await Materia.findByPk(id);
  
  if (!materia) {
    return null;
  }

  await materia.destroy();
  return materia;
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  inserir: inserir,
  atualizar: atualizar,
  remover: remover,
};
