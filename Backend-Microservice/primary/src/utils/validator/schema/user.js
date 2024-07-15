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

updateProfileSchema

module.exports = {
    updateProfileSchema
}