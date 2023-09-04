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
        .number()
        .integer()
        .min(SignUpStep1ValidationRule.MIN_SALARY_EXPECTATION)
        .max(SignUpStep1ValidationRule.MAX_SALARY_EXPECTATION)
        .required()
        .messages({
            'number.base':
                SignUpStep1ValidationMessage.SALARY_EXPECTATION_NOT_NUMBER,
            'number.min':
                SignUpStep1ValidationMessage.SALARY_EXPECTATION_MIN_VALUE,
            'number.max':
                SignUpStep1ValidationMessage.SALARY_EXPECTATION_MAX_VALUE,
            'any.required':
                SignUpStep1ValidationMessage.SALARY_EXPECTATION_REQUIRED,
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
            'array.min': SignUpStep1ValidationMessage.EMPLOYMENT_TYPES_REQUIRED,
            'any.invalid': SignUpStep1ValidationMessage.EMPLOYMENT_TYPES_BASE,
        }),

    description: joi
        .string()
        .min(SignUpStep1ValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH)
        .max(SignUpStep1ValidationRule.MAX_EXPERIENCE_DESCRIPTION_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .required()
        .messages({
            'string.base': SignUpStep1ValidationMessage.DESCRIPTION_NOT_STRING,
            'string.min': SignUpStep1ValidationMessage.DESCRIPTION_MIN_LENGTH,
            'string.empty': SignUpStep1ValidationMessage.DESCRIPTION_EMPTY,
            'string.max': SignUpStep1ValidationMessage.DESCRIPTION_MAX_LENGTH,
            'any.required': SignUpStep1ValidationMessage.DESCRIPTION_REQUIRED,
        }),
});

export { signUpStep1 };
