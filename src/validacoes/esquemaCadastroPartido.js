const joi = require('joi')

const esquemaCadastroPartido = joi.object({
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
  posicao_economica: joi.string().required().valid('esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita').messages({
    'any.required': 'O campo posicao_economica é obrigatório.',
    'string.empty': 'O campo posicao_economica é obrigatório.',
    'string.base': 'O campo posicao_economica só aceita palavras.',
    'any.only': 'Opções válidas para posicao_economica: esquerda, centro-esquerda, centro, centro-direita, direita'
  }),
  posicao_social: joi.string().required().valid('esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita').messages({
    'any.required': 'O campo posicao_social é obrigatório.',
    'string.empty': 'O campo posicao_social é obrigatório.',
    'string.base': 'O campo posicao_social só aceita palavras.',
    'any.only': 'Opções válidas para posicao_social: esquerda, centro-esquerda, centro, centro-direita, direita'
  }),
  senha: joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.base': 'O campo senha só aceita palavras.'
  })
})

module.exports = esquemaCadastroPartido