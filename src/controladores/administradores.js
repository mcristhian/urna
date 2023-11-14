const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { listarAdministradorPorEmailQuery, listarAdministradorPorIdQuery } = require('../banco/select')
const { atualizarAdministradorQuery } = require('../banco/update')
const { excluirAdministradorQuery } = require('../banco/delete')
const { cadastrarAdministradorQuery } = require('../banco/insert')

const cadastrarAdministrador = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const usuarioComMesmoEmail = await listarAdministradorPorEmailQuery(email)

        if (usuarioComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email indisponível.' })
        }

        const senha_criptografada = await bcrypt.hash(senha, 10)
        administradorCadastrado = await cadastrarAdministradorQuery(nome, email, senha_criptografada)

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
        const administrador = await listarAdministradorPorEmailQuery(email)
        
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
        
    if (!administrador) {
        return res.status(404).json({ mensagem: 'Administrador não encontrado.' })
    }

    return res.json(administrador)
}

const atualizarAdministrador = async (req, res) => {
    const { id_administrador } = req.administrador
    const { nome, email } = req.body
    let { senha } = req.body

    try {
        const administrador = await listarAdministradorPorIdQuery(id_administrador)

        if (!administrador) {
            return res.status(404).json({ mensagem: 'Administrador não encontrado.' })
        }

        if (email) {
            if (email !== administrador.email) {
                const administrador_com_mesmo_email = await listarAdministradorPorEmailQuery(email)

                if (administrador_com_mesmo_email) {
                    return res.json({ mensagem: 'Email indisponível.' })
                }
            }
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10)
        }

        const administrador_atualizado = await atualizarAdministradorQuery(nome, email, senha, id_administrador)
        
        if (administrador_atualizado === 0) {
            return res.json({ mensagem: 'Administrador não atualizado.' })
        }

        return res.json({ mensagem: 'Administrador atualizado' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const excluirAdministrador = async (req, res) => {
    const { id_administrador } = req.administrador

    try {
        const administrador = await listarAdministradorPorIdQuery(id_administrador)
    
        if (!administrador) {
            return res.json({ mensagem: 'Administrador não encontrado' })
        }

        const administrador_excluido = await excluirAdministradorQuery(id_administrador)
        console.log(administrador_excluido)

        if (administrador_excluido === 0) {
            return res.json({ mensagem: 'Administrador não excluído.' })
        }

        return res.json({ mensagem: 'Administrador excluído.' })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarAdministrador,
    loginAdministrador,
    listarAdministrador,
    atualizarAdministrador,
    excluirAdministrador
}