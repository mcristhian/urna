const express = require('express')
const rotas = express()

const { cadastrarAdministrador, loginAdministrador, listarAdministrador } = require('./controladores/administradores')
const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const esquemaCadastro = require('./validacoes/esquemaCadastro')
const esquemaLogin = require('./validacoes/esquemaLogin')
const verificarLogin = require('./intermediarios/autenticacao')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastro), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLogin), loginAdministrador)

rotas.use(verificarLogin)

rotas.get('/administrador', listarAdministrador)

module.exports = rotas