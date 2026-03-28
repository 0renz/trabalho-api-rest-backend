const { Aluno } = require('../models');

function buscarTodos() {
  return Aluno.findAll();
}

function buscarPorId(id) {
  return Aluno.findByPk(id);
}

async function inserir(aluno) {
  return await Aluno.create({
    nome: aluno.nome,
    email: aluno.email,
    matricula: aluno.matricula,
  });
}

async function atualizar(id, dadosAtualizados) {
  const aluno = await Aluno.findByPk(id);
  
  if (!aluno) {
    return null;
  }

  return await aluno.update({
    nome: dadosAtualizados.nome,
    email: dadosAtualizados.email,
    matricula: dadosAtualizados.matricula,
  });
}

async function remover(id) {
  const aluno = await Aluno.findByPk(id);
  
  if (!aluno) {
    return null;
  }

  await aluno.destroy();
  return aluno;
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  inserir: inserir,
  atualizar: atualizar,
  remover: remover,
};
