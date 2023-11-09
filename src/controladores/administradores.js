const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cadastrarAdministrador = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const usuarioComMesmoEmail = await pool('administrador')
        .where({ email })
        .first()

        if (usuarioComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email indisponível.' })
        }

        const senha_criptografada = await bcrypt.hash(senha, 10)
        administradorCadastrado = await pool('administrador')
        .insert({ nome, email, senha: senha_criptografada})

        if (!administradorCadastrado) {
            return res.json({ mensagem: 'Administrador não cadastrado.' })
        }

        return res.status(201).json({ mensagem: 'Administrador cadastrado.' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
}

module.exports = cadastrarAdministrador