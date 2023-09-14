import joi from 'joi';

import {
    CountryList,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    NotConsidered,
    PreferredLanguages,
} from '../enums/enums.js';
import { type UserDetailsCreateRequestDto } from '../types/types.js';

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
        .valid(...Object.values(CountryList)),

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
            .valid(...Object.values(PreferredLanguages)),
    ),

    projectLinks: joi.array().items(joi.string().trim().uri()),
    photoId: joi.string().trim(),
    fullName: joi.string().trim(),
    phone: joi.string().trim(),
    linkedinLink: joi.string().trim().uri(),
    companyName: joi.string().trim(),
    companyLogoId: joi.string().trim(),
    companyWebsite: joi.string().trim().uri(),
    employerPosition: joi.string().trim(),
    cvId: joi.string().trim(),
    completedStep: joi.string().trim(),
});

export { userDetailsCreate };
