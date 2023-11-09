const express = require('express')

const cadastrarAdministrador = require('./controladores/administradores')
const rotas = express()

rotas.post('/administrador', cadastrarAdministrador)

module.exports = rotas