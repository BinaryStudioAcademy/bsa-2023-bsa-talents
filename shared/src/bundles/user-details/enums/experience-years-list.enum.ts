import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { ProfileStepValidationRule } from '../../talent-onboarding/enums/enums.js';

const ExperienceYearsList = createNumberRangeArray(
    ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE,
    ProfileStepValidationRule.YEARS_OF_EXPERIENCE_STEP,
);

type ExperienceEnum = Record<string, (typeof ExperienceYearsList)[number]>;

function createExperienceYearsEnum(array: readonly number[]): ExperienceEnum {
    const enumObject: ExperienceEnum = {};
    for (const years of array) {
        const enumKey = String(years);
        enumObject[enumKey] = years;
    }
    return enumObject;
}

const ExperienceYears = createExperienceYearsEnum(ExperienceYearsList);

export { ExperienceYears };
