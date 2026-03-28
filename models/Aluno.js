const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Aluno = sequelize.define('Aluno', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este email já está cadastrado'
      },
      validate: {
        isEmail: {
          msg: 'Email inválido'
        }
      }
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Esta matrícula já está cadastrada'
      },
      validate: {
        notEmpty: {
          msg: 'Matrícula é obrigatória'
        }
      }
    }
  }, {
    tableName: 'alunos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
  });

  return Aluno;
};
