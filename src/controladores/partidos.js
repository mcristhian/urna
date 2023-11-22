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

    const { rowCount: partido } = await cadastrarPartidoQuery(id_eleicao, nome, email, senha)
    
    if (partido === 0) {
        return res.json({ mensagem: 'Partido não cadastrado.' })
    }

    return res.status(201).json({ mensagem: 'Partido cadastrado.' })
}

module.exports = {
    cadastrarPartido
}