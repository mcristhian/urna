const pool = require('../conexao')

const atualizarAdministradorQuery = async (nome, email, senha, id_administrador) => {
    return pool('administrador')
    .update({ nome, email, senha })
    .where({ id_administrador })
}

module.exports = {
    atualizarAdministradorQuery
}