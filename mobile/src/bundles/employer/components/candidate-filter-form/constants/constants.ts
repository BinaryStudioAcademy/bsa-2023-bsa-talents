import {
    Country,
    EmploymentType,
    EnglishLevel,
    JobTitle,
} from '~/bundles/common/enums/enums';
import {
    UserSortCriteria,
    YearsOfExperience,
} from '~/bundles/employer/enums/enums';
import { transformDataToMultiSelector } from '~/bundles/employer/helpers/helpers';

const EMPLOYMENT_TYPE_OPTIONS = Object.values(EmploymentType);
const JOB_TITLE_OPTIONS = transformDataToMultiSelector(JobTitle);
const LOCATION_OPTIONS = transformDataToMultiSelector(Country);
const YEARS_EXPERIENCE = transformDataToMultiSelector(YearsOfExperience);
const SORT_VALUES = Object.values(UserSortCriteria).map(({ label }) => label);
const ENGLISH_LEVELS = Object.values(EnglishLevel);

export {
    BSA_CHARACTERISTICS,
    BSA_PROJECTS,
    DEFAULT_VALUES,
} from './mock-constants';
export {
    EMPLOYMENT_TYPE_OPTIONS,
    ENGLISH_LEVELS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
    SORT_VALUES,
    YEARS_EXPERIENCE,
};
