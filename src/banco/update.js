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

const atualizarPartidoQuery = async (nome, email, senha, id_partido) => {
    return pool('partido')
    .update({ nome, email, senha })
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

module.exports = {
    atualizarAdministradorQuery,
    atualizarEleicaoQuery,
    atualizarPartidoQuery,
    resetarLideresQuery,
    atualizarDeputadoQuery,
}