const joi = require('joi')

const esquemaAtualizarDeputado = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo '
    })
})