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

module.exports = {
    listarAdministradorPorIdQuery,
    listarAdministradorPorEmailQuery,
    listarEleicoesPorAdministradorQuery,
    listarEleicaoPorIdQuery
}