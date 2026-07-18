const Joi = require('joi');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const userValidation = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    username: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .custom((value, helpers) => {
            if (value !== value.trim()) {
                return helpers.error('password.trim');
            }
            return value;
        })
        .pattern(passwordRegex)
        .required()
        .messages({
            'password.trim':
                'Password cannot begin or end with spaces.',
            'string.pattern.base':
                'Password must contain an uppercase letter, lowercase letter, number and at least one non-alphanumeric character.'
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match.',
            'any.required': 'Please confirm your password.'
        })
});

module.exports = userValidation;