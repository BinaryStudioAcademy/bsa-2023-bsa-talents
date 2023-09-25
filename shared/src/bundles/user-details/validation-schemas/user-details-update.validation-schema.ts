import joi from 'joi';

import {
    CountryList,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    NotConsidered,
    PreferredLanguages,
} from '../enums/enums.js';
import { type UserDetailsUpdateRequestDto } from '../types/types.js';
import { URL_REGEX_CONSTANT } from './constants/constants.js';

const userDetailsUpdate = joi
    .object<UserDetailsUpdateRequestDto>({
        id: joi.string().trim(),
        userId: joi.string().trim(),
        deniedReason: joi.string().trim(),

        isApproved: joi.boolean(),
        isHired: joi.boolean(),

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

        projectLinks: joi.alternatives().try(
            joi.array().items(
                joi
                    .string()
                    .trim()
                    .uri({
                        scheme: ['http', 'https', 'ftp'],
                        allowRelative: true,
                    }),
            ),
            joi.allow(null),
        ),
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
    })
    .or('id', 'userId');

export { userDetailsUpdate };
