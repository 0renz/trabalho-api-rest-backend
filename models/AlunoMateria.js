const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AlunoMateria = sequelize.define('AlunoMateria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id'
      }
    },
    materiaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materias',
        key: 'id'
      }
    }
  }, {
    tableName: 'alunos_materias',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    indexes: [
      {
        unique: true,
        fields: ['alunoId', 'materiaId']
      }
    ]
  });

  return AlunoMateria;
};
