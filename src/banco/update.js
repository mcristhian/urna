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

module.exports = {
    atualizarAdministradorQuery,
    atualizarEleicaoQuery
}