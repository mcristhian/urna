const bcrypt = require('bcrypt')
const { listarEleitorPorEmailQuery } = require('../banco/select')
const { cadastrarEleitorQuery } = require('../banco/insert')

const cadastrarEleitor = async (req, res) => {
    const { id_eleicao, nome, email, senha, votou } = req.body

    try {
        const eleitorComMesmoEmail = await listarEleitorPorEmailQuery(email)

        if (eleitorComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email indisponível.' })
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

module.exports = {
    cadastrarEleitor
}