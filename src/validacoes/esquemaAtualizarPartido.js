const joi = require('joi')

const esquemaAtualizarPartido = joi.object({
    nome: joi.string().messages({
        'string.empty': 'O campo nome não pode estar vazio.',
        'string.base': 'O campo nome só aceita palavras.'
    }),
    email: joi.string().email().messages({
        'string.empty': 'O campo email não pode estar vazio.',
        'string.base': 'O campo email só aceita palavras.',
        'string.email': 'O campo email precisa ter um formato válido.'
    }),
    posicao_economica: joi.string().valid('esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita').messages({
        'string.empty': 'O campo posicao_economica não pode estar vazio.',
        'string.base': 'O campo posicao_economica só aceita palavras.',
        'any.only': 'Opções válidas para posicao_economica: esquerda, centro-esquerda, centro, centro-direita, direita'
    }),
    posicao_social: joi.string().valid('esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita').messages({
        'string.empty': 'O campo posicao_social não pode estar vazio.',
        'string.base': 'O campo posicoa_social só aceita palavras.',
        'any.only': 'Opções válidas para posicao_social: esquerda, centro-esquerda, centro, centro-direita, direita'
    }),
    senha: joi.string().messages({
        'string.empty': 'O campo senha não pode estar vazio.',
        'string.base': 'O campo senha só aceita palavras.'
    })
})

module.exports = esquemaAtualizarPartido