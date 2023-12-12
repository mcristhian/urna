const joi = require('joi')

const esquemaCadastroEleitor = joi.object({
    id_eleicao: joi.number().integer().required().messages({
        'any.required': 'O campo id_eleicao é obrigatório.',
        'number.empty': 'O campo id_eleicao é obrigatório.',
        'number.base': 'O campo id_eleicao é obrigatório',
        'number.integer': 'O campo id_eleicao só aceita números inteiros.'
    }),
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().email().required().messages({
        'any.requied': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    
})