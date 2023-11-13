const pool = require('../conexao')

const cadastrarAdministradorQuery = async (nome, email, senha_criptografada) => {
    return pool('administrador')
    .insert({ nome, email, senha: senha_criptografada})
}

module.exports = {
    cadastrarAdministradorQuery
}