const jwt = require('jsonwebtoken')
const { listarAdministradorPorIdQuery, listarPartidoPorIdQuery, listarEleitorPorIdQuery } = require('../banco/select')

const verificarLoginAdministrador = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id_administrador } = jwt.verify(token, process.env.SENHA_JWT)

        const administrador = await listarAdministradorPorIdQuery(id_administrador)

        if (!administrador) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }

        req.administrador = administrador
        next()
    } catch (error) {
        if (error.message === 'jwt expired' || error.message === 'jwt must be provided' || error.message === 'invalid signature') {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }
        
        return res.status(500).json({ mensagem: 'Erro interno do servidor. '})
    }
}

const verificarLoginPartido = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id_partido } = jwt.verify(token, process.env.SENHA_JWT)

        const partido = await listarPartidoPorIdQuery(id_partido)

        if (!partido) {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }

        req.partido = partido
        next()
    } catch (error) {
        if (error.message === 'jwt expired' || error.message === 'jwt must be provided' || error.message === 'invalid signature') {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

const verificarLoginEleitor = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).json({ mensagem: 'Não autorizado.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id_eleitor } = jwt.verify(token, process.env.SENHA_JWT)

        const eleitor = await listarEleitorPorIdQuery(id_eleitor)

        if (!eleitor) {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }

        req.eleitor = eleitor
        next()
    } catch (error) {
        if (error.message === 'jwt expired' || error.message === 'jwt must be provided' || error.message === 'invalid signature') {
            return res.status(401).json({ mensagem: 'Não autorizado.' })
        }
        
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = { 
    verificarLoginAdministrador,
    verificarLoginPartido,
    verificarLoginEleitor
}