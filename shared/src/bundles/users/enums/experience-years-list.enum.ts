import { createNumberRangeArray } from '../../../helpers/helpers.js';
import { SignUpStep1ValidationRule } from '../../talent-onboarding/enums/enums.js';

const ExperienceYearsList = createNumberRangeArray(
    SignUpStep1ValidationRule.MIN_YEARS_OF_EXPERIENCE,
    SignUpStep1ValidationRule.MAX_YEARS_OF_EXPERIENCE,
    SignUpStep1ValidationRule.YEARS_OF_EXPERIENCE_STEP,
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
