const express = require('express');
const {
    criarUsuario,
    encontrarPorEmail,
    encontrarPorId
} = require('../database/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');
const router = express.Router();

const informacoesUsuarioValidas = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
});

const informacoesLoginValidas = z.object({
    email: z.string().email(),
    senha: z.string(),
});

router.post('/registrar', async (req, res) => {
    try {
        const usuario = informacoesUsuarioValidas.parse(req.body);
        const emailJaUtilizado = await encontrarPorEmail(usuario.email);
        if (emailJaUtilizado) {
            return res.status(400).json({ mensagem: 'Email já está em uso' });
        }
        const senhaCriptografada = bcrypt.hashSync(usuario.senha, 10);
        usuario.senha = senhaCriptografada;
        const usuarioCriado = await criarUsuario(usuario);
        delete usuarioCriado.senha;
        res.status(201).json({
            usuario: usuarioCriado,
        });
    } catch (erro) {
        if (erro instanceof z.ZodError) {
            return res.status(422).json({
                mensagem: erro.errors,
            });
        }
        res.status(500).json({
            mensagem: 'Erro no servidor',
        });
        console.log (erro)
    }
});

router.post('/login', async (req, res) => {
    try {
        const informacoesLogin = informacoesLoginValidas.parse(req.body);

        const usuario = await encontrarPorEmail(informacoesLogin.email);

        if (!usuario) {

            return res.status(401).send();
        
        }

        const senhaValida = bcrypt.compareSync(informacoesLogin.senha, usuario.senha);

        if (!senhaValida) {

            return res.status(401).send();

        }

        const token = jwt.sign(
            {
                usuarioId: usuario.id,
            },
            process.env.SECRET,
        );
        res.status(200).json({
            token,
        });
    } catch (erro) {

        if (erro instanceof z.ZodError) {

            return res.status(422).json({
                mensagem: erro.errors,
            
            });
        }

        res.status(500).json({
            mensagem: 'Erro no servidor',
        });
        console.log(erro)
    }
});

module.exports = { router };
