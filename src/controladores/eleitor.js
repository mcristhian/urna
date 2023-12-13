const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { listarEleitorPorEmailQuery, listarEleicaoPorIdQueryAlternativa } = require('../banco/select')
const { cadastrarEleitorQuery } = require('../banco/insert')

const cadastrarEleitor = async (req, res) => {
    const { id_eleicao, nome, email, senha, votou } = req.body

    try {
        const eleitorComMesmoEmail = await listarEleitorPorEmailQuery(email)

        if (eleitorComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email indisponível.' })
        }

        const eleicao = await listarEleicaoPorIdQueryAlternativa(id_eleicao)

        if (!eleicao) {
            return res.status(400).json({ mensagem: 'Eleição não encontrada.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const { rowCount: eleitorCadastrado } = await cadastrarEleitorQuery(id_eleicao, nome, email, senhaCriptografada, votou)

        if (eleitorCadastrado === 0) {
            return res.status(400).json({ mensagem: 'Eleitor não cadastrado.' })
        }

        return res.status(201).json({ mensagem: 'Eleitor cadastrado.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const loginEleitor = async (req, res) => {
    const { email, senha } = req.body

    try {
        const eleitor = await listarEleitorPorEmailQuery(email)

        if (!eleitor) {
            return res.status(404).json({
                mensagem: 'Eleitor não encontrado.'
            })
        }

        const senhaValida = await bcrypt.compare(senha, eleitor.senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const token = jwt.sign({ id_eleitor: eleitor.id_eleitor }, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...eleitorLogado } = eleitor

        return res.status(200).json({ eleitor: eleitorLogado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarEleitor,
    loginEleitor
}