const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': `"title" should be a type of 'text'`,
        'any.required': `"title" is a required field`
    }),
    description: Joi.string().required().messages({
        'string.base': `"description" should be a type of 'text'`,
        'any.required': `"description" is a required field`
    }),
    category: Joi.string().required().messages({
        'string.base': `"category" should be a type of 'text'`,
        'any.required': `"category" is a required field`
    }),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required().messages({
        'string.base': `"level" should be a type of 'text'`,
        'any.required': `"level" is a required field`,
        'any.only': `"level" must be one of ['Beginner', 'Intermediate', 'Advanced']`
    }),
    thumbnailUrl: Joi.string().uri().allow('').optional().messages({
        'string.uri': `"thumbnailUrl" should be a valid URI`
    }),
    language: Joi.string().required().messages({
        'string.base': `"language" should be a type of 'text'`,
        'any.required': `"language" is a required field`
    }),
    tags: Joi.array().items(
        Joi.string().required().messages({
            'string.base': `"tags[].value" should be a type of 'text'`,
            'any.required': `"tags[].value" is a required field`
        })
    ).required().messages({
        'array.base': `"tags" should be an array`,
        'any.required': `"tags" is a required field`
    }),
    options: Joi.object({
        requirements: Joi.array().items(Joi.string().required().messages({
            'string.base': `"options.requirements[].value" should be a type of 'text'`,
            'any.required': `"options.requirements[].value" is a required field`
        })).required()
    }).required().messages({
        'object.base': `"options" should be an object`,
        'any.required': `"options" is a required field`
    })
});


const uploadAttachments = Joi.object({
    videoId: Joi.string().required().messages({
        'integer.base': `"videoId" should be a type of 'integer'`,
        'any.required': `"videoId" is a required field`
    })
})

module.exports = { createCourseSchema, uploadAttachments };
