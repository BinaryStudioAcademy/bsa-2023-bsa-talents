import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/common/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const JOB_TITLE_OPTIONS = Object.values(JobTitle);
const LOCATION_OPTIONS = Object.values(CountryList);
const EMPLOYMENT_TYPE_OPTIONS = Object.values(EmploymentType);

const TALENT_PROFILE_DEFAULT_VALUES: ProfileStepDto = {
    profileName: '',
    salaryExpectation: 0,
    jobTitle: '',
    location: '',
    experienceYears: 0,
    employmentType: [],
    description: '',
};

const EXPERIENCE_YEARS = [
    {
        value: 0,
        label: 'no',
    },
    {
        value: 0.5,
        label: '0.5 year',
    },
    {
        value: 1,
        label: '1 year',
    },
    {
        value: 1.5,
        label: '1.5 years',
    },
    {
        value: 2,
        label: '2 years',
    },
    {
        value: 2.5,
        label: '2.5 years',
    },
    {
        value: 3,
        label: '3 years',
    },
    {
        value: 3.5,
        label: '3.5 years',
    },
    {
        value: 4,
        label: '4 years',
    },
    {
        value: 4.5,
        label: '4.5 years',
    },
    {
        value: 5,
        label: '5 years',
    },
];

export {
    EMPLOYMENT_TYPE_OPTIONS,
    EXPERIENCE_YEARS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
    TALENT_PROFILE_DEFAULT_VALUES,
};
