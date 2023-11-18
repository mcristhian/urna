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

module.exports = {
    excluirAdministradorQuery,
    excluirEleicaoQuery
}