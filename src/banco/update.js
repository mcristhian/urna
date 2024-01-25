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

module.exports = {
    atualizarAdministradorQuery,
    atualizarEleicaoQuery,
    atualizarPartidoQuery,
    resetarLideresQuery,
    atualizarDeputadoQuery,
    atualizarEleitorQuery,
    registrarVotoQuery,
    contabilizarVotoQuery,
    contabilizarVotoNaEleicaoQuery
}