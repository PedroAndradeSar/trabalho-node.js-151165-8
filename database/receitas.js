const prisma = require("./prisma");

const criarReceita = (receita, idUsuario) => {
  return prisma.receitas.create({
    data: {
      nome: receita.nome,
      descricao: receita.descricao,
      tempPreparo: receita.tempPreparo,
      usuario: {
        connect: { id: idUsuario },
      },
    },
  });
};

const atualizarReceita = async (id, receita) => {


  return prisma.receitas.update({
    where: {
      id,
    },
    data: {
      nome: receita.nome,
      descricao: receita.descricao,
      tempPreparo: receita.tempPreparo,
    },
  });
};

const deletarReceita = async (id) => {
  return prisma.receitas.delete({
    where: {
      id : id
    },
  });
};

const localizarPorId = (id, receitaId ) => 
prisma.receitas.findFirst({
    select:{
        usuario: true,
        nome: true,
        descricao: true,
        id: true,
        tempPreparo: true,
    },
    where:{
        idUser: id,
        id: receitaId,
    }
})



const visualizacaoPorId = (usuarioId) => {
  return prisma.receitas.findMany({
    select: {
      usuario: true,
      nome: true,
      descricao: true,
      id: true,
      tempPreparo: true,
      
    },
    where: { idUser: usuarioId },
  });
};

module.exports = {
    "id": 1,
  criarReceita,
  atualizarReceita,
  deletarReceita,
  visualizacaoPorId,
  localizarPorId
};
