const joi = require('joi')

const esquemaAtualizarAdministrador = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    email: joi.string().email().messages({
        'string.empty': 'O campo email não pode estar vazio.',
        'string.base': 'O campo email só aceita palavras',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    senha: joi.string().messages({
        'string.empty': 'O campo senha não pode estar vazio.',
        'string.base': 'O campo enha só aceita palavras.'
    })
})

module.exports = esquemaAtualizarAdministrador