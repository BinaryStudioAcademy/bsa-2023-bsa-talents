import joi from 'joi';

import {
    ContactCandidateValidationMessage,
    ContactCandidateValidationRule,
} from '../enums/enums.js';
import { type ContactCandidateDto } from '../types/types.js';

const linkSchema = joi
    .string()
    .min(ContactCandidateValidationRule.MIN_LINK_LENGTH)
    .max(ContactCandidateValidationRule.MAX_LINK_LENGTH)
    .pattern(/^(www\.|http:\/\/|https:\/\/)\S+\.\S+$/i)
    .messages({
        'string.base': ContactCandidateValidationMessage.LINK_NOT_STRING,
        'string.empty': ContactCandidateValidationMessage.LINK_REQUIRED,
        'string.min': ContactCandidateValidationMessage.LINK_MIN_VALUE,
        'string.max': ContactCandidateValidationMessage.LINK_MAX_VALUE,
        'string.pattern.base': ContactCandidateValidationMessage.LINK_INVALID,
    });

const contactCandidate = joi.object<ContactCandidateDto, true>({
    links: joi
        .array()
        .items(
            joi.object({
                value: linkSchema.required(),
            }),
        )
        .min(ContactCandidateValidationRule.MIN_LINK_AMOUNT)
        .max(ContactCandidateValidationRule.MAX_LINK_AMOUNT)
        .unique((a, b) => a.value === b.value)
        .required()
        .messages({
            'array.base': ContactCandidateValidationMessage.LINKS_NOT_ARRAY,
            'array.min': ContactCandidateValidationMessage.LINKS_MIN_VALUE,
            'array.max': ContactCandidateValidationMessage.LINKS_MAX_VALUE,
            'array.unique': ContactCandidateValidationMessage.LINKS_UNIQUE,
            'any.required': ContactCandidateValidationMessage.LINKS_REQUIRED,
        }),

    message: joi
        .string()
        .trim()
        .min(ContactCandidateValidationRule.MIN_MESSAGE_LENGTH)
        .max(ContactCandidateValidationRule.MAX_MESSAGE_LENGTH)
        .required()
        .messages({
            'string.base': ContactCandidateValidationMessage.MESSAGE_NOT_STRING,
            'string.min': ContactCandidateValidationMessage.MESSAGE_MIN_VALUE,
            'string.max': ContactCandidateValidationMessage.MESSAGE_MAX_VALUE,
            'string.required':
                ContactCandidateValidationMessage.MESSAGE_REQUIRED,
            'string.empty': ContactCandidateValidationMessage.MESSAGE_REQUIRED,
        }),

    isSaveTemplate: joi.boolean().required(),

    templateName: joi.string().when('isSaveTemplate', {
        is: true,
        // eslint-disable-next-line unicorn/no-thenable
        then: joi
            .string()
            .min(ContactCandidateValidationRule.MIN_TEMPLATE_LENGTH)
            .required()
            .messages({
                'string.base':
                    ContactCandidateValidationMessage.MESSAGE_NOT_STRING,
                'string.min':
                    ContactCandidateValidationMessage.MESSAGE_MIN_VALUE,
                'string.max':
                    ContactCandidateValidationMessage.MESSAGE_MAX_VALUE,
                'string.required':
                    ContactCandidateValidationMessage.TEMPLATE_REQUIRED,
                'string.empty':
                    ContactCandidateValidationMessage.TEMPLATE_REQUIRED,
            }),
        otherwise: joi.string().allow(''),
    }),
});

export { contactCandidate };
