const sequelize = require('../config/database');
const AlunoModel = require('./Aluno');
const MateriaModel = require('./Materia');
const AlunoMateriaModel = require('./AlunoMateria');

// Instanciar os modelos
const Aluno = AlunoModel(sequelize);
const Materia = MateriaModel(sequelize);
const AlunoMateria = AlunoMateriaModel(sequelize);

// Definir os relacionamentos
Aluno.belongsToMany(Materia, {
  through: AlunoMateria,
  foreignKey: 'alunoId',
  otherKey: 'materiaId',
  as: 'materias'
});

Materia.belongsToMany(Aluno, {
  through: AlunoMateria,
  foreignKey: 'materiaId',
  otherKey: 'alunoId',
  as: 'alunos'
});

module.exports = {
  sequelize,
  Aluno,
  Materia,
  AlunoMateria
};
