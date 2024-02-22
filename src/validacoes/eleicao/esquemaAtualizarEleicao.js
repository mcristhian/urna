const joi = require('joi')

const esquemaAtualizarEleicao = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    cadeiras: joi.number().integer().multiple(2).messages({
        'number.empty': 'O campo cadeiras não pode estar vazio.',
        'number.base': 'O campo cadeiras só aceita números.',
        'number.integer': 'O campo cadeiras só aceita números inteiros.',
        'number.multiple': 'O campo cadeiras só aceita números pares.'
    }),
    finalizada: joi.boolean().messages({
        'boolean.empty': 'O campo finalizada não pode estar vazio.',
        'boolean.base': 'O campo finalizada só aceita booleano.'
    }),
})

module.exports = {
    esquemaAtualizarEleicao
}