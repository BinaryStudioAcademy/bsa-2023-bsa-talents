import joi from 'joi';

import { CountryList } from '~/bundles/common/enums/enums';
import {
    EmployerOnboardingFormValidationMessage,
    EmployerOnboardingFormValidationRule,
} from '~/bundles/employer/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types.js';

const EmployerOnboardingFormValidationSchema = joi.object<
    EmployerOnboardingFormDto,
    true
>({
    profilePhoto: joi.object().required(),
    companyLogo: joi.object().allow(null),
    fullName: joi
        .string()
        .trim()
        .min(EmployerOnboardingFormValidationRule.MIN_FULL_NAME_LENGTH)
        .max(EmployerOnboardingFormValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.FULL_NAME_REQUIRED,
            'string.min':
                EmployerOnboardingFormValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max':
                EmployerOnboardingFormValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingFormValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    position: joi
        .string()
        .trim()
        .min(EmployerOnboardingFormValidationRule.MIN_POSITION_LENGTH)
        .max(EmployerOnboardingFormValidationRule.MAX_POSITION_LENGTH)
        .pattern(/^[\sA-Za-z]+$/)
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.POSITION_REQUIRED,
            'string.min':
                EmployerOnboardingFormValidationMessage.POSITION_MIN_LENGTH,
            'string.max':
                EmployerOnboardingFormValidationMessage.POSITION_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingFormValidationMessage.POSITION_WRONG_PATTERN,
        }),

    companyName: joi
        .string()
        .trim()
        .min(EmployerOnboardingFormValidationRule.MIN_COMPANY_NAME_LENGTH)
        .max(EmployerOnboardingFormValidationRule.MAX_COMPANY_NAME_LENGTH)
        .pattern(/^[\s\w!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+$/)
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.COMPANY_NAME_REQUIRED,
            'string.min':
                EmployerOnboardingFormValidationMessage.COMPANY_NAME_MIN_LENGTH,
            'string.max':
                EmployerOnboardingFormValidationMessage.COMPANY_NAME_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingFormValidationMessage.COMPANY_NAME_WRONG_PATTERN,
        }),

    linkedinLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(EmployerOnboardingFormValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(EmployerOnboardingFormValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min':
                EmployerOnboardingFormValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                EmployerOnboardingFormValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                EmployerOnboardingFormValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),

    companyWebsite: joi
        .string()
        .uri()
        .min(
            EmployerOnboardingFormValidationRule.MIN_COMPANY_WEBSITE_LINK_LENGTH,
        )
        .max(
            EmployerOnboardingFormValidationRule.MAX_COMPANY_WEBSITE_LINK_LENGTH,
        )
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.COMPANY_WEBSITE_LINK_REQUIRED,
            'string.min':
                EmployerOnboardingFormValidationMessage.COMPANY_WEBSITE_LENGTH,
            'string.max':
                EmployerOnboardingFormValidationMessage.COMPANY_WEBSITE_MAX_LENGTH,
            'string.uri':
                EmployerOnboardingFormValidationMessage.COMPANY_WEBSITE_WRONG_PATTERN,
        }),

    location: joi
        .string()
        .valid(...Object.values(CountryList))
        .required()
        .messages({
            'any.only': EmployerOnboardingFormValidationMessage.LOCATION_BASE,
            'string.base':
                EmployerOnboardingFormValidationMessage.LOCATION_NOT_STRING,
            'string.empty':
                EmployerOnboardingFormValidationMessage.LOCATION_REQUIRED,
        }),

    description: joi
        .string()
        .trim()
        .max(EmployerOnboardingFormValidationRule.MAX_DESCRIPTION_LENGTH)
        .pattern(/^[\s\w!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+$/)
        .required()
        .messages({
            'string.empty':
                EmployerOnboardingFormValidationMessage.DESCRIPTION_REQUIRED,
            'string.max':
                EmployerOnboardingFormValidationMessage.DESCRIPTION_MAX_LENGTH,
        }),
});

export { EmployerOnboardingFormValidationSchema };
