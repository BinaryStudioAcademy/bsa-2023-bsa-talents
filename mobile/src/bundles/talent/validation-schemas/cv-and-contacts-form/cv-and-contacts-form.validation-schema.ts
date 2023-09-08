import joi from 'joi';

import { type CvAndContactsFormDto } from '~/bundles/talent/types/types.js';

import {
    ContactsCVStepValidationMessage,
    ContactsCVStepValidationRule,
} from '../../enums/enums.js';

const CvAndContactsFormValidationSchema = joi.object<
    CvAndContactsFormDto,
    true
>({
    photo: joi.object().instance(File).required(),
    fullName: joi
        .string()
        .trim()
        .min(ContactsCVStepValidationRule.MIN_FULL_NAME_LENGTH)
        .max(ContactsCVStepValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty': ContactsCVStepValidationMessage.FULL_NAME_REQUIRED,
            'string.min': ContactsCVStepValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max': ContactsCVStepValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                ContactsCVStepValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    phoneNumber: joi
        .string()
        .pattern(/^\+\d{12}$/)
        .required()
        .messages({
            'string.empty':
                ContactsCVStepValidationMessage.PHONE_NUMBER_REQUIRED,
            'string.pattern.base':
                ContactsCVStepValidationMessage.PHONE_NUMBER_PATTERN,
        }),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(ContactsCVStepValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(ContactsCVStepValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty':
                ContactsCVStepValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min':
                ContactsCVStepValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                ContactsCVStepValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                ContactsCVStepValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
    cv: joi.object().instance(File).required(),
});

export { CvAndContactsFormValidationSchema };
