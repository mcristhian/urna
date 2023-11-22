const joi = require('joi')

const esquemaCadastroPartido = joi.object({
  id_eleicao: joi.number().integer().required().messages({
    'any.required': 'O campo id_eleicao é obrigatório.',
    'number.empty': 'O campo id_eleicao é obrigatório.',
    'number.base': 'O campo id_eleicao só aceita números.',
    'number.integer': 'O campo id_eleicao só aceita números inteiros.'
  }),
//   id_lider: joi.number().integer().required().messages({
//     'any.required': 'O campo id_lider é obrigatório.',
//     'number.empty': 'O campo id_lider é obrigatório.',
//     'number.base': 'O campo id_lider só aceita números.',
//     'number.integer': 'O campo id_lider só aceita números inteiros.'
//   }),
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome é obrigatório.',
    'string.base': 'O campo cadeiras só aceita palavras.'
  }),
  email: joi.string().email().required().messages({
    'any.required': 'O campo email é obrigatório.',
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email precisar ter um formato válido.',
    'string.base': 'O campo cadeiras só aceita palavras.'
  }),
  senha: joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.base': 'O campo cadeiras só aceita palavras.'
  })
})

module.exports = esquemaCadastroPartido