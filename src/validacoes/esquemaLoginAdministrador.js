const joi = require('joi')

const esquemaLoginAdministrador = joi.object({
    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.'
    })
})

module.exports = esquemaLoginAdministrador