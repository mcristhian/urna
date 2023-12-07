const joi = require('joi')

const esquemaCadastroDeputado = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    lider: joi.boolean().messages({
        'boolean.empty': 'O campo lider é obrigatório.',
        'boolean.base': 'O campo lider só aceita booleano.'
    })
})

module.exports = {
    esquemaCadastroDeputado
}