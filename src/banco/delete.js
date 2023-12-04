const pool = require('../conexao')

const excluirAdministradorQuery = async (id_administrador) => {
    return pool('administrador')
    .del()
    .where({ id_administrador })
}

const excluirEleicaoQuery = async (id_eleicao, id_administrador) => {
    return pool('eleicao')
    .del()
    .where({ id_eleicao })
    .andWhere({ id_administrador })
}

const excluirPartidoQuery = async (id_partido) => {
    return pool('partido')
    .del()
    .where({ id_partido })
}

const excluirDeputadoQuery = async (id_deputado, id_partido) => {
    return pool('deputado')
    .del()
    .where({ id_deputado })
    .andWhere({ id_partido })
}

module.exports = {
    excluirAdministradorQuery,
    excluirEleicaoQuery,
    excluirPartidoQuery,
    excluirDeputadoQuery
}