const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Materia = sequelize.define('Materia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nome é obrigatório'
        }
      }
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este código já está cadastrado'
      },
      validate: {
        notEmpty: {
          msg: 'Código é obrigatório'
        }
      }
    }
  }, {
    tableName: 'materias',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
  });

  return Materia;
};
