let Joi = require('joi')

module.exports = Joi.object().keys({
  username: Joi.string().required().error(() => 'must be username as string'),
  password: Joi.string().error(() => 'must be password as string'),
})
