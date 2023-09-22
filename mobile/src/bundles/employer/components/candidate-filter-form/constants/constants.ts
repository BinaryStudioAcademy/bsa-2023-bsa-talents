import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/common/enums/enums';

const JOB_TITLE_OPTIONS = Object.entries(JobTitle).map(([id, name]) => ({
    id,
    name,
}));
const LOCATION_OPTIONS = Object.entries(CountryList).map(([id, name]) => ({
    id,
    name,
}));

const EMPLOYMENT_TYPE_OPTIONS = Object.values(EmploymentType);

export {
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    ENGLISH_LEVEL,
    YEARS_EXPERIENCE,
} from './mock-constants';
export { EMPLOYMENT_TYPE_OPTIONS, JOB_TITLE_OPTIONS, LOCATION_OPTIONS };
