const { cadastrarDeputadoQuery } = require("../banco/insert")
const { listarPartidoPorIdQuery } = require("../banco/select")

const cadastrarDeputado = async (req, res) => {
    const { id_partido } = req.partido
    const { nome, lider } = req.body

    try {
        const partido = listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        const { rowCount: deputadoCadastrado } = await cadastrarDeputadoQuery(id_partido, nome, lider)

        if (deputadoCadastrado === 0) {
            return res.status(400).json({ mensagem: 'Deputado não cadastrado' })
        }

        return res.status(200).json({ mensagem: 'Deputado cadastrado. '})
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    cadastrarDeputado
}