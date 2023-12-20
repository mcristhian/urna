const joi = require('joi')

const esquemaAtualizarEleitor = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    email: joi.string().email().messages({
        'string.empty': 'O campo email não pode estar vazio.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'string.base': 'O campo email só aceita palavras.'
    }),
    senha: joi.string().messages({
        'string.empty': 'O campo senha não pode estar vazio.',
        'string.base': 'O campo senha só aceita palavras.'
    })
})

module.exports = esquemaAtualizarEleitor