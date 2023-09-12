import joi from 'joi';

import {
    CountryList,
    EmploymentType,
    EnglishLevel,
    JobTitle,
} from '../enums/enums.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';

const userDetailsSearch = joi.object<UserDetailsSearchUsersRequestDto>({
    search: joi.string().trim(),

    isHired: joi.boolean(),

    jobTitle: joi
        .string()
        .trim()
        .valid(...Object.values(JobTitle)),

    experienceYears: joi.number(),

    hardSkills: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),

    BSABadges: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),

    location: joi
        .string()
        .trim()
        .valid(...Object.values(CountryList)),

    englishLevel: joi
        .string()
        .trim()
        .valid(...Object.values(EnglishLevel)),

    employmentType: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(EmploymentType)),
        ),
        joi
            .string()
            .trim()
            .valid(...Object.values(EmploymentType)),
    ),

    // TODO add BSA characteristics
    // TODO add BSA project name
});

export { userDetailsSearch };
