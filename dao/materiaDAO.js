let materias = [
  { id: 1, nome: "Matemática", codigo: "MAT001"},
  { id: 2, nome: "Física", codigo: "FIS001"},
  { id: 3, nome: "Programação", codigo: "PRG001"},
];

let proximoId = 4;

function buscarTodos() {
  return materias;
}

function buscarPorId(id) {
  return materias.find(function (materia) {
    return materia.id === id;
  });
}

function inserir(materia) {
  const novaMateria = {
    id: proximoId,
    nome: materia.nome,
    codigo: materia.codigo,
  };

  proximoId = proximoId + 1;
  materias.push(novaMateria);

  return novaMateria;
}

function atualizar(id, dadosAtualizados) {
  const indice = materias.findIndex(function (materia) {
    return materia.id === id;
  });

  if (indice === -1) {
    return null;
  }

  materias[indice] = {
    id: id,
    nome: dadosAtualizados.nome,
    codigo: dadosAtualizados.codigo,
  };

  return materias[indice];
}

function remover(id) {
  const indice = materias.findIndex(function (materia) {
    return materia.id === id;
  });

  if (indice === -1) {
    return null;
  }

  const removido = materias.splice(indice, 1);
  return removido[0];
}

function limparTudo() {
  materias = [];
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorId: buscarPorId,
  inserir: inserir,
  atualizar: atualizar,
  remover: remover,
  limparTudo: limparTudo,
};
