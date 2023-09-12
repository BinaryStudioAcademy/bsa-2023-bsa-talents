import joi from 'joi';

import { CountryList } from '../../../user-details/enums/enums.js';
import {
    type EmployerRegistrationDto,
    EmployerRegistrationValidationMessage,
    EmployerRegistrationValidationRule,
    fileSizeValidator,
} from '../../employer.js';

const EmployerRegistrationValidationSchema = joi.object<
    EmployerRegistrationDto,
    true
>({
    photo: joi
        .object()
        .allow(null)
        .instance(File)
        .custom(
            fileSizeValidator(EmployerRegistrationValidationRule.MAX_FILE_SIZE),
            'File Size Validation',
        )
        .messages({
            'any.invalid': EmployerRegistrationValidationMessage.PHOTO_MAX_SIZE,
        }),

    fullName: joi
        .string()
        .trim()
        .min(EmployerRegistrationValidationRule.MIN_FULL_NAME_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'any.required':
                EmployerRegistrationValidationMessage.FULL_NAME_REQUIRED,
            'string.empty':
                EmployerRegistrationValidationMessage.FULL_NAME_REQUIRED,
            'string.min':
                EmployerRegistrationValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerRegistrationValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    position: joi
        .string()
        .trim()
        .min(EmployerRegistrationValidationRule.MIN_POSITION_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_POSITION_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'any.required':
                EmployerRegistrationValidationMessage.POSITION_REQUIRED,
            'string.empty':
                EmployerRegistrationValidationMessage.POSITION_REQUIRED,
            'string.min':
                EmployerRegistrationValidationMessage.POSITION_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.POSITION_MAX_LENGTH,
            'string.pattern.base':
                EmployerRegistrationValidationMessage.POSITION_WRONG_PATTERN,
        }),

    companyName: joi
        .string()
        .min(EmployerRegistrationValidationRule.MIN_COMPANY_NAME_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_COMPANY_NAME_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .messages({
            'string.base':
                EmployerRegistrationValidationMessage.COMPANY_NAME_NOT_STRING,
            'string.empty':
                EmployerRegistrationValidationMessage.COMPANY_NAME_REQUIRED,
            'any.required':
                EmployerRegistrationValidationMessage.COMPANY_NAME_REQUIRED,
            'string.min':
                EmployerRegistrationValidationMessage.COMPANY_NAME_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.COMPANY_NAME_MAX_LENGTH,
            'object.regex':
                EmployerRegistrationValidationMessage.COMPANY_NAME_WRONG_PATTERN,
        }),

    companyWebsite: joi
        .string()
        .empty('')
        .uri()
        .min(EmployerRegistrationValidationRule.MIN_LENGTH_COMPANY_WEBSITE)
        .max(EmployerRegistrationValidationRule.MAX_LENGTH_COMPANY_WEBSITE)
        .required()
        .messages({
            'any.required':
                EmployerRegistrationValidationMessage.COMPANY_WEBSITE_REQUIRED,
            'string.uri':
                EmployerRegistrationValidationMessage.COMPANY_WEBSITE_INVALID_URL,
            'string.min':
                EmployerRegistrationValidationMessage.COMPANY_WEBSITE_MIN_LENGTH,
            'string.max':
                EmployerRegistrationValidationMessage.COMPANY_WEBSITE_MAX_LENGTH,
        }),

    companyLogo: joi
        .object()
        .allow(null)
        .instance(File)
        .custom(
            fileSizeValidator(EmployerRegistrationValidationRule.MAX_FILE_SIZE),
            'File Size Validation',
        )
        .messages({
            'any.invalid':
                EmployerRegistrationValidationMessage.COMPANY_LOGO_MAX_SIZE,
        }),

    location: joi
        .string()
        .valid(...Object.values(CountryList))
        .required()
        .messages({
            'any.only': EmployerRegistrationValidationMessage.LOCATION_BASE,
            'any.required':
                EmployerRegistrationValidationMessage.LOCATION_REQUIRED,
            'string.base':
                EmployerRegistrationValidationMessage.LOCATION_NOT_STRING,
            'string.empty':
                EmployerRegistrationValidationMessage.LOCATION_REQUIRED,
        }),

    description: joi
        .string()
        .trim()
        .min(EmployerRegistrationValidationRule.MIN_DESCRIPTION_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_DESCRIPTION_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .messages({
            'string.base':
                EmployerRegistrationValidationMessage.DESCRIPTION_NOT_STRING,
            'string.max':
                EmployerRegistrationValidationMessage.DESCRIPTION_MAX_LENGTH,
            'object.regex':
                EmployerRegistrationValidationMessage.DESCRIPTION_WRONG_PATTERN,
        }),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(EmployerRegistrationValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(EmployerRegistrationValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'any.required':
                EmployerRegistrationValidationMessage.LINKEDIN_LINK_REQUIRED,
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
