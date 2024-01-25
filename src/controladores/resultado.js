const { listarEleicaoPorIdQueryAlternativa, listarPartidoPorIdEEleicaoQuery } = require("../banco/select")
const { registrarVotoQuery, contabilizarVotoQuery, contabilizarVotoNaEleicaoQuery } = require("../banco/update")

const votar = async (req, res) => {
    const { senha: _, ...eleitor } = req.eleitor
    const { id: voto } = req.params

    try {
        const eleicao = await listarEleicaoPorIdQueryAlternativa(eleitor.id_eleicao)

        if (!eleicao) {
            return res.status(404).json({ mensagem: 'Eleição não encontrada.' })
        }

        if (eleitor.votou === true) {
            return res.status(400).json({ mensagem: 'Eleitor já registrou seu voto.' })
        }

        const partido = await listarPartidoPorIdEEleicaoQuery(voto, eleitor.id_eleicao)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        await contabilizarVotoQuery(voto)
        await contabilizarVotoNaEleicaoQuery(eleitor.id_eleicao)
        await registrarVotoQuery(eleitor.id_eleitor)

        return res.status(200).json({ mensagem: 'Voto contabilizado.' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = {
    votar
}