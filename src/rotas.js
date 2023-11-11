const express = require('express')
const rotas = express()

const { cadastrarAdministrador, loginAdministrador } = require('./controladores/administradores')
const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const esquemaCadastro = require('./validacoes/esquemaCadastro')
const esquemaLogin = require('./validacoes/esquemaLogin')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastro), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLogin), loginAdministrador)

module.exports = rotas