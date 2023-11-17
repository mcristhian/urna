const { cadastrarEleicaoQuery } = require('../banco/insert')
const { listarAdministradorPorIdQuery, listarEleicoesPorAdministradorQuery, listarEleicaoPorIdQuery } = require('../banco/select')

const cadastrarEleicao = async (req, res) => {
    const { id_administrador } = req.administrador
    const { nome, cadeiras } = req.body

    try {
        const administrador = await listarAdministradorPorIdQuery(id_administrador)
        
        if (!administrador) {
            return res.status(400).json({ mensagem: 'Administrador não encontrado' })
        }

        const eleicao = await cadastrarEleicaoQuery(id_administrador, nome, cadeiras)

        if (!eleicao[0]) {
            return res.json({ mensagem: 'Eleição não cadastrada.' })
        }

        return res.status(201).json({ mensagem: 'Eleição cadastrada.' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const listarEleicoes = async (req, res) => {
    const { id_administrador } = req.administrador

    try {
        const eleicoes = await listarEleicoesPorAdministradorQuery(id_administrador)

        return res.json(eleicoes)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const listarEleicao = async (req, res) => {
    const { id: id_eleicao } = req.params
    const { id_administrador } = req.administrador

    try {
        const eleicao = await listarEleicaoPorIdQuery(id_eleicao, id_administrador)

        if (!eleicao) {
            return res.status(404).json({ mensagem: 'Eleição não encontrada.' })
        }

        return res.json(eleicao)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarEleicao,
    listarEleicoes,
    listarEleicao
}