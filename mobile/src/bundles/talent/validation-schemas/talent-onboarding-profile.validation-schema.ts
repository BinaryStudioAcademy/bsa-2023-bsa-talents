import joi from 'joi';

import { TALENT_ONBOARDING_PROFILE_CONSTANTS } from '~/bundles/talent/constants/constants';
import { TalentOnboardingProfileValidationMessage } from '~/bundles/talent/enums/enums';
import { type TalentOnboardingProfileDto } from '~/bundles/talent/types/types';

const talentOnboardingProfileValidationSchema = joi.object<
    TalentOnboardingProfileDto,
    true
>({
    profileName: joi
        .string()
        .trim()
        .min(TALENT_ONBOARDING_PROFILE_CONSTANTS.MIN_PROFILE_LENGTH)
        .max(TALENT_ONBOARDING_PROFILE_CONSTANTS.MAX_PROFILE_LENGTH)
        .regex(TALENT_ONBOARDING_PROFILE_CONSTANTS.PROFILE_REGEXP)
        .required()
        .messages({
            'string.empty':
                TalentOnboardingProfileValidationMessage.PROFILE_NAME_REQUIRE,
            'string.min':
                TalentOnboardingProfileValidationMessage.PROFILE_NAME_MIN,
            'string.max':
                TalentOnboardingProfileValidationMessage.PROFILE_NAME_MAX,
            'string.pattern.base':
                TalentOnboardingProfileValidationMessage.PROFILE_NAME_WRONG,
        }),
    salaryExpectation: joi
        .number()
        .integer()
        .min(TALENT_ONBOARDING_PROFILE_CONSTANTS.MIN_SALARY)
        .max(TALENT_ONBOARDING_PROFILE_CONSTANTS.MAX_SALARY)
        .required()
        .messages({
            'any.required':
                TalentOnboardingProfileValidationMessage.SALARY_REQUIRE,
            'number.min': TalentOnboardingProfileValidationMessage.SALARY_MIN,
            'number.max': TalentOnboardingProfileValidationMessage.SALARY_MAX,
            'number.integer':
                TalentOnboardingProfileValidationMessage.SALARY_INTEGER,
            'number.base':
                TalentOnboardingProfileValidationMessage.SALARY_WRONG,
        }),
    jobTitle: joi.string().required().messages({
        'any.required':
            TalentOnboardingProfileValidationMessage.JOB_TITLE_REQUIRE,
        'string.empty':
            TalentOnboardingProfileValidationMessage.JOB_TITLE_WRONG,
    }),
    location: joi.string().required().messages({
        'any.required':
            TalentOnboardingProfileValidationMessage.LOCATION_REQUIRE,
        'string.empty': TalentOnboardingProfileValidationMessage.LOCATION_WRONG,
    }),
    experienceYears: joi
        .number()
        .min(TALENT_ONBOARDING_PROFILE_CONSTANTS.MIN_EXPERIENCE_YEARS)
        .max(TALENT_ONBOARDING_PROFILE_CONSTANTS.MAX_EXPERIENCE_YEARS)
        .required()
        .messages({
            'any.required':
                TalentOnboardingProfileValidationMessage.EXPERIENCE_YEARS_REQUIRE,
            'number.min':
                TalentOnboardingProfileValidationMessage.EXPERIENCE_YEARS_MIN,
            'number.max':
                TalentOnboardingProfileValidationMessage.EXPERIENCE_YEARS_MAX,
            'number.base':
                TalentOnboardingProfileValidationMessage.EXPERIENCE_YEARS_WRONG,
        }),
    employmentTypes: joi
        .array()
        .items(
            joi.boolean().valid(true).required(),
            joi.boolean().valid(false).optional(),
        )
        .min(TALENT_ONBOARDING_PROFILE_CONSTANTS.MIN_EMPLOYMENT_TYPES)
        .required()
        .messages({
            'any.required':
                TalentOnboardingProfileValidationMessage.EMPLOYMENT_TYPE_REQUIRE,
            'array.includesRequiredUnknowns':
                TalentOnboardingProfileValidationMessage.EMPLOYMENT_TYPE_WRONG,
        }),
    description: joi
        .string()
        .trim()
        .min(TALENT_ONBOARDING_PROFILE_CONSTANTS.MIN_DESCRIPTION_LENGTH)
        .max(TALENT_ONBOARDING_PROFILE_CONSTANTS.MAX_DESCRIPTION_LENGTH)
        .regex(TALENT_ONBOARDING_PROFILE_CONSTANTS.DESCRIPTION_REGEXP)
        .required()
        .messages({
            'string.empty':
                TalentOnboardingProfileValidationMessage.DESCRIPTION_REQUIRE,
            'string.min':
                TalentOnboardingProfileValidationMessage.DESCRIPTION_MIN,
            'string.max':
                TalentOnboardingProfileValidationMessage.DESCRIPTION_MAX,
            'string.pattern.base':
                TalentOnboardingProfileValidationMessage.DESCRIPTION_WRONG,
        }),
});

export { talentOnboardingProfileValidationSchema };
