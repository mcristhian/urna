const { excluirDeputadoQuery } = require("../banco/delete")
const { cadastrarDeputadoQuery } = require("../banco/insert")
const { listarPartidoPorIdQuery, listarDeputadoPorIdQuery, encontrarDeputadoLiderQuery, listarDeputadosPorPartidoQuery } = require("../banco/select")
const { resetarLideresQuery, atualizarDeputadoQuery } = require("../banco/update")

const cadastrarDeputado = async (req, res) => {
    const { id_partido } = req.partido
    const { nome, lider } = req.body

    try {
        const partido = listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        if (lider) {
            const deputadoLider = await encontrarDeputadoLiderQuery(id_partido)
            if (deputadoLider.length !== 0) {
                await resetarLideresQuery(id_partido)
            }
        }

        const { rowCount: deputadoCadastrado } = await cadastrarDeputadoQuery(id_partido, nome, lider)

        if (deputadoCadastrado === 0) {
            return res.status(400).json({ mensagem: 'Deputado não cadastrado' })
        }

        return res.status(200).json({ mensagem: 'Deputado cadastrado. '})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const listarDeputado = async (req, res) => {
    const { id_partido } = req.partido
    const { id: id_deputado } = req.params
     
    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        const deputado = await listarDeputadoPorIdQuery(id_deputado, id_partido)

        if (!deputado) {
            return res.status(404).json({ mensagem: 'Deputado não encontrado.' })
        }

        return res.status(200).json(deputado)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const excluirDeputado = async (req, res) => {
    const { id_partido } = req.partido
    const { id: id_deputado } = req.params

    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido do deputado não encontrado.' })
        }

        const deputado = await listarDeputadoPorIdQuery(id_deputado, id_partido)

        if (!deputado) {
            return res.status(404).json({ mensagem: 'Deputado não encontrado.' })
        }

        const deputadoExcluido = await excluirDeputadoQuery(id_deputado, id_partido)

        if (deputadoExcluido === 0) {
            return res.status(400).json({ mensagem: 'Deputado não excluído.' })
        }

        return res.status(200).json({ mensagem: 'Deputado excluído.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const listarDeputadosPorPartido = async (req, res) => {
    const { id_partido } = req.partido
    
    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        const deputados = await listarDeputadosPorPartidoQuery(id_partido)

        return res.status(200).json(deputados)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const atualizarDeputado = async (req, res) => {
    const { id: id_deputado } = req.params
    const { id_partido } = req.partido
    const { nome, lider } = req.body
    
    try {
        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido do deputado não encontrado.' })
        }

        const deputado = await listarDeputadoPorIdQuery(id_deputado, id_partido)

        if (!deputado) {
            return res.status(404).json({ mensagem: 'Deputado não encontrado.' })
        }

        const deputadoAtualizado = await atualizarDeputadoQuery(nome, lider, id_deputado, id_partido)

        if (deputadoAtualizado === 0) {
            return res.status(400).json({ mensagem: 'Deputado não atualizado.' })
        }

        return res.status(200).json({ mensagem: 'Deputado atualizado.' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarDeputado,
    listarDeputado,
    excluirDeputado,
    listarDeputadosPorPartido,
    atualizarDeputado
}