import joi from 'joi';

import {
    SignUpStep3ValidationMessage,
    SignUpStep3ValidationRule,
} from '../enums/enums.js';
import { type UserSignUpStep3Dto } from '../types/types.js';

const signUpStep3 = joi.object<UserSignUpStep3Dto, true>({
    hardSkills: joi
        .alternatives(
            joi
                .array()
                .items(joi.string().pattern(/^[ '.A-Za-z-]+$/))
                .min(SignUpStep3ValidationRule.HARD_SKILLS_MIN_LENGTH),
            joi.string().pattern(/^[ '.A-Za-z-]+$/),
        )
        .messages({
            'alternatives.match':
                SignUpStep3ValidationMessage.PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES,
            'string.empty': SignUpStep3ValidationMessage.HARD_SKILLS_REQUIRED,
            'any.required': SignUpStep3ValidationMessage.HARD_SKILLS_REQUIRED,
            'array.includes':
                SignUpStep3ValidationMessage.HARD_SKILLS_DIDNT_MATCH_PATTERN,
            'array.min': SignUpStep3ValidationMessage.HARD_SKILLS_REQUIRED,
        }),

    englishLevel: joi
        .string()
        .required()
        .valid(...Object.values(SignUpStep3ValidationRule.ENGLISH_LEVEL))
        .messages({
            'any.required': SignUpStep3ValidationMessage.ENGLISH_LEVEL_REQUIRED,
            'string.empty': SignUpStep3ValidationMessage.ENGLISH_LEVEL_REQUIRED,
            'any.only': SignUpStep3ValidationMessage.ENGLISH_LEVEL_REQUIRED,
        }),

    notConsidered: joi
        .array()
        .items(
            joi
                .string()
                .valid(
                    ...Object.values(SignUpStep3ValidationRule.NOT_CONSIDERED),
                ),
        )
        .min(SignUpStep3ValidationRule.NOT_CONSIDERED_MIN_LENGTH)
        .required()
        .messages({
            'array.includes':
                SignUpStep3ValidationMessage.NOT_CONSIDERED_DIDNT_MATCH_ALLOWED_TYPES,
            'array.min': SignUpStep3ValidationMessage.NOT_CONSIDERED_REQUIRED,
            'any.required':
                SignUpStep3ValidationMessage.NOT_CONSIDERED_REQUIRED,
        }),

    preferredLanguages: joi
        .array()
        .items(
            joi
                .string()
                .valid(
                    ...Object.values(
                        SignUpStep3ValidationRule.PREFERRED_LANGUAGES,
                    ),
                ),
        )
        .min(SignUpStep3ValidationRule.PREFERRED_LANGUAGES_MIN_LENGTH)
        .required()
        .messages({
            'array.empty':
                SignUpStep3ValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
            'array.includes':
                SignUpStep3ValidationMessage.PREFERRED_LANGUAGES_DIDNT_MATCH_ALLOWED_TYPES,
            'array.min':
                SignUpStep3ValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
            'any.required':
                SignUpStep3ValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
        }),

    projectLinks: joi
        .array()
        .sparse()
        .items(
            joi.object({
                url: joi
                    .string()
                    .empty('')
                    .uri()
                    .min(SignUpStep3ValidationRule.PROJECT_LINKS_MIN_LENGTH)
                    .max(SignUpStep3ValidationRule.PROJECT_LINKS_MAX_LENGTH),
            }),
        )
        .max(SignUpStep3ValidationRule.PROJECT_LINKS_MAX_LINKS)
        .messages({
            'array.max': SignUpStep3ValidationMessage.PROJECT_LINKS_MAX_LINKS,
            'array.includes':
                SignUpStep3ValidationMessage.PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES,
            'string.uri':
                SignUpStep3ValidationMessage.PROJECT_LINKS_INVALID_URL,
            'string.min': SignUpStep3ValidationMessage.PROJECT_LINKS_MIN_LENGTH,
            'string.max': SignUpStep3ValidationMessage.PROJECT_LINKS_MAX_LENGTH,
        }),
});

export { signUpStep3 };
