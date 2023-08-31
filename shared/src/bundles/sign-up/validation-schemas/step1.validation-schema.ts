import joi from 'joi';

import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '../../users/enums/enums.js';
import {
    SignUpStep1ValidationMessage,
    SignUpStep1ValidationRule,
} from '../enums/enums.js';
import { type UserSignUpStep1Dto } from '../types/types.js';

const signUpStep1 = joi.object<UserSignUpStep1Dto, true>({
    profileName: joi
        .string()
        .min(SignUpStep1ValidationRule.MIN_PROFILE_NAME_LENGTH)
        .max(SignUpStep1ValidationRule.MAX_PROFILE_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.base': SignUpStep1ValidationMessage.PROFILE_NAME_NOT_STRING,
            'string.empty': SignUpStep1ValidationMessage.PROFILE_NAME_REQUIRED,
            'string.min': SignUpStep1ValidationMessage.PROFILE_NAME_MIN_LENGTH,
            'string.max': SignUpStep1ValidationMessage.PROFILE_NAME_MAX_LENGTH,
            'string.pattern.base':
                SignUpStep1ValidationMessage.PROFILE_NAME_WRONG_PATTERN,
        }),

    salaryExpectation: joi
        .string()
        .min(SignUpStep1ValidationRule.MIN_SALARY_EXPECTATIONS_LENGTH)
        .max(SignUpStep1ValidationRule.MAX_SALARY_EXPECTATIONS_LENGTH)
        .pattern(/^\d+$/)
        .required()
        .messages({
            'string.base':
                SignUpStep1ValidationMessage.SALARY_EXPECTATIONS_NOT_STRING,
            'string.empty':
                SignUpStep1ValidationMessage.SALARY_EXPECTATIONS_REQUIRED,
            'string.length':
                SignUpStep1ValidationMessage.SALARY_EXPECTATIONS_LENGTH,
            'string.pattern.base':
                SignUpStep1ValidationMessage.SALARY_EXPECTATIONS_WRONG_PATTERN,
        }),

    jobTitle: joi
        .string()
        .valid(...Object.values(JobTitle))
        .required()
        .messages({
            'any.only': SignUpStep1ValidationMessage.JOB_TITLE_BASE,
            'string.base': SignUpStep1ValidationMessage.JOB_TITLE_NOT_STRING,
            'string.empty': SignUpStep1ValidationMessage.JOB_TITLE_REQUIRED,
            'string.length': SignUpStep1ValidationMessage.JOB_TITLE_LENGTH,
        }),

    experienceYears: joi.number().required().messages({
        'number.base': SignUpStep1ValidationMessage.EXPERIENCE_YEARS_NOT_NUMBER,
        'number.empty': SignUpStep1ValidationMessage.EXPERIENCE_YEARS_REQUIRED,
    }),

    location: joi
        .string()
        .valid(...Object.values(CountryList))
        .required()
        .messages({
            'any.only': SignUpStep1ValidationMessage.LOCATION_BASE,
            'string.base': SignUpStep1ValidationMessage.LOCATION_NOT_STRING,
            'string.empty': SignUpStep1ValidationMessage.LOCATION_REQUIRED,
        }),

    employmentTypes: joi
        .array()
        .items(joi.string().valid(...Object.values(EmploymentType)))
        .min(SignUpStep1ValidationRule.EMPLOYMENT_TYPES_MIN_LENGTH)
        .required()
        .messages({
            'array.base': 'smth wrong with emplTypes',
            'array.min': SignUpStep1ValidationMessage.EMPLOYMENT_TYPES_REQUIRED,
        }),

    description: joi
        .string()
        .min(SignUpStep1ValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH)
        .max(SignUpStep1ValidationRule.MAX_EXPERIENCE_DESCRIPTION_LENGTH)
        .required()
        .messages({
            'string.base': SignUpStep1ValidationMessage.DESCRIPTION_NOT_STRING,
            'string.empty': SignUpStep1ValidationMessage.DESCRIPTION_REQUIRED,
            'string.min': SignUpStep1ValidationMessage.DESCRIPTION_MIN_LENGTH,
            'string.max': SignUpStep1ValidationMessage.DESCRIPTION_MAX_LENGTH,
        }),
});

export { signUpStep1 };
