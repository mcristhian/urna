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

const cadastrarPartidoQuery = async (id_eleicao, nome, email, posicao_economica, posicao_social, senha) => {
    return pool('partido')
    .insert({ id_eleicao, nome, email, posicao_economica, posicao_social, senha })
}

const cadastrarDeputadoQuery = async (id_partido, nome, lider) => {
    return pool('deputado')
    .insert({ id_partido, nome, lider })
}

const cadastrarEleitorQuery = async (id_eleicao, nome, email, senha, votou) => {
    return pool('eleitor')
    .insert({ id_eleicao, nome, email, senha, votou })
}

module.exports = {
    cadastrarAdministradorQuery,
    cadastrarEleicaoQuery,
    cadastrarPartidoQuery,
    cadastrarDeputadoQuery,
    cadastrarEleitorQuery
}