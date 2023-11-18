const express = require('express')
const rotas = express()

const { cadastrarAdministrador, loginAdministrador, listarAdministrador, atualizarAdministrador, excluirAdministrador } = require('./controladores/administradores')
const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const esquemaCadastro = require('./validacoes/esquemaCadastro')
const esquemaLogin = require('./validacoes/esquemaLogin')
const verificarLogin = require('./intermediarios/autenticacao')
const { cadastrarEleicao, listarEleicoes, listarEleicao, atualizarEleicao, excluirEleicao } = require('./controladores/eleicao')
const { esquemaCadastroEleicao } = require('./validacoes/esquemaCadastroEleicao')
const { esquemaAtualizarEleicao } = require('./validacoes/esquemaAtualizarEleicao')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastro), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLogin), loginAdministrador)

rotas.use(verificarLogin)

rotas.get('/administrador', listarAdministrador)
rotas.put('/administrador', atualizarAdministrador)
rotas.delete('/administrador', excluirAdministrador)

rotas.post('/eleicao', verificarCorpoDaRequisicao(esquemaCadastroEleicao), cadastrarEleicao)
rotas.get('/eleicao', listarEleicoes)
rotas.get('/eleicao/:id', listarEleicao)
rotas.put('/eleicao/:id', verificarCorpoDaRequisicao(esquemaAtualizarEleicao), atualizarEleicao)
rotas.delete('/eleicao/:id', excluirEleicao)

module.exports = rotas