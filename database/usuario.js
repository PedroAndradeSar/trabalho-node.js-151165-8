const prisma = require('./prisma');

const criarUsuario = (usuario) => {
    return prisma.usuario.create({
        data: {
            email: usuario.email,
            nome: usuario.nome,
            senha: usuario.senha,
        },
    });
};

const encontrarPorEmail = (email) => {
    return prisma.usuario.findUnique({
        where: {
            email,
        },
    });
};

const encontrarPorId = (id) => {
    return prisma.usuario.findUnique({
        select: {
            id: true,
            email: true,
            nome: true,
            senha: false,
        },
        where: {
            id,
        },
    });
};

module.exports = {
    criarUsuario,
    encontrarPorEmail,
    encontrarPorId,
};
