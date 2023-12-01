const { cadastrarDeputadoQuery } = require("../banco/insert")
const { listarPartidoPorIdQuery, listarDeputadoPorIdQuery, encontrarDeputadoLiderQuery } = require("../banco/select")
const { resetarLideresQuery } = require("../banco/update")

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

module.exports = {
    cadastrarDeputado,
    listarDeputado
}