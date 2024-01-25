const joi = require('joi')

const esquemaCadastroEleitor = joi.object({
    id_eleicao: joi.number().integer().required().messages({
        'any.required': 'O campo id_eleicao é obrigatório.',
        'number.empty': 'O campo id_eleicao é obrigatório.',
        'number.base': 'O campo id_eleicao só aceita números.',
        'number.integer': 'O campo id_eleicao só aceita números inteiros.'
    }),
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'string.base': 'O campo email só aceita palavras.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.base': 'O campo senha só aceita palavras.'
    }),
    votou: joi.boolean().messages({
        'boolean.empty': 'O campo votou não pode estar vazio.',
        'boolean.base': 'O campo votou só aceita booleano.'
    })
})

module.exports = {
    esquemaCadastroEleitor
}