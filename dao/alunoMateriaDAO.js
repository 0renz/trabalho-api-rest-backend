let alunosMaterias = [
  { id: 1, alunoId: 1, materiaId: 1 },
  { id: 2, alunoId: 1, materiaId: 2 },
  { id: 3, alunoId: 2, materiaId: 1 },
  { id: 4, alunoId: 2, materiaId: 3 },
  { id: 5, alunoId: 3, materiaId: 2 },
];

let proximoId = 6;

function buscarTodos() {
  return alunosMaterias;
}

function buscarPorAlunoId(alunoId) {
  return alunosMaterias.filter(function (am) {
    return am.alunoId === alunoId;
  });
}

function buscarPorMateriaId(materiaId) {
  return alunosMaterias.filter(function (am) {
    return am.materiaId === materiaId;
  });
}

function verificarAssociacao(alunoId, materiaId) {
  return alunosMaterias.find(function (am) {
    return am.alunoId === alunoId && am.materiaId === materiaId;
  });
}

function associar(alunoId, materiaId) {
  // Verifica se já está associado
  if (verificarAssociacao(alunoId, materiaId)) {
    return null;
  }

  const novaAssociacao = {
    id: proximoId,
    alunoId: alunoId,
    materiaId: materiaId,
  };

  proximoId = proximoId + 1;
  alunosMaterias.push(novaAssociacao);

  return novaAssociacao;
}

function desassociar(alunoId, materiaId) {
  const indice = alunosMaterias.findIndex(function (am) {
    return am.alunoId === alunoId && am.materiaId === materiaId;
  });

  if (indice === -1) {
    return null;
  }

  const removida = alunosMaterias.splice(indice, 1);
  return removida[0];
}

function limparTudo() {
  alunosMaterias = [];
}

module.exports = {
  buscarTodos: buscarTodos,
  buscarPorAlunoId: buscarPorAlunoId,
  buscarPorMateriaId: buscarPorMateriaId,
  verificarAssociacao: verificarAssociacao,
  associar: associar,
  desassociar: desassociar,
  limparTudo: limparTudo,
};
