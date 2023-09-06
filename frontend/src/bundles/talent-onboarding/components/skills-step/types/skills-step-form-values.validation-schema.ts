import joi from 'joi';
import {
    SkillsStepValidationMessage,
    SkillsStepValidationRule,
} from 'shared/build/index.js';

import { type SkillsStepFormValues } from './skills-step-form-values.js';

const SkillsStepValidationSchema = joi.object<SkillsStepFormValues, true>({
    hardSkills: joi
        .array()
        .items(
            joi.object({
                label: joi.string().pattern(/^[ '.A-Za-z-]+$/),
                value: joi.string().pattern(/^[ '.A-Za-z-]+$/),
            }),
        )
        .min(SkillsStepValidationRule.HARD_SKILLS_MIN_LENGTH)
        .messages({
            'string.empty': SkillsStepValidationMessage.HARD_SKILLS_REQUIRED,
            'any.required': SkillsStepValidationMessage.HARD_SKILLS_REQUIRED,
            'array.includes':
                SkillsStepValidationMessage.HARD_SKILLS_DIDNT_MATCH_PATTERN,
            'array.min': SkillsStepValidationMessage.HARD_SKILLS_REQUIRED,
        }),

    englishLevel: joi
        .string()
        .required()
        .valid(...Object.values(SkillsStepValidationRule.ENGLISH_LEVEL))
        .messages({
            'any.required': SkillsStepValidationMessage.ENGLISH_LEVEL_REQUIRED,
            'string.empty': SkillsStepValidationMessage.ENGLISH_LEVEL_REQUIRED,
            'any.only': SkillsStepValidationMessage.ENGLISH_LEVEL_REQUIRED,
        }),

    notConsidered: joi
        .array()
        .items(
            joi
                .string()
                .valid(
                    ...Object.values(SkillsStepValidationRule.NOT_CONSIDERED),
                ),
        )
        .min(SkillsStepValidationRule.NOT_CONSIDERED_MIN_LENGTH)
        .required()
        .messages({
            'array.includes':
                SkillsStepValidationMessage.NOT_CONSIDERED_DIDNT_MATCH_ALLOWED_TYPES,
            'array.min': SkillsStepValidationMessage.NOT_CONSIDERED_REQUIRED,
            'any.required': SkillsStepValidationMessage.NOT_CONSIDERED_REQUIRED,
        }),

    preferredLanguages: joi
        .array()
        .items(
            joi
                .string()
                .valid(
                    ...Object.values(
                        SkillsStepValidationRule.PREFERRED_LANGUAGES,
                    ),
                ),
        )
        .min(SkillsStepValidationRule.PREFERRED_LANGUAGES_MIN_LENGTH)
        .required()
        .messages({
            'array.empty':
                SkillsStepValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
            'array.includes':
                SkillsStepValidationMessage.PREFERRED_LANGUAGES_DIDNT_MATCH_ALLOWED_TYPES,
            'array.min':
                SkillsStepValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
            'any.required':
                SkillsStepValidationMessage.PREFERRED_LANGUAGES_REQUIRED,
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
                    .min(SkillsStepValidationRule.PROJECT_LINKS_MIN_LENGTH)
                    .max(SkillsStepValidationRule.PROJECT_LINKS_MAX_LENGTH),
            }),
        )
        .max(SkillsStepValidationRule.PROJECT_LINKS_MAX_LINKS)
        .messages({
            'array.max': SkillsStepValidationMessage.PROJECT_LINKS_MAX_LINKS,
            'array.includes':
                SkillsStepValidationMessage.PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES,
            'string.uri': SkillsStepValidationMessage.PROJECT_LINKS_INVALID_URL,
            'string.min': SkillsStepValidationMessage.PROJECT_LINKS_MIN_LENGTH,
            'string.max': SkillsStepValidationMessage.PROJECT_LINKS_MAX_LENGTH,
        }),
});

export { SkillsStepValidationSchema };