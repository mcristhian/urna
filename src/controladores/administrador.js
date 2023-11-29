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

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        administradorCadastrado = await cadastrarAdministradorQuery(nome, email, senhaCriptografada)

        if (!administradorCadastrado) {
            return res.status(400).json({ mensagem: 'Administrador não cadastrado.' })
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

        const senhaValida = await bcrypt.compare(senha, administrador.senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const token = jwt.sign({id_administrador: administrador.id_administrador}, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...administradorLogado } = administrador

        return res.status(200).json({ administrador: administradorLogado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }

}

const listarAdministrador = async (req, res) => {
    const { senha: _, ...administrador } = req.administrador
        
    if (!administrador) {
        return res.status(404).json({ mensagem: 'Administrador não encontrado.' })
    }

    return res.status(200).json(administrador)
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
                const administradorComMesmoEmail = await listarAdministradorPorEmailQuery(email)

                if (administradorComMesmoEmail) {
                    return res.status(400).json({ mensagem: 'Email indisponível.' })
                }
            }
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10)
        }

        const administradorAtualizado = await atualizarAdministradorQuery(nome, email, senha, id_administrador)
        
        if (administradorAtualizado === 0) {
            return res.status(400).json({ mensagem: 'Administrador não atualizado.' })
        }

        return res.status(200).json({ mensagem: 'Administrador atualizado' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const excluirAdministrador = async (req, res) => {
    const { id_administrador } = req.administrador

    try {
        const administrador = await listarAdministradorPorIdQuery(id_administrador)
    
        if (!administrador) {
            return res.status(404).json({ mensagem: 'Administrador não encontrado' })
        }

        const administradorExcluido = await excluirAdministradorQuery(id_administrador)

        if (administradorExcluido === 0) {
            return res.status(400).json({ mensagem: 'Administrador não excluído.' })
        }

        return res.status(200).json({ mensagem: 'Administrador excluído.' })
        
    } catch (error) {
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