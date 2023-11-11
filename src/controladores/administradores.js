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

const loginAdministrador = async (req, res) => {
    const { email, senha } = req.body

    try {
        const administrador = await pool('administrador')
        .where({ email })
        .first()
        
        if (!administrador) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const senha_valida = await bcrypt.compare(senha, administrador.senha)

        if (!senha_valida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const token = jwt.sign({id: administrador.id}, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...administrador_logado } = administrador

        return res.json({ administrador: administrador_logado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }

}

module.exports = {
    cadastrarAdministrador,
    loginAdministrador
}