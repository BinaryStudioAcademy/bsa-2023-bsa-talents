import joi from 'joi';

import {
    EmployerRegistrationValidationMessage,
    EmployerRegistrationValidationRule,
} from '../../enums/enums.js';
import { type EmployerRegistrationDto } from '../../types/types.js';

const EmployerRegistrationValidationSchema = joi.object<
    EmployerRegistrationDto,
    true
>({
    photo: joi.object().instance(File).required(),
    fullName: joi
        .string()
        .trim()
        .min(EmployerRegistrationValidationRule.MIN_FULL_NAME_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty':
                EmployerRegistrationValidationMessage.FULL_NAME_REQUIRED,
            'string.min':
                EmployerRegistrationValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerRegistrationValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    position: joi.string().trim(),
    companyName: joi.string().trim(),
    companyWebsite: joi.string().trim().uri(),
    companyLogo: joi.object().instance(File).required(),
    location: joi.string().trim(),
    description: joi.string().trim(),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(EmployerRegistrationValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty':
                EmployerRegistrationValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min':
                EmployerRegistrationValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                EmployerRegistrationValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
});

export { EmployerRegistrationValidationSchema };
