const Validator = require('validator');

const validateRegisterInput = (data) => {
  let errors = {};
  
  if(!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  
  return {
    errors,
    isValid: errors
  }
}

module.export = validateRegisterInput;