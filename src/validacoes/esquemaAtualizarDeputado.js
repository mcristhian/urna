const joi = require('joi')

const esquemaAtualizarDeputado = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    lider: joi.boolean().messages({
        'boolean.empty': 'O campo lider não pode estar vazio.',
        'boolean.base': 'O cmapo lider só aceita booleano.'
    })
})

module.exports = {
    esquemaAtualizarDeputado
}