import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { ProfileStepValidationRule } from '../../talent-onboarding/enums/enums.js';

const experienceYearsList = createNumberRangeArray(
    ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

function createExperienceYearsEnum(
    array: readonly number[],
): Record<string, number> {
    const enumObject: Record<string, number> = {};
    for (const years of array) {
        const enumKey = String(years);
        enumObject[enumKey] = years;
    }
    return enumObject;
}

const ExperienceYears = createExperienceYearsEnum(experienceYearsList);

export { ExperienceYears as const };
