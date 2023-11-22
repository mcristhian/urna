const pool = require('../conexao')

const cadastrarAdministradorQuery = async (nome, email, senha_criptografada) => {
    return pool('administrador')
    .insert({ nome, email, senha: senha_criptografada})
}

const cadastrarEleicaoQuery = async (id_administrador, nome, cadeiras) => {
    return pool('eleicao')
    .insert({ id_administrador, nome, cadeiras })
    .returning('*')
}

const cadastrarPartidoQuery = async (id_eleicao, nome, email, senha) => {
    return pool('partido')
    .insert({ id_eleicao, nome, email, senha })
}

module.exports = {
    cadastrarAdministradorQuery,
    cadastrarEleicaoQuery,
    cadastrarPartidoQuery
}