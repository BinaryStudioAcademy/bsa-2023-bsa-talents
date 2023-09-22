import joi from 'joi';

import {
    CountryList,
    EmployerOnboardingValidationMessage,
    EmployerOnboardingValidationRule,
} from '../../enums/enums.js';
import { fileSizeValidator } from '../../helpers/file-size-validator.js';
import { type EmployerOnboardingDto } from '../../types/types.js';

const EmployerOnboardingValidationSchema = joi.object<
    EmployerOnboardingDto,
    true
>({
    photo: joi
        .object()
        .allow(null)
        .instance(File)
        .custom(
            fileSizeValidator(EmployerOnboardingValidationRule.MAX_FILE_SIZE),
            'File Size Validation',
        )
        .messages({
            'any.invalid': EmployerOnboardingValidationMessage.PHOTO_MAX_SIZE,
        }),

    fullName: joi
        .string()
        .trim()
        .min(EmployerOnboardingValidationRule.MIN_FULL_NAME_LENGTH)
        .max(EmployerOnboardingValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'any.required':
                EmployerOnboardingValidationMessage.FULL_NAME_REQUIRED,
            'string.empty':
                EmployerOnboardingValidationMessage.FULL_NAME_REQUIRED,
            'string.min':
                EmployerOnboardingValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max':
                EmployerOnboardingValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    employerPosition: joi
        .string()
        .trim()
        .min(EmployerOnboardingValidationRule.MIN_POSITION_LENGTH)
        .max(EmployerOnboardingValidationRule.MAX_POSITION_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'any.required':
                EmployerOnboardingValidationMessage.POSITION_REQUIRED,
            'string.empty':
                EmployerOnboardingValidationMessage.POSITION_REQUIRED,
            'string.min':
                EmployerOnboardingValidationMessage.POSITION_MIN_LENGTH,
            'string.max':
                EmployerOnboardingValidationMessage.POSITION_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.POSITION_WRONG_PATTERN,
        }),

    companyName: joi
        .string()
        .min(EmployerOnboardingValidationRule.MIN_COMPANY_NAME_LENGTH)
        .max(EmployerOnboardingValidationRule.MAX_COMPANY_NAME_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .messages({
            'string.base':
                EmployerOnboardingValidationMessage.COMPANY_NAME_NOT_STRING,
            'string.empty':
                EmployerOnboardingValidationMessage.COMPANY_NAME_REQUIRED,
            'any.required':
                EmployerOnboardingValidationMessage.COMPANY_NAME_REQUIRED,
            'string.min':
                EmployerOnboardingValidationMessage.COMPANY_NAME_MIN_LENGTH,
            'string.max':
                EmployerOnboardingValidationMessage.COMPANY_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.COMPANY_NAME_WRONG_PATTERN,
        }),

    companyWebsite: joi
        .string()
        .empty('')
        .regex(/^(www\.|http:\/\/|https:\/\/)[^.]+(\..+)+$/)
        .min(EmployerOnboardingValidationRule.MIN_LENGTH_COMPANY_WEBSITE)
        .max(EmployerOnboardingValidationRule.MAX_LENGTH_COMPANY_WEBSITE)
        .required()
        .messages({
            'any.required':
                EmployerOnboardingValidationMessage.COMPANY_WEBSITE_REQUIRED,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.COMPANY_WEBSITE_INVALID_URL,
            'string.min':
                EmployerOnboardingValidationMessage.COMPANY_WEBSITE_MIN_LENGTH,
            'string.max':
                EmployerOnboardingValidationMessage.COMPANY_WEBSITE_MAX_LENGTH,
        }),

    companyLogo: joi
        .object()
        .allow(null)
        .instance(File)
        .custom(
            fileSizeValidator(EmployerOnboardingValidationRule.MAX_FILE_SIZE),
            'File Size Validation',
        )
        .messages({
            'any.invalid':
                EmployerOnboardingValidationMessage.COMPANY_LOGO_MAX_SIZE,
        }),

    location: joi
        .string()
        .valid(...Object.values(CountryList))
        .required()
        .messages({
            'any.only': EmployerOnboardingValidationMessage.LOCATION_BASE,
            'any.required':
                EmployerOnboardingValidationMessage.LOCATION_REQUIRED,
            'string.base':
                EmployerOnboardingValidationMessage.LOCATION_NOT_STRING,
            'string.empty':
                EmployerOnboardingValidationMessage.LOCATION_REQUIRED,
        }),

    description: joi
        .string()
        .trim()
        .min(EmployerOnboardingValidationRule.MIN_DESCRIPTION_LENGTH)
        .max(EmployerOnboardingValidationRule.MAX_DESCRIPTION_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .messages({
            'string.base':
                EmployerOnboardingValidationMessage.DESCRIPTION_NOT_STRING,
            'string.max':
                EmployerOnboardingValidationMessage.DESCRIPTION_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.DESCRIPTION_WRONG_PATTERN,
        }),

    linkedinLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(EmployerOnboardingValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(EmployerOnboardingValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'any.required':
                EmployerOnboardingValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.empty':
                EmployerOnboardingValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min':
                EmployerOnboardingValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                EmployerOnboardingValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
    isApproved: joi.boolean(),
});

export { EmployerOnboardingValidationSchema };
