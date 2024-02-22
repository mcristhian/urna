const joi = require('joi')

const esquemaCadastroEleicao = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    cadeiras: joi.number().integer().multiple(2).required().messages({
        'any.required': 'O campo cadeiras é obrigatório.',
        'number.empty': 'O campo cadeiras é obrigatório.',
        'number.base': 'O campo cadeiras só aceita números.',
        'number.integer': 'O campo cadeiras só aceita números inteiros.',
        'number.multiple': 'O cmapo cadeira só aceita números pares.'
    })
})

module.exports = {
    esquemaCadastroEleicao
}