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
const { cadastrarPartido, loginPartido } = require('./controladores/partidos')
const esquemaCadastroPartido = require('./validacoes/esquemaCadastroPartido')
const esquemaLoginPartido = require('./validacoes/esquemaLoginPartido')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastro), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLogin), loginAdministrador)

rotas.get('/administrador', verificarLogin, listarAdministrador)
rotas.put('/administrador', verificarLogin, atualizarAdministrador)
rotas.delete('/administrador', verificarLogin, excluirAdministrador)

rotas.post('/eleicao', verificarLogin, verificarCorpoDaRequisicao(esquemaCadastroEleicao), cadastrarEleicao)
rotas.get('/eleicao', verificarLogin, listarEleicoes)
rotas.get('/eleicao/:id', verificarLogin, listarEleicao)
rotas.put('/eleicao/:id', verificarLogin, verificarCorpoDaRequisicao(esquemaAtualizarEleicao), atualizarEleicao)
rotas.delete('/eleicao/:id', verificarLogin, excluirEleicao)

rotas.post('/partido', verificarCorpoDaRequisicao(esquemaCadastroPartido), cadastrarPartido)
rotas.post('/partido/login', verificarCorpoDaRequisicao(esquemaLoginPartido), loginPartido)

module.exports = rotas