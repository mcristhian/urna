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
    .returning('*')
}

const cadastrarDeputadoQuery = async (id_partido, nome, lider) => {
    return pool('deputado')
    .insert({ id_partido, nome, lider })
    .returning('*')
}

const cadastrarEleitorQuery = async (id_eleicao, nome, email, senha, votou) => {
    return pool('eleitor')
    .insert({ id_eleicao, nome, email, senha, votou })
}

const cadastrarResultadoDoPartidoQuery = async (id_eleicao, id_partido, candidatos, votos, porcentagem_votos, cadeiras, porcentagem_cadeiras) => {
    return pool('resultado')
    .insert({ id_eleicao, id_partido, candidatos, votos, porcentagem_votos, cadeiras, porcentagem_cadeiras })
}

module.exports = {
    cadastrarAdministradorQuery,
    cadastrarEleicaoQuery,
    cadastrarPartidoQuery,
    cadastrarDeputadoQuery,
    cadastrarEleitorQuery,
    cadastrarResultadoDoPartidoQuery
}