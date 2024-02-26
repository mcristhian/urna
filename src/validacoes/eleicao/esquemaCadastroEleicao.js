const joi = require('joi')

const esquemaCadastroEleicao = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    cadeiras: joi.number().integer().required().messages({
        'any.required': 'O campo cadeiras é obrigatório.',
        'number.empty': 'O campo cadeiras é obrigatório.',
        'number.base': 'O campo cadeiras só aceita números.',
        'number.integer': 'O campo cadeiras só aceita números inteiros.'
    })
})

module.exports = {
    esquemaCadastroEleicao
}