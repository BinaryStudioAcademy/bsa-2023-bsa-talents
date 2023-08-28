const USER_PROFILE_DEFAULT_VALUES = {
    profileName: '',
    salaryExpectations: 0,
    jobTitle: '',
    currentLocation: '',
    experience: '',
    employmentType: {
        fullTime: true,
        partTime: false,
        freelance: false,
        partTime2: false,
        remotely: false,
        relocation: false,
    },
};

const JOB_TITLE_OPTIONS = [
    { label: 'Job Title 1', value: 'job1' },
    { label: 'Job Title 2', value: 'job2' },
    { label: 'Job Title 3', value: 'job3' },
];

const CURRENT_LOCATION_OPTIONS = [
    { label: 'Location 1', value: 'location1' },
    { label: 'Location 2', value: 'location2' },
    { label: 'Location 3', value: 'location3' },
];

export {
    CURRENT_LOCATION_OPTIONS,
    JOB_TITLE_OPTIONS,
    USER_PROFILE_DEFAULT_VALUES,
};
