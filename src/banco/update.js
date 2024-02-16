const pool = require('../conexao')

const atualizarAdministradorQuery = async (nome, email, senha, id_administrador) => {
    return pool('administrador')
    .update({ nome, email, senha })
    .where({ id_administrador })
}

const atualizarEleicaoQuery = async (nome, cadeiras, finalizada, id_eleicao, id_administrador) => {
    return pool('eleicao')
    .update({ nome, cadeiras, finalizada })
    .where({ id_eleicao })
    .andWhere({ id_administrador })
}

const atualizarPartidoQuery = async (nome, email, posicao_economica, posicao_social, senha, id_partido) => {
    return pool('partido')
    .update({ nome, email, senha, posicao_economica, posicao_social })
    .where({ id_partido })
}

const resetarLideresQuery = async (id_partido) => {
    return pool('deputado')
    .update('lider', false)
    .where({ id_partido })
}

const atualizarDeputadoQuery = async (nome, lider, id_deputado, id_partido) => {
    if (lider) {
        if (lider === true) {
            await resetarLideresQuery(id_partido)

            return pool('deputado')
            .update({ nome })
            .update('lider', lider)
            .where({ id_deputado })
            .andWhere({ id_partido })
        }
    }
    
    return pool('deputado')
    .update({ nome })
    .where({ id_deputado })
    .andWhere({ id_partido })
}

const atualizarEleitorQuery = async (nome, email, senha, id_eleitor) => {
    return pool('eleitor')
    .update({ nome, email, senha })
    .where({ id_eleitor })
}

const registrarVotoQuery = async (id_eleitor) => {
    return pool('eleitor')
    .update('votou', true)
    .where({ id_eleitor })
}

const contabilizarVotoQuery = async (id_partido) => {
    return pool('resultado')
    .increment('votos')
    .where({ id_partido })
}

const contabilizarVotoNaEleicaoQuery = async (id_eleicao) => {
    return pool('eleicao')
    .increment('votos')
    .where({ id_eleicao })
}

const finalizarVotacaoQuery = async (id_eleicao) => {
    return pool('eleicao')
    .update('finalizada', true)
    .where({ id_eleicao })
}

const atualizarNumeroDeCandidatosNaEleicaoQuery = async (id_eleicao, id_partido, tipo) => {
    if (tipo === 'adicao') {
        return pool('resultado')
        .increment('candidatos')
        .where({ id_eleicao })
        .andWhere({ id_partido })
    }
    
    if (tipo === 'exclusao') {
        return pool('resultado')
        .decrement('candidatos')
        .where({ id_eleicao })
        .andWhere({ id_partido })
    }
}

const atualizarPorcentagemDeVotosQuery = async (votosDoPartido, votosTotais, id_partido) => {
    const porcentagem_votos = votosDoPartido / votosTotais * 100

    return pool('resultado')
    .update('porcentagem_votos', porcentagem_votos)
    .where({ id_partido })
}

const definirDeputadoLider = async (id_deputado, id_partido) => {
    return pool('deputado')
    .update('lider', true)
    .where({ id_deputado })
    .andWhere({ id_partido })
}

module.exports = {
    atualizarAdministradorQuery,
    atualizarEleicaoQuery,
    atualizarPartidoQuery,
    resetarLideresQuery,
    atualizarDeputadoQuery,
    atualizarEleitorQuery,
    registrarVotoQuery,
    contabilizarVotoQuery,
    contabilizarVotoNaEleicaoQuery,
    finalizarVotacaoQuery,
    atualizarNumeroDeCandidatosNaEleicaoQuery,
    atualizarPorcentagemDeVotosQuery,
    definirDeputadoLider
}