const express = require('express');
const {
    criarReceita,
    atualizarReceita,
    deletarReceita,
    visualizacaoPorId,
    localizarPorId
} = require('../database/receitas');
const z = require('zod');
const autenticacao = require('../middleware/autentificacao');
const router = express.Router();

const regex = /^\d(\.\d)?$/;
const EsquemaReceita = z.object({
    nome: z.string({
        required_error: 'O nome deve ser obrigatório',
        invalid_type_error: 'Nome inválido',
    }),
    descricao: z.string().min(3),
    tempPreparo: z.string(),
})

router.get('/visualizacao/receitas', autenticacao, async (req, res) => {
    try {
        const receitas = await visualizacaoPorId(req.usuarioId);
        res.status(200).json({
            dados: receitas,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                mensagem: error.errors,
            });
        }
        res.status(500).json({ mensagem: "Servidor não encontrado" });
    console.log(error)
}   
})

router.post('/criar/receitas', autenticacao, async (req, res) => {
    try {
        const novaReceita = EsquemaReceita.parse(req.body);
        const usuario = req.usuarioId;
        const salvarReceita = await criarReceita(novaReceita, usuario);
        res.status(201).json({
            dados: salvarReceita,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                mensagem: error.errors,
            });
        }
        res.status(500).json({ mensagem: "Servidor não encontrado" });
  console.log(error)  } 
})


router.put('/enviar/receitas/:id', autenticacao, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await localizarPorId(req.usuarioId, id)
        if(!usuario)
        return res.status(404).json({
            mensagem: "Receita não encontrada"
        })
        const receita = EsquemaReceita.parse(req.body);
        const subirReceita = await atualizarReceita(id, receita, req.usuarioId);
        res.json({
            dados: subirReceita,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                mensagem: error.errors,
            });
        } else if (error.mensagem === "Permissão negada para essa ação") {
            return res.status(401).json({
                mensagem: error.mensagem,
            });
        }
        res.status(500).json({ mensagem: "Servidor não encontrado" });
        console.log(error)
    }

})

router.delete('/deletar/receitas/:id', autenticacao, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const usuario = await localizarPorId(req.usuarioId, id)
        if(!usuario)
        return res.status(404).json({
            mensagem: "Receita não encontrada"
        })
        await deletarReceita(id);
        res.status(204).send('Receita deletada com sucesso');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                mensagem: error.errors,
            });
        } else if (error.mensagem === "Permissão negada para essa ação") {
            return res.status(401).json({
                mensagem: error.mensagem,
            });
        }
        res.status(500).json({ mensagem: "Servidor não encontrado" });
        console.log(error)
    }
})

module.exports = { router };
