const Joi = require('joi'); 
const validateware = (schema, property) => { 
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      res.status(422).json({ status: "ERR", message: message }) } 
    } 
} 
module.exports = validateware;