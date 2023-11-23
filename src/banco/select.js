const pool = require('../conexao')

const listarAdministradorPorIdQuery = async (id_administrador) => {
    return pool('administrador')
    .where({ id_administrador })
    .first()
}

const listarAdministradorPorEmailQuery = async (email) => {
    return pool('administrador')
    .where({ email })
    .first()
}

const listarEleicoesPorAdministradorQuery = async (id_administrador) => {
    return pool('eleicao')
    .where({ id_administrador })
}

const listarEleicaoPorIdQuery = async (id_eleicao, id_administrador) => {
    return pool('eleicao')
    .where({ id_eleicao })
    .andWhere({ id_administrador })
    .first()
}

const listarEleicaoPorIdQueryAlternativa = async (id_eleicao) => {
    return pool('eleicao')
    .where({ id_eleicao })
    .first()
}

const listarPartidoPorEmailQuery = async (email) => {
    return pool('partido')
    .where({ email })
    .first()
}

const listarPartidoPorIdQuery = async (id_partido) => {
    return pool('partido')
    .where({ id_partido })
    .first()
}

module.exports = {
    listarAdministradorPorIdQuery,
    listarAdministradorPorEmailQuery,
    listarEleicoesPorAdministradorQuery,
    listarEleicaoPorIdQuery,
    listarEleicaoPorIdQueryAlternativa,
    listarPartidoPorEmailQuery,
    listarPartidoPorIdQuery
}