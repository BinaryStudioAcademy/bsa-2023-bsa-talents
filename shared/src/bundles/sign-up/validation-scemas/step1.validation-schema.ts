import joi from 'joi';

import {
    SignUpStep1ValidationMessage,
    SignUpStep1ValidationRule,
} from '../enums/enums';
import { type UserSignUpStep1Dto } from '../types/types.js';

// const YearsOfExperience = createNumberRangeArray(
//     SignUpStep1ValidationRule.MIN_YEARS_OF_EXPERIENCE,
//     SignUpStep1ValidationRule.MAX_YEARS_OF_EXPERIENCE,
//     SignUpStep1ValidationRule.YEARS_OF_EXPERIENCE_STEP,
// );

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
        // .valid(...SignUpStep1ValidationRule.JOB_TITLES)
        .required()
        .messages({
            'string.base': SignUpStep1ValidationMessage.JOB_TITLE_NOT_STRING,
            'string.empty': SignUpStep1ValidationMessage.JOB_TITLE_REQUIRED,
            'string.length': SignUpStep1ValidationMessage.JOB_TITLE_LENGTH,
            'string.pattern.base':
                SignUpStep1ValidationMessage.JOB_TITLE_WRONG_PATTERN,
        }),

    experienceYears: joi
        .number()
        // .valid(
        //     ...YearsOfExperience,
        //     SignUpStep1ValidationRule.MAX_YEARS_OF_EXPERIENCE_STRING,
        // )
        .required()
        .messages({
            'number.base':
                SignUpStep1ValidationMessage.EXPERIENCE_YEARS_NOT_NUMBER,
            'number.empty':
                SignUpStep1ValidationMessage.EXPERIENCE_YEARS_REQUIRED,
        }),

    location: joi.string().required().messages({
        'string.base': SignUpStep1ValidationMessage.LOCATION_NOT_STRING,
        'string.empty': SignUpStep1ValidationMessage.LOCATION_REQUIRED,
    }),

    employmentTypes: joi
        .array()
        // .items(joi.string().valid(...SignUpStep1ValidationRule.EMPLOYMENT_TYPES))
        .min(SignUpStep1ValidationRule.EMPLOYMENT_TYPES_MIN_LENGTH)
        .required()
        .messages({
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
