const Joi = require('joi');

const updateProfileSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Last name is required'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    }),
    options: Joi.object({
        bio: Joi.string().max(200).optional().messages({
            'string.max': 'Bio must be at most 200 characters'
        })
    }).optional()
});

const searchSchema = Joi.object({
    search: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z0-9 ]*$/)
        .required()
        .messages({
            'string.empty': 'Search term is required',
            'string.min': 'Search term must be at least 2 characters long',
            'string.max': 'Search term must be less than 50 characters long',
            'string.pattern.base': 'Search term can only contain letters, numbers, and spaces',
            'any.required': 'Search term is required'
        })
});

updateProfileSchema

module.exports = {
    updateProfileSchema,
    searchSchema
}