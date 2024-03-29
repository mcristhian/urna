const { listarEleicaoPorIdQueryAlternativa, listarPartidoPorIdEEleicaoQuery, listarEleitoresPorEleicaoQuery, listarResultadoPorPartidoQuery, listarResultadoPorEleicaoQuery } = require("../banco/select")
const { registrarVotoQuery, contabilizarVotoQuery, contabilizarVotoNaEleicaoQuery, finalizarVotacaoQuery, atualizarPorcentagemDeVotosQuery, distribuirCadeirasQuery, atualizarPorcentagemDeCadeirasQuery } = require("../banco/update")

const votar = async (req, res) => {
    const { senha: _, ...eleitor } = req.eleitor
    const { id: voto } = req.params

    try {
        const id_eleicao = eleitor.id_eleicao
        const eleicao = await listarEleicaoPorIdQueryAlternativa(id_eleicao)

        if (!eleicao) {
            return res.status(404).json({ mensagem: 'Eleição não encontrada.' })
        }

        let eleicaoFinalizada = eleicao.finalizada
        if (eleicaoFinalizada) {
            return res.status(400).json({ mensagem: 'Eleição finalizada.' })
        }

        if (eleitor.votou === true) {
            return res.status(400).json({ mensagem: 'Eleitor já registrou seu voto.' })
        }

        const partido = await listarPartidoPorIdEEleicaoQuery(voto, id_eleicao)

        if (!partido) {
            return res.status(404).json({ mensagem: 'Partido não encontrado.' })
        }

        await contabilizarVotoQuery(voto)
        await contabilizarVotoNaEleicaoQuery(id_eleicao)
        await registrarVotoQuery(eleitor.id_eleitor)

        let numeroDeEleitores = await listarEleitoresPorEleicaoQuery(id_eleicao)
        numeroDeEleitores = numeroDeEleitores.length
        
        const { votos: numeroDeVotos } = await listarEleicaoPorIdQueryAlternativa(id_eleicao)
        
        if (numeroDeEleitores === numeroDeVotos) {
            await finalizarVotacaoQuery(id_eleicao)
        }

        await atualizarResultadoDoPartido(id_eleicao)

        return res.status(200).json({ mensagem: 'Voto contabilizado.' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const atualizarResultadoDoPartido = async (id_eleicao) => {
    const resultados = await listarResultadoPorEleicaoQuery(id_eleicao)
    const { cadeiras } = await listarEleicaoPorIdQueryAlternativa(id_eleicao)

    for (resultado of resultados) {
        const { votos: votosDoPartido } = await listarResultadoPorPartidoQuery(resultado.id_partido)
        
        const { votos: votosTotais } = await listarEleicaoPorIdQueryAlternativa(id_eleicao)

        const porcentagem_votos = votosDoPartido / votosTotais
        let cadeirasDoPartido = cadeiras * porcentagem_votos
        cadeirasDoPartido = Math.round(cadeirasDoPartido)
        await distribuirCadeirasQuery(cadeirasDoPartido, resultado.id_partido)
        //Consertar distribuição de vagas
        await atualizarPorcentagemDeVotosQuery(porcentagem_votos * 100, resultado.id_partido)

        let porcentagemCadeiras = cadeirasDoPartido / cadeiras
        await atualizarPorcentagemDeCadeirasQuery(porcentagemCadeiras * 100, resultado.id_partido)
    }
}

module.exports = {
    votar
}