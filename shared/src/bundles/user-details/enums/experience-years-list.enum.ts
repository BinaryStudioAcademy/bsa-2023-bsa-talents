import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { ProfileStepValidationRule } from '../../talent-onboarding/enums/enums.js';

const experienceYearRanges = createNumberRangeArray(
    ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

const createExperienceYearsEnum = (
    years: readonly number[],
): Record<string, number> => {
    const experienceYearsEnum: Record<string, number> = {};
    for (const year of years) {
        const enumKey = String(year);
        experienceYearsEnum[enumKey] = year;
    }
    return experienceYearsEnum;
};

const experienceYears = createExperienceYearsEnum(experienceYearRanges);

export { experienceYears };
