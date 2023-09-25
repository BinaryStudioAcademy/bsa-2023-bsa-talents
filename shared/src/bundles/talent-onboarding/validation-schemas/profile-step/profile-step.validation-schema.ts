import joi from 'joi';

import {
    Country,
    EmploymentType,
    JobTitle,
} from '../../../user-details/enums/enums.js';
import {
    ProfileStepValidationMessage,
    ProfileStepValidationRule,
} from '../../enums/enums.js';
import { type ProfileStepDto } from '../../types/types.js';

const ProfileStepValidationSchema = joi.object<ProfileStepDto, true>({
    profileName: joi
        .string()
        .min(ProfileStepValidationRule.MIN_PROFILE_NAME_LENGTH)
        .max(ProfileStepValidationRule.MAX_PROFILE_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.base': ProfileStepValidationMessage.PROFILE_NAME_NOT_STRING,
            'string.empty': ProfileStepValidationMessage.PROFILE_NAME_REQUIRED,
            'string.min': ProfileStepValidationMessage.PROFILE_NAME_MIN_LENGTH,
            'string.max': ProfileStepValidationMessage.PROFILE_NAME_MAX_LENGTH,
            'string.pattern.base':
                ProfileStepValidationMessage.PROFILE_NAME_WRONG_PATTERN,
        }),

    salaryExpectation: joi
        .number()
        .integer()
        .min(ProfileStepValidationRule.MIN_SALARY_EXPECTATION)
        .max(ProfileStepValidationRule.MAX_SALARY_EXPECTATION)
        .required()
        .messages({
            'number.base':
                ProfileStepValidationMessage.SALARY_EXPECTATION_NOT_NUMBER,
            'number.min':
                ProfileStepValidationMessage.SALARY_EXPECTATION_MIN_VALUE,
            'number.max':
                ProfileStepValidationMessage.SALARY_EXPECTATION_MAX_VALUE,
            'any.required':
                ProfileStepValidationMessage.SALARY_EXPECTATION_REQUIRED,
        }),

    jobTitle: joi
        .string()
        .valid(...Object.values(JobTitle))
        .required()
        .messages({
            'any.only': ProfileStepValidationMessage.JOB_TITLE_BASE,
            'string.base': ProfileStepValidationMessage.JOB_TITLE_NOT_STRING,
            'string.empty': ProfileStepValidationMessage.JOB_TITLE_REQUIRED,
            'string.length': ProfileStepValidationMessage.JOB_TITLE_LENGTH,
        }),

    experienceYears: joi.number().required().messages({
        'number.base': ProfileStepValidationMessage.EXPERIENCE_YEARS_NOT_NUMBER,
        'number.empty': ProfileStepValidationMessage.EXPERIENCE_YEARS_REQUIRED,
    }),

    location: joi
        .string()
        .valid(...Object.values(Country))
        .required()
        .messages({
            'any.only': ProfileStepValidationMessage.LOCATION_BASE,
            'string.base': ProfileStepValidationMessage.LOCATION_NOT_STRING,
            'string.empty': ProfileStepValidationMessage.LOCATION_REQUIRED,
        }),

    employmentType: joi
        .array()
        .items(joi.string().valid(...Object.values(EmploymentType)))
        .min(ProfileStepValidationRule.EMPLOYMENT_TYPES_MIN_LENGTH)
        .required()
        .messages({
            'array.min': ProfileStepValidationMessage.EMPLOYMENT_TYPES_REQUIRED,
            'any.invalid': ProfileStepValidationMessage.EMPLOYMENT_TYPES_BASE,
        }),

    description: joi
        .string()
        .min(ProfileStepValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH)
        .max(ProfileStepValidationRule.MAX_EXPERIENCE_DESCRIPTION_LENGTH)
        .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
        .required()
        .messages({
            'string.base': ProfileStepValidationMessage.DESCRIPTION_NOT_STRING,
            'string.min': ProfileStepValidationMessage.DESCRIPTION_MIN_LENGTH,
            'string.empty': ProfileStepValidationMessage.DESCRIPTION_EMPTY,
            'string.max': ProfileStepValidationMessage.DESCRIPTION_MAX_LENGTH,
            'any.required': ProfileStepValidationMessage.DESCRIPTION_REQUIRED,
        }),
});

export { ProfileStepValidationSchema };
