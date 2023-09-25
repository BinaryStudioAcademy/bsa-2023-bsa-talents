import {
    Country,
    EmploymentType,
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
const EXPERIENCE_YEARS = transformDataToMultiSelector(YearsOfExperience);
const SORT_VALUES = Object.values(UserSortCriteria).map(({ label }) => label);

export {
    BSA_CHARACTERISTICS,
    DEFAULT_VALUES,
    USER_BSA_PROJECTS,
} from './mock-constants';
export {
    EMPLOYMENT_TYPE_OPTIONS,
    EXPERIENCE_YEARS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
    SORT_VALUES,
};
