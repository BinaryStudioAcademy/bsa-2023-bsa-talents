import joi from 'joi';

import {
    Country,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    SearchType,
    UserSortCriteria,
    YearsOfExperience,
} from '../enums/enums.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';

const userDetailsSearch = joi.object<UserDetailsSearchUsersRequestDto>({
    sortBy: joi
        .string()
        .valid(
            ...Object.values(UserSortCriteria).map(
                (criteria) => criteria.value,
            ),
        ),

    searchStringType: joi.string(),

    searchValue: joi.string().trim(),

    searchType: joi
        .string()
        .trim()
        .valid(...Object.values(SearchType)),

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

    location: joi.alternatives().try(
        joi.array().items(
            joi
                .string()
                .trim()
                .valid(...Object.values(Country)),
        ),
        joi
            .string()
            .trim()
            .valid(...Object.values(Country)),
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
