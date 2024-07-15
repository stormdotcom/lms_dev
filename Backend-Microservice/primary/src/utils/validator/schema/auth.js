const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    password: Joi.string().min(3).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 3 characters long'
    })
});

const signUpSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Last name is required'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address'
    }),
    password: Joi.string().min(3).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 3 characters long'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
        'string.empty': 'Confirm password is required'
    })
});



module.exports = {
    loginSchema,
    signUpSchema
}