const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cadastrarPartidoQuery } = require("../banco/insert")
const { listarEleicaoPorIdQueryAlternativa, listarPartidoPorEmailQuery } = require("../banco/select")

const cadastrarPartido = async (req, res) => {
    const { id_eleicao, nome, email, senha } = req.body

    const partidoComMesmoEmail = await listarPartidoPorEmailQuery(email)

    if (partidoComMesmoEmail) {
        return res.status(400).json({ mensagem: 'Email indisponível'})
    }

    const eleicao = await listarEleicaoPorIdQueryAlternativa(id_eleicao)

    if (!eleicao) {
        return res.status(404).json({ mensagem: 'Eleição não encontrada.' })
    }

    const senha_criptografada = await bcrypt.hash(senha, 10)

    const { rowCount: partido } = await cadastrarPartidoQuery(id_eleicao, nome, email, senha_criptografada)
    
    if (partido === 0) {
        return res.json({ mensagem: 'Partido não cadastrado.' })
    }

    return res.status(201).json({ mensagem: 'Partido cadastrado.' })
}

const loginPartido = async (req, res) => {
    const { email, senha } = req.body

    try {
        const partido = await listarPartidoPorEmailQuery(email)

        if (!partido) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const senha_valida = await bcrypt.compare(senha, partido.senha)

        if (!senha_valida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido(a).' })
        }

        const token = jwt.sign({ id_partido: partido.id_partido }, process.env.SENHA_JWT, { expiresIn: '1h' })

        const { senha: _, ...partido_logado } = partido

        return res.json({ partido: partido_logado, token })
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

    return res.json(partido)
}

module.exports = {
    cadastrarPartido,
    loginPartido,
    listarPartido
}