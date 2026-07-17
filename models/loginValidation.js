const Joi = require('joi');

const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 
                'Please enter a vaild email address.',
            'any.required':
                'Email is required!'
        }),

    password: Joi.string()
        .required()
        .messages({
            'any.required':
                'Password is required!'
        })
});

module.exports = loginValidation;