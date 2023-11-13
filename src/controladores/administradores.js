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

        const token = jwt.sign({id_administrador: administrador.id_administrador}, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...administrador_logado } = administrador

        return res.json({ administrador: administrador_logado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }

}

const listarAdministrador = async (req, res) => {
    const { senha: _, ...administrador } = req.administrador
    
    return res.json(administrador)
}

const editarAdministrador = async (req, res) => {
    const { id_administrador } = req.administrador
    const { nome, email } = req.body
    let { senha } = req.body

    try {
        const administrador = await pool('administrador')
        .where({ id_administrador })

        if (!administrador) {
            return res.status(404).json({ mensagem: 'Administrador não encontrado.' })
        }

        if (email) {
            if (email !== administrador.email) {
                const administrador_com_mesmo_email = await pool('administrador')
                .where({ email })
                .first()

                if (administrador_com_mesmo_email) {
                    return res.json({ mensagem: 'Email indisponível.' })
                }
            }
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10)
            console.log(senha)
        }

        const administrador_atualizado = await pool('administrador')
        .update({ nome, email, senha })
        .where({ id_administrador })
        
        if (administrador_atualizado === 0) {
            return res.json({ mensagem: 'Administrador não atualizado.' })
        }

        return res.json({ mensagem: 'Administrador atualizado' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarAdministrador,
    loginAdministrador,
    listarAdministrador,
    editarAdministrador
}