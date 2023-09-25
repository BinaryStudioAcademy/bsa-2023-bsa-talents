import joi from 'joi';

import {
    Country,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    NotConsidered,
    PreferredLanguage,
} from '../enums/enums.js';
import { type UserDetailsCreateRequestDto } from '../types/types.js';
import { URL_REGEX_CONSTANT } from './constants/constants.js';

const userDetailsCreate = joi.object<UserDetailsCreateRequestDto, true>({
    userId: joi.string().trim().required(),

    profileName: joi.string().trim().allow(null),

    salaryExpectation: joi.number(),
    hiredSalary: joi.number(),

    jobTitle: joi
        .string()
        .trim()
        .valid(...Object.values(JobTitle)),
    location: joi
        .string()
        .trim()
        .valid(...Object.values(Country)),

    experienceYears: joi.number(),
    employmentType: joi.array().items(
        joi
            .string()
            .trim()
            .valid(...Object.values(EmploymentType)),
    ),

    description: joi.string(),

    englishLevel: joi
        .string()
        .trim()
        .valid(...Object.values(EnglishLevel)),
    notConsidered: joi.array().items(
        joi
            .string()
            .trim()
            .valid(...Object.values(NotConsidered)),
    ),
    preferredLanguages: joi.array().items(
        joi
            .string()
            .trim()
            .valid(...Object.values(PreferredLanguage)),
    ),

    projectLinks: joi.array().items(joi.string().trim().uri()),
    photoId: joi.string().trim(),
    fullName: joi.string().trim(),
    phone: joi.string().trim(),
    linkedinLink: joi.string().trim().uri(),
    companyName: joi.string().trim(),
    companyLogoId: joi.string().trim(),
    companyWebsite: joi.string().regex(URL_REGEX_CONSTANT),
    employerPosition: joi.string().trim(),
    cvId: joi.string().trim(),
    talentBadges: joi.array().items(joi.string().trim()),
    talentHardSkills: joi.array().items(joi.string().trim()),
    completedStep: joi.string().trim(),
});

export { userDetailsCreate };
