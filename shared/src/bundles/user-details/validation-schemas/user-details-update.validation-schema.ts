import joi from 'joi';

import {
    CompletedStep,
    Country,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    NotConsidered,
    PreferredLanguage,
    SearchType,
    UserDetailsUpdateValidationRule,
    UserDetailsValidationMessage,
} from '../enums/enums.js';
import { type UserDetailsUpdateRequestDto } from '../types/types.js';

const userDetailsUpdate = joi
    .object<UserDetailsUpdateRequestDto>({
        id: joi.string().trim(),

        userId: joi.string().trim(),

        deniedReason: joi.string().trim().messages({
            'string.base':
                UserDetailsValidationMessage.DENIED_REASON_NOT_STRING,
        }),

        isApproved: joi.boolean().messages({
            'boolean.base':
                UserDetailsValidationMessage.IS_APPROVED_NOT_BOOLEAN,
        }),

        isHired: joi.boolean().messages({
            'boolean.base': UserDetailsValidationMessage.IS_HIRED_NOT_BOOLEAN,
        }),

        profileName: joi
            .string()
            .min(UserDetailsUpdateValidationRule.MIN_PROFILE_NAME_LENGTH)
            .max(UserDetailsUpdateValidationRule.MAX_PROFILE_NAME_LENGTH)
            .pattern(/^[ '.A-Za-z-]+$/)
            .messages({
                'string.base':
                    UserDetailsValidationMessage.PROFILE_NAME_NOT_STRING,
                'string.min':
                    UserDetailsValidationMessage.PROFILE_NAME_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.PROFILE_NAME_MAX_LENGTH,
                'string.pattern.base':
                    UserDetailsValidationMessage.PROFILE_NAME_WRONG_PATTERN,
            }),

        salaryExpectation: joi
            .number()
            .integer()
            .min(UserDetailsUpdateValidationRule.MIN_SALARY_EXPECTATION)
            .max(UserDetailsUpdateValidationRule.MIN_SALARY_EXPECTATION)
            .messages({
                'number.base':
                    UserDetailsValidationMessage.SALARY_EXPECTATION_NOT_NUMBER,
                'number.min':
                    UserDetailsValidationMessage.SALARY_EXPECTATION_MIN_VALUE,
                'number.max':
                    UserDetailsValidationMessage.SALARY_EXPECTATION_MAX_VALUE,
            }),

        hiredSalary: joi
            .number()
            .integer()
            .min(UserDetailsUpdateValidationRule.MIN_HIRED_SALARY)
            .max(UserDetailsUpdateValidationRule.MAX_HIRED_SALARY)
            .messages({
                'number.base':
                    UserDetailsValidationMessage.HIRED_SALARY_NOT_NUMBER,
                'number.min':
                    UserDetailsValidationMessage.HIRED_SALARY_MIN_VALUE,
                'number.max':
                    UserDetailsValidationMessage.HIRED_SALARY_MAX_VALUE,
            }),

        jobTitle: joi
            .string()
            .valid(...Object.values(JobTitle))
            .messages({
                'any.only': UserDetailsValidationMessage.JOB_TITLE_BASE,
                'string.base':
                    UserDetailsValidationMessage.JOB_TITLE_NOT_STRING,
                'string.length': UserDetailsValidationMessage.JOB_TITLE_LENGTH,
            }),

        location: joi
            .string()
            .valid(...Object.values(Country))
            .messages({
                'any.only': UserDetailsValidationMessage.LOCATION_BASE,
                'string.base': UserDetailsValidationMessage.LOCATION_NOT_STRING,
            }),

        experienceYears: joi.number().messages({
            'number.base':
                UserDetailsValidationMessage.EXPERIENCE_YEARS_NOT_NUMBER,
        }),

        employmentType: joi
            .array()
            .items(joi.string().valid(...Object.values(EmploymentType)))
            .min(UserDetailsUpdateValidationRule.EMPLOYMENT_TYPES_MIN_LENGTH)
            .messages({
                'any.invalid':
                    UserDetailsValidationMessage.EMPLOYMENT_TYPES_BASE,
            }),

        description: joi
            .string()
            .min(
                UserDetailsUpdateValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH,
            )
            .max(
                UserDetailsUpdateValidationRule.MAX_EXPERIENCE_DESCRIPTION_LENGTH,
            )
            .messages({
                'string.base':
                    UserDetailsValidationMessage.DESCRIPTION_NOT_STRING,
                'string.min':
                    UserDetailsValidationMessage.DESCRIPTION_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.DESCRIPTION_MAX_LENGTH,
            }),

        englishLevel: joi
            .string()
            .trim()
            .valid(...Object.values(EnglishLevel))
            .messages({
                'array.includes':
                    UserDetailsValidationMessage.PREFERRED_ENGLISH_LEVEL_DIDNT_MATCH_ALLOWED_TYPES,
            }),

        notConsidered: joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(NotConsidered))
                .messages({
                    'array.includes':
                        UserDetailsValidationMessage.PREFERRED_NOTCONSIDERED_DIDNT_MATCH_ALLOWED_TYPES,
                }),
        ),

        preferredLanguages: joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(PreferredLanguage))
                .messages({
                    'array.includes':
                        UserDetailsValidationMessage.PREFERRED_LANGUAGES_DIDNT_MATCH_ALLOWED_TYPES,
                }),
        ),

        projectLinks: joi
            .array()
            .sparse()
            .items(
                joi.object({
                    url: joi
                        .string()
                        .empty('')
                        .uri({
                            scheme: ['http', 'https', 'ftp'],
                            allowRelative: true,
                        })
                        .min(
                            UserDetailsUpdateValidationRule.PROJECT_LINKS_MIN_LENGTH,
                        )
                        .max(
                            UserDetailsUpdateValidationRule.PROJECT_LINKS_MAX_LENGTH,
                        ),
                }),
                joi.allow(null),
            )
            .max(UserDetailsUpdateValidationRule.PROJECT_LINKS_MAX_LINKS)
            .allow(null)
            .messages({
                'array.max':
                    UserDetailsValidationMessage.PROJECT_LINKS_MAX_LINKS,
                'array.includes':
                    UserDetailsValidationMessage.PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES,
                'string.uriCustomScheme':
                    UserDetailsValidationMessage.PROJECT_LINKS_INVALID_URL,
                'string.min':
                    UserDetailsValidationMessage.PROJECT_LINKS_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.PROJECT_LINKS_MAX_LENGTH,
            }),

        fullName: joi
            .string()
            .trim()
            .min(UserDetailsUpdateValidationRule.MIN_FULL_NAME_LENGTH)
            .max(UserDetailsUpdateValidationRule.MAX_FULL_NAME_LENGTH)
            .pattern(/^[ '.A-Za-z-]+$/)
            .messages({
                'string.min': UserDetailsValidationMessage.FULL_NAME_MIN_LENGTH,
                'string.max': UserDetailsValidationMessage.FULL_NAME_MAX_LENGTH,
                'string.pattern.base':
                    UserDetailsValidationMessage.FULL_NAME_WRONG_PATTERN,
            }),

        linkedinLink: joi
            .string()
            .trim()
            .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
            .min(UserDetailsUpdateValidationRule.MIN_LINKEDIN_LINK_LENGTH)
            .max(UserDetailsUpdateValidationRule.MAX_LINKEDIN_LINK_LENGTH)
            .messages({
                'string.min':
                    UserDetailsValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
                'string.pattern.base':
                    UserDetailsValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
            }),

        searchType: joi
            .string()
            .trim()
            .valid(...Object.values(SearchType)),

        photoId: joi.string().trim(),

        companyName: joi
            .string()
            .min(UserDetailsUpdateValidationRule.MIN_COMPANY_NAME_LENGTH)
            .max(UserDetailsUpdateValidationRule.MAX_COMPANY_NAME_LENGTH)
            .regex(/^[\s\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}-]*$/)
            .messages({
                'string.base':
                    UserDetailsValidationMessage.COMPANY_NAME_NOT_STRING,
                'string.min':
                    UserDetailsValidationMessage.COMPANY_NAME_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.COMPANY_NAME_MAX_LENGTH,
                'string.pattern.base':
                    UserDetailsValidationMessage.COMPANY_NAME_WRONG_PATTERN,
            }),

        companyLogoId: joi.string().trim(),

        companyWebsite: joi
            .string()
            .empty('')
            .regex(UserDetailsUpdateValidationRule.URL_REGEX_CONSTANT)
            .min(UserDetailsUpdateValidationRule.MIN_LENGTH_COMPANY_WEBSITE)
            .max(UserDetailsUpdateValidationRule.MAX_LENGTH_COMPANY_WEBSITE)
            .messages({
                'string.pattern.base':
                    UserDetailsValidationMessage.COMPANY_WEBSITE_INVALID_URL,
                'string.min':
                    UserDetailsValidationMessage.COMPANY_WEBSITE_MIN_LENGTH,
                'string.max':
                    UserDetailsValidationMessage.COMPANY_WEBSITE_MAX_LENGTH,
            }),

        employerPosition: joi
            .string()
            .trim()
            .min(UserDetailsUpdateValidationRule.MIN_POSITION_LENGTH)
            .max(UserDetailsUpdateValidationRule.MAX_POSITION_LENGTH)
            .pattern(/^[ '.A-Za-z-]+$/)
            .messages({
                'string.min': UserDetailsValidationMessage.POSITION_MIN_LENGTH,
                'string.max': UserDetailsValidationMessage.POSITION_MAX_LENGTH,
                'string.pattern.base':
                    UserDetailsValidationMessage.POSITION_WRONG_PATTERN,
            }),

        cvId: joi.string().trim(),

        talentBadges: joi.array().items(joi.string().trim()),

        talentHardSkills: joi.array().items(joi.string().trim()),

        completedStep: joi
            .string()
            .trim()
            .valid(...Object.values(CompletedStep)),
    })
    .or('id', 'userId');

export { userDetailsUpdate };
