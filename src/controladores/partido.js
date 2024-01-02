const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cadastrarPartidoQuery } = require("../banco/insert")
const { listarEleicaoPorIdQueryAlternativa, listarPartidoPorEmailQuery, listarPartidoPorIdQuery } = require("../banco/select")
const { excluirPartidoQuery } = require('../banco/delete')
const { atualizarPartidoQuery } = require('../banco/update')

const cadastrarPartido = async (req, res) => {
    const { id_eleicao, nome, email, posicao_economica, posicao_social, senha } = req.body

    try {
        const partidoComMesmoEmail = await listarPartidoPorEmailQuery(email)
    
        if (partidoComMesmoEmail) {
            return res.status(400).json({ mensagem: 'Email indisponível'})
        }
    
        const eleicao = await listarEleicaoPorIdQueryAlternativa(id_eleicao)
    
        if (!eleicao) {
            return res.status(404).json({ mensagem: 'Eleição não encontrada.' })
        }
    
        const senhaCriptografada = await bcrypt.hash(senha, 10)
    
        const { rowCount: partido } = await cadastrarPartidoQuery(id_eleicao, nome, email, posicao_economica, posicao_social, senhaCriptografada)
        
        if (partido === 0) {
            return res.status(400).json({ mensagem: 'Partido não cadastrado.' })
        }
    
        return res.status(201).json({ mensagem: 'Partido cadastrado.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })        
    }
}

const loginPartido = async (req, res) => {
    const { email, senha } = req.body

    try {
        const partido = await listarPartidoPorEmailQuery(email)

        if (!partido) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const senhaValida = await bcrypt.compare(senha, partido.senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const token = jwt.sign({ id_partido: partido.id_partido }, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...partidoLogado } = partido

        return res.status(200).json({ partido: partidoLogado, token })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const listarPartido = async (req, res) => {
    const { senha: _, ...partido }  = req.partido

    if (!partido) {
        return res.status(404).json({ mensagem: 'Partido não encontrado.' })
    }

    return res.status(200).json(partido)
}

const excluirPartido = async (req, res) => {
    const { id_partido } = req.partido

    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        const partidoExcluido = await excluirPartidoQuery(id_partido)

        if (partidoExcluido === 0) {
            return res.status(400).json({ mensagem: 'Partido não excluído.' })
        }

        return res.status(200).json({ mensagem: 'Partido excluído.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const atualizarPartido = async (req, res) => {
    const { id_partido } = req.partido
    const { nome, email, posicao_economica, posicao_social } = req.body
    let { senha } = req.body

    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        if (email) {
            if (email !== partido.email) {
                const partidoComMesmoEmail = await listarPartidoPorEmailQuery(email)
    
                if (partidoComMesmoEmail) {
                    return res.status(400).json({ mensagem: 'Email indisponível.' })
                }
            }
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10)
        }

        const partidoAtualizado = await atualizarPartidoQuery(nome, email, posicao_economica, posicao_social, senha, id_partido)

        if (partidoAtualizado === 0) {
            return res.status(400).json({ mensagem: 'Partido não atualizado.' })
        }

        return res.status(200).json({ mensagem: 'Partido atualizado.' })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarPartido,
    loginPartido,
    listarPartido,
    excluirPartido,
    atualizarPartido
}