import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { ProfileStepValidationRule } from '../../talent-onboarding/enums/enums.js';

const experienceYearRanges = createNumberRangeArray(
    ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

const createYearsOfExperience = (
    years: readonly number[],
): Record<string, number> => {
    const yearsOfExperience: Record<string, number> = {};
    for (const year of years) {
        const key = String(year);
        yearsOfExperience[key] = year;
    }
    return yearsOfExperience;
};

const experienceYears = createYearsOfExperience(experienceYearRanges);

export { experienceYears };
