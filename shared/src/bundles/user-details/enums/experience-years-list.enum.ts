import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { ProfileStepValidationRule } from '../../talent-onboarding/enums/enums.js';

const ExperienceYears = createNumberRangeArray(
    ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

type Experience = Record<string, (typeof ExperienceYears)[number]>;

const createExperienceYearsEnum = (array: readonly number[]): Experience => {
    const enumObject: Experience = {};
    for (const years of array) {
        const enumKey = String(years);
        enumObject[enumKey] = years;
    }
    return enumObject;
};

const Experience = createExperienceYearsEnum(ExperienceYears);

export { Experience };
