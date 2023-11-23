const joi = require('joi')

const esquemaLoginPartido = joi.object({
    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.base': 'O campo email só aceita palavras.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.base': 'O campo senha só aceita palavras.'
    })
})

module.exports = esquemaLoginPartido