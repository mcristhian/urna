const express = require('express')
const rotas = express()

const verificarCorpoDaRequisicao = require('./intermediarios/verificarCorpoDaRequisicao')
const { verificarLoginAdministrador, verificarLoginPartido, verificarLoginEleitor } = require('./intermediarios/autenticacao')

const { cadastrarAdministrador, loginAdministrador, listarAdministrador, atualizarAdministrador, excluirAdministrador } = require('./controladores/administrador')
const esquemaCadastroAdministrador = require('./validacoes/administrador/esquemaCadastroAdministrador')
const esquemaLoginAdministrador = require('./validacoes/administrador/esquemaLoginAdministrador')
const esquemaAtualizarAdministrador = require('./validacoes/administrador/esquemaAtualizarAdministrador')

const { cadastrarEleicao, listarEleicoes, listarEleicao, atualizarEleicao, excluirEleicao, listarEleitoresPorEleicao, listarPartidosPorEleicao } = require('./controladores/eleicao')
const { esquemaCadastroEleicao } = require('./validacoes/eleicao/esquemaCadastroEleicao')
const { esquemaAtualizarEleicao } = require('./validacoes/eleicao/esquemaAtualizarEleicao')

const { cadastrarPartido, loginPartido, listarPartido, excluirPartido, atualizarPartido } = require('./controladores/partido')
const esquemaCadastroPartido = require('./validacoes/partido/esquemaCadastroPartido')
const esquemaLoginPartido = require('./validacoes/partido/esquemaLoginPartido')
const esquemaAtualizarPartido = require('./validacoes/partido/esquemaAtualizarPartido')

const { cadastrarDeputado, listarDeputado, excluirDeputado, listarDeputadosPorPartido, atualizarDeputado } = require('./controladores/deputado')
const { esquemaCadastroDeputado } = require('./validacoes/deputado/esquemaCadastroDeputado')
const { esquemaAtualizarDeputado } = require('./validacoes/deputado/esquemaAtualizarDeputado')

const { cadastrarEleitor, loginEleitor, listarEleitor, excluirEleitor, atualizarEleitor } = require('./controladores/eleitor')
const { esquemaCadastroEleitor } = require('./validacoes/eleitor/esquemaCadastroEleitor')
const esquemaLoginEleitor = require('./validacoes/eleitor/esquemaLoginEleitor')
const esquemaAtualizarEleitor = require('./validacoes/eleitor/esquemaAtualizarEleitor')

const { votar } = require('./controladores/resultado')

rotas.post('/administrador', verificarCorpoDaRequisicao(esquemaCadastroAdministrador), cadastrarAdministrador)
rotas.post('/administrador/login', verificarCorpoDaRequisicao(esquemaLoginAdministrador), loginAdministrador)
rotas.get('/administrador', verificarLoginAdministrador, listarAdministrador)
rotas.put('/administrador', verificarLoginAdministrador, verificarCorpoDaRequisicao(esquemaAtualizarAdministrador), atualizarAdministrador)
rotas.delete('/administrador', verificarLoginAdministrador, excluirAdministrador)

rotas.post('/eleicao', verificarLoginAdministrador, verificarCorpoDaRequisicao(esquemaCadastroEleicao), cadastrarEleicao)
rotas.get('/eleicao', verificarLoginAdministrador, listarEleicoes)
rotas.get('/eleicao/:id', verificarLoginAdministrador, listarEleicao)
rotas.put('/eleicao/:id', verificarLoginAdministrador, verificarCorpoDaRequisicao(esquemaAtualizarEleicao), atualizarEleicao)
rotas.delete('/eleicao/:id', verificarLoginAdministrador, excluirEleicao)
rotas.get('/eleicao/:id/eleitores', verificarLoginAdministrador, listarEleitoresPorEleicao)
rotas.get('/eleicao/:id/partidos', verificarLoginAdministrador, listarPartidosPorEleicao)

rotas.post('/partido', verificarCorpoDaRequisicao(esquemaCadastroPartido), cadastrarPartido)
rotas.post('/partido/login', verificarCorpoDaRequisicao(esquemaLoginPartido), loginPartido)
rotas.get('/partido', verificarLoginPartido, listarPartido)
rotas.delete('/partido', verificarLoginPartido, excluirPartido)
rotas.put('/partido', verificarLoginPartido, verificarCorpoDaRequisicao(esquemaAtualizarPartido), atualizarPartido)

rotas.post('/deputado', verificarLoginPartido, verificarCorpoDaRequisicao(esquemaCadastroDeputado), cadastrarDeputado)
rotas.get('/deputado/:id', verificarLoginPartido, listarDeputado)
rotas.delete('/deputado/:id', verificarLoginPartido, excluirDeputado)
rotas.get('/deputado', verificarLoginPartido, listarDeputadosPorPartido)
rotas.put('/deputado/:id', verificarLoginPartido, verificarCorpoDaRequisicao(esquemaAtualizarDeputado), atualizarDeputado)

rotas.post('/eleitor', verificarCorpoDaRequisicao(esquemaCadastroEleitor), cadastrarEleitor)
rotas.post('/eleitor/login', verificarCorpoDaRequisicao(esquemaLoginEleitor), loginEleitor)
rotas.get('/eleitor', verificarLoginEleitor, listarEleitor)
rotas.delete('/eleitor', verificarLoginEleitor, excluirEleitor)
rotas.put('/eleitor', verificarCorpoDaRequisicao(esquemaAtualizarEleitor), verificarLoginEleitor, atualizarEleitor)

rotas.post('/voto/:id', verificarLoginEleitor, votar)

module.exports = rotas