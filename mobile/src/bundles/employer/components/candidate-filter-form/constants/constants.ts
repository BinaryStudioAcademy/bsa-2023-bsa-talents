import { CountryList } from 'shared/build/bundles/user-details/enums/country-list.enum';
import { JobTitle } from 'shared/build/bundles/user-details/enums/job-title.enum';
import { YearsOfExperience } from 'shared/build/bundles/user-details/enums/years-of-experience.enum';

import { transformDataToMultiSelector } from '~/bundles/employer/helpers/transform-data-to-multi-selector/transform-data-to-multi-selector';

export {
    BSA_CHARACTERISTICS,
    DEFAULT_VALUES,
    USER_BSA_PROJECTS,
} from './mock-constants';

const JOB_TITLE_OPTIONS = transformDataToMultiSelector(JobTitle);
const LOCATION_OPTIONS = transformDataToMultiSelector(CountryList);
const EXPERIENCE_YEARS = transformDataToMultiSelector(YearsOfExperience);

export { EXPERIENCE_YEARS, JOB_TITLE_OPTIONS, LOCATION_OPTIONS };
