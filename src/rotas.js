const express = require('express')
const rotas = express()

const { cadastrarAdministrador, loginAdministrador, listarAdministrador, editarAdministrador, excluirAdministrador } = require('./controladores/administradores')
const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const esquemaCadastro = require('./validacoes/esquemaCadastro')
const esquemaLogin = require('./validacoes/esquemaLogin')
const verificarLogin = require('./intermediarios/autenticacao')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastro), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLogin), loginAdministrador)

rotas.use(verificarLogin)

rotas.get('/administrador', listarAdministrador)
rotas.put('/administrador', editarAdministrador)
rotas.delete('/administrador', excluirAdministrador)

module.exports = rotas