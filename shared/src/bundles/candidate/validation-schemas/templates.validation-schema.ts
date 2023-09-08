import joi from 'joi';

import {
    ContactCandidateValidationMessage,
    ContactCandidateValidationRule,
} from '../enums/enums.js';

const templateSchema = joi.string();

const TemplatesValidationSchema = joi.object({
    templates: joi
        .array()
        .items(
            joi.object({
                name: templateSchema.required(),
            }),
        )
        .max(ContactCandidateValidationRule.MAX_LINK_AMOUNT)
        .unique((a, b) => a.value === b.value)
        .messages({
            'array.base': ContactCandidateValidationMessage.LINKS_NOT_ARRAY,
            'array.min': ContactCandidateValidationMessage.LINKS_MIN_VALUE,
            'array.max': ContactCandidateValidationMessage.LINKS_MAX_VALUE,
            'array.unique': ContactCandidateValidationMessage.LINKS_UNIQUE,
            'any.required': ContactCandidateValidationMessage.LINKS_REQUIRED,
        }),
});

export { TemplatesValidationSchema };
