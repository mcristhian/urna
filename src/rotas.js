const express = require('express')
const rotas = express()

const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const { verificarLoginAdministrador, verificarLoginPartido } = require('./intermediarios/autenticacao')

const { cadastrarAdministrador, loginAdministrador, listarAdministrador, atualizarAdministrador, excluirAdministrador } = require('./controladores/administrador')
const esquemaCadastroAdministrador = require('./validacoes/esquemaCadastroAdministrador')
const esquemaLoginAdministrador = require('./validacoes/esquemaLoginAdministrador')

const { cadastrarEleicao, listarEleicoes, listarEleicao, atualizarEleicao, excluirEleicao } = require('./controladores/eleicao')
const { esquemaCadastroEleicao } = require('./validacoes/esquemaCadastroEleicao')
const { esquemaAtualizarEleicao } = require('./validacoes/esquemaAtualizarEleicao')

const { cadastrarPartido, loginPartido, listarPartido, excluirPartido, atualizarPartido } = require('./controladores/partido')
const esquemaCadastroPartido = require('./validacoes/esquemaCadastroPartido')
const esquemaLoginPartido = require('./validacoes/esquemaLoginPartido')
const { cadastrarDeputado, listarDeputado, excluirDeputado, listarDeputadosPorPartido } = require('./controladores/deputado')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastroAdministrador), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLoginAdministrador), loginAdministrador)
rotas.get('/administrador', verificarLoginAdministrador, listarAdministrador)
rotas.put('/administrador', verificarLoginAdministrador, atualizarAdministrador)
rotas.delete('/administrador', verificarLoginAdministrador, excluirAdministrador)

rotas.post('/eleicao', verificarLoginAdministrador, verificarCorpoDaRequisicao(esquemaCadastroEleicao), cadastrarEleicao)
rotas.get('/eleicao', verificarLoginAdministrador, listarEleicoes)
rotas.get('/eleicao/:id', verificarLoginAdministrador, listarEleicao)
rotas.put('/eleicao/:id', verificarLoginAdministrador, verificarCorpoDaRequisicao(esquemaAtualizarEleicao), atualizarEleicao)
rotas.delete('/eleicao/:id', verificarLoginAdministrador, excluirEleicao)

rotas.post('/partido', verificarCorpoDaRequisicao(esquemaCadastroPartido), cadastrarPartido)
rotas.post('/partido/login', verificarCorpoDaRequisicao(esquemaLoginPartido), loginPartido)
rotas.get('/partido', verificarLoginPartido, listarPartido)
rotas.delete('/partido', verificarLoginPartido, excluirPartido)
rotas.put('/partido', verificarLoginPartido, atualizarPartido)

rotas.post('/deputado', verificarLoginPartido, cadastrarDeputado)
rotas.get('/deputado/:id', verificarLoginPartido, listarDeputado)
rotas.delete('/deputado/:id', verificarLoginPartido, excluirDeputado)
rotas.get('/deputado', verificarLoginPartido, listarDeputadosPorPartido)

module.exports = rotas