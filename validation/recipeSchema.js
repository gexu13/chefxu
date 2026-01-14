const BaseJoi = require('joi');
const extension = require('./joiExtension.js');

const Joi = BaseJoi.extend(extension);

const recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
})

module.exports = recipeSchema;
