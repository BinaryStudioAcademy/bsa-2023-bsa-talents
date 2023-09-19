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

const userDetailsUpdate = joi
    .object<UserDetailsUpdateRequestDto, true>({
        id: joi.string().trim(),
        userId: joi.string().trim(),

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
    })
    .or('id', 'userId');

export { userDetailsUpdate };
