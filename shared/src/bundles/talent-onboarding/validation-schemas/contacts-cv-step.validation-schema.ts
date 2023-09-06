import joi from 'joi';

import {
    ContactsCVStepValidationMessage,
    ContactsCVStepValidationRule,
} from '../enums/enums.js';
import { type ContactsCVStepDto } from '../types/types';

const ContactsCVStepValidationSchema = joi.object<ContactsCVStepDto, true>({
    photoId: joi.object().keys({
        size: joi
            .number()
            .integer()
            .max(ContactsCVStepValidationRule.IMAGE_MAX_SIZE)
            .messages({
                'number.max': ContactsCVStepValidationMessage.IMG_MAX_SIZE,
            }),
        uri: joi
            .string()
            .regex(ContactsCVStepValidationRule.IMAGE_TYPE_REGEX)
            .messages({
                'string.pattern.base': ContactsCVStepValidationMessage.IMG_TYPE,
            }),
    }),

    fullName: joi
        .string()
        .trim()
        .min(ContactsCVStepValidationRule.MIN_FULL_NAME_LENGTH)
        .max(ContactsCVStepValidationRule.MAX_FULL_NAME_LENGTH)
        .regex(ContactsCVStepValidationRule.FULL_NAME_REGEX)
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
        .regex(ContactsCVStepValidationRule.PHONE_NUMBER_REGEX)
        .required()
        .messages({
            'string.empty':
                ContactsCVStepValidationMessage.PHONE_NUMBER_REQUIRED,
            'string.pattern.base':
                ContactsCVStepValidationMessage.PHONE_NUMBER_PATTERN,
        }),

    linkedinLink: joi
        .string()
        .min(ContactsCVStepValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(ContactsCVStepValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .regex(ContactsCVStepValidationRule.LINKEDIN_REGEX)
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

    cv: joi.object().keys({
        size: joi
            .number()
            .integer()
            .max(ContactsCVStepValidationRule.CV_MAX_SIZE)
            .messages({
                'number.max': ContactsCVStepValidationMessage.CV_MAX_SIZE,
            }),
        name: joi
            .string()
            .regex(ContactsCVStepValidationRule.CV_TYPE_REGEX)
            .required()
            .messages({
                'string.empty': ContactsCVStepValidationMessage.CV_REQUIRED,
                'string.pattern.base':
                    ContactsCVStepValidationMessage.CV_TYPE_REGEX,
            }),
        uri: joi.string(),
    }),
});

export { ContactsCVStepValidationSchema };
