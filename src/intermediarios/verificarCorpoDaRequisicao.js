const verificarCorpoDaRequisicao = esquemaJoi => async (req, res, next) => {
    try {
        await esquemaJoi.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = verificarCorpoDaRequisicao