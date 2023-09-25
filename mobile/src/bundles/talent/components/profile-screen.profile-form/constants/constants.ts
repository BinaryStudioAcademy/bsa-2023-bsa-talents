import { EmploymentType, JobTitle } from '~/bundles/common/enums/enums';
import { Country } from '~/bundles/talent/enums/enums';

const JOB_TITLE_OPTIONS = Object.values(JobTitle);
const LOCATION_OPTIONS = Object.values(Country);
const EMPLOYMENT_TYPE_OPTIONS = Object.values(EmploymentType);

export { EMPLOYMENT_TYPE_OPTIONS, JOB_TITLE_OPTIONS, LOCATION_OPTIONS };
