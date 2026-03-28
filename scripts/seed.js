/**
 * Script para popular o banco de dados com dados iniciais
 * Uso: node scripts/seed.js
 */

const { Aluno, Materia, AlunoMateria, sequelize } = require('../models');

async function seed() {
  try {
    console.log(' Iniciando seed do banco de dados...');

    // Sincronizar banco de dados
    await sequelize.sync({ alter: false });
    console.log(' Banco de dados sincronizado');

    // Criar alunos
    const alunos = await Aluno.bulkCreate([
      {
        nome: 'João Silva',
        email: 'joao@email.com',
        matricula: '2024001'
      },
      {
        nome: 'Maria Santos',
        email: 'maria@email.com',
        matricula: '2024002'
      },
      {
        nome: 'Pedro Costa',
        email: 'pedro@email.com',
        matricula: '2024003'
      }
    ], { ignoreDuplicates: true });

    console.log(` ${alunos.length} alunos criados`);

    // Criar matérias
    const materias = await Materia.bulkCreate([
      {
        nome: 'Matemática',
        codigo: 'MAT001'
      },
      {
        nome: 'Física',
        codigo: 'FIS001'
      },
      {
        nome: 'Programação',
        codigo: 'PRG001'
      }
    ], { ignoreDuplicates: true });

    console.log(` ${materias.length} matérias criadas`);

    // Criar associações
    const alunosData = await Aluno.findAll();
    const materiasData = await Materia.findAll();

    if (alunosData.length > 0 && materiasData.length > 0) {
      const associacoes = await AlunoMateria.bulkCreate([
        { alunoId: alunosData[0].id, materiaId: materiasData[0].id },
        { alunoId: alunosData[0].id, materiaId: materiasData[1].id },
        { alunoId: alunosData[1].id, materiaId: materiasData[0].id },
        { alunoId: alunosData[1].id, materiaId: materiasData[2].id },
        { alunoId: alunosData[2].id, materiaId: materiasData[1].id }
      ], { ignoreDuplicates: true });

      console.log(` ${associacoes.length} associações criadas`);
    }

    console.log('\n Seed concluído com sucesso!');
    process.exit(0);

  } catch (error) {
    console.error(' Erro durante o seed:', error);
    process.exit(1);
  }
}

seed();
