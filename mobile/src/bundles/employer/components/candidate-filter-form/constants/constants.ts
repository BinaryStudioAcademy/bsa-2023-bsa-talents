import { JobTitle } from 'shared/build/bundles/user-details/enums/job-title.enum';

import { CountryList } from '~/bundles/common/enums/enums';
import {
    UserSortCriteria,
    YearsOfExperience,
} from '~/bundles/employer/enums/enums';
import { transformDataToMultiSelector } from '~/bundles/employer/helpers/helpers';

export {
    BSA_CHARACTERISTICS,
    DEFAULT_VALUES,
    USER_BSA_PROJECTS,
} from './mock-constants';

const JOB_TITLE_OPTIONS = transformDataToMultiSelector(JobTitle);
const LOCATION_OPTIONS = transformDataToMultiSelector(CountryList);
const EXPERIENCE_YEARS = transformDataToMultiSelector(YearsOfExperience);
const SORT_VALUES = Object.values(UserSortCriteria).map(({ label }) => label);

export { EXPERIENCE_YEARS, JOB_TITLE_OPTIONS, LOCATION_OPTIONS, SORT_VALUES };
