import joi from 'joi';

import {
    CountryList,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    YearsOfExperience,
} from '../enums/enums.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';

const userDetailsSearch = joi.object<UserDetailsSearchUsersRequestDto>({
    isBaseSearch: joi.boolean(),

    searchValue: joi.string().trim(),

    searchActiveCandidatesOnly: joi.boolean(),

    jobTitle: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(JobTitle)),
        ),
        joi
            .string()
            .trim()
            .valid(...Object.values(JobTitle)),
    ),
    yearsOfExperience: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(YearsOfExperience)),
        ),
        joi.string().trim(),
    ),
    hardSkills: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),

    BSABadges: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),

    location: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(CountryList)),
        ),
        joi
            .string()
            .trim()
            .valid(...Object.values(CountryList)),
    ),
    englishLevel: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(EnglishLevel)),
        ),
        joi
            .string()
            .trim()
            .valid(...Object.values(EnglishLevel)),
    ),
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

    userBsaCharacteristics: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),

    userBsaProject: joi
        .alternatives()
        .try(joi.array().items(joi.string().trim()), joi.string().trim()),
});

export { userDetailsSearch };
