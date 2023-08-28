import joi from 'joi';

import { createNumberRangeArray } from '../../../helpers/helpers.js';
import {
    SignUpStep1ValidationMessage,
    SignUpStep1ValidationRule,
} from '../enums/enums.js';
import { type UserSignUpStep1Dto } from '../types/types.js';

const YearsOfExperience = createNumberRangeArray(
    SignUpStep1ValidationRule.MIN_YEARS_OF_EXPERIENCE,
    SignUpStep1ValidationRule.MAX_YEARS_OF_EXPERIENCE,
    SignUpStep1ValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

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
        .min(SignUpStep1ValidationRule.MAX_SALARY_EXPECTATIONS_LENGTH)
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
        .valid(...SignUpStep1ValidationRule.JOB_TITLES)
        .required(),

    experienceYears: joi
        .number()
        .valid(
            ...YearsOfExperience,
            SignUpStep1ValidationRule.MAX_YEARS_OF_EXPERIENCE_STRING,
        )
        .required(),

    location: joi.string().required(),

    employmentTypes: joi
        .array()
        .required()
        .items(
            joi.string().valid(...SignUpStep1ValidationRule.EMPLOYMENT_TYPES),
        ),

    description: joi
        .string()
        .min(SignUpStep1ValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH)
        .max(SignUpStep1ValidationRule.MAX_EXPERIENCE_DESCRIPTION_LENGTH)
        .required(),
});

export { signUpStep1 };
