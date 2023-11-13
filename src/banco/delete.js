const pool = require('../conexao')

const excluirAdministradorQuery = async (id_administrador) => {
    return pool('administrador')
    .del()
    .where({ id_administrador })
}

module.exports = {
    excluirAdministradorQuery
}