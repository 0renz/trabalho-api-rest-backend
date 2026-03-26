let alunos = [
  { id: 1, nome: "João Silva", email: "joao@email.com", matricula: "2024001" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", matricula: "2024002" },
  { id: 3, nome: "Pedro Costa", email: "pedro@email.com", matricula: "2024003" },
];

let proximoId = 4;

function buscarTodos() {
  return alunos;
}

function buscarPorId(id) {
  return alunos.find(function (aluno) {
    return aluno.id === id;
  });
}

function inserir(aluno) {
  const novoAluno = {
    id: proximoId,
    nome: aluno.nome,
    email: aluno.email,
    matricula: aluno.matricula,
  };

  proximoId = proximoId + 1;
  alunos.push(novoAluno);

  return novoAluno;
}

function atualizar(id, dadosAtualizados) {
  const indice = alunos.findIndex(function (aluno) {
    return aluno.id === id;
  });

  if (indice === -1) {
    return null;
  }

  alunos[indice] = {
    id: id,
    nome: dadosAtualizados.nome,
    email: dadosAtualizados.email,
    matricula: dadosAtualizados.matricula,
  };

  return alunos[indice];
}

function remover(id) {
  const indice = alunos.findIndex(function (aluno) {
    return aluno.id === id;
  });

  if (indice === -1) {
    return null;
  }

  const removido = alunos.splice(indice, 1);
  return removido[0];
}

function limparTudo() {
  alunos = [];
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  inserir: inserir,
  atualizar: atualizar,
  remover: remover,
  limparTudo: limparTudo,
};
