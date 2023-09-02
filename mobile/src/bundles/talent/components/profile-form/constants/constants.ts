const USER_PROFILE_DEFAULT_VALUES = {
    profileName: '',
    salaryExpectations: '0',
    jobTitle: '',
    currentLocation: '',
    experience: '',
    experienceLevel: '0',
    employmentType: {
        fullTime: true,
        partTime: false,
        freelance: false,
        partTime2: false,
        remotely: false,
        relocation: false,
    },
};

// TODO: remove
const JOB_TITLE_OPTIONS = [
    { label: 'Job Title 1', value: 'job1' },
    { label: 'Job Title 2', value: 'job2' },
    { label: 'Job Title 3', value: 'job3' },
    { label: 'Job Title 4', value: 'job4' },
    { label: 'Job Title 5', value: 'job5' },
    { label: 'Job Title 6', value: 'job6' },
    { label: 'Job Title 7', value: 'job7' },
    { label: 'Job Title 8', value: 'job8' },
    { label: 'Job Title 9', value: 'job9' },
    { label: 'Job Title 10', value: 'job10' },
    { label: 'Job Title 11', value: 'job11' },
    { label: 'Job Title 12', value: 'job12' },
    { label: 'Job Title 13', value: 'job13' },
    { label: 'Job Title 14', value: 'job14' },
    { label: 'Job Title 15', value: 'job15' },
    { label: 'Job Title 16', value: 'job16' },
    { label: 'Job Title 17', value: 'job17' },
    { label: 'Job Title 18', value: 'job18' },
    { label: 'Job Title 19', value: 'job19' },
    { label: 'Job Title 20', value: 'job20' },
    { label: 'Job Title 21', value: 'job21' },
    { label: 'Job Title 22', value: 'job22' },
    { label: 'Job Title 23', value: 'job23' },
    { label: 'Job Title 24', value: 'job24' },
];

// TODO: remove
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
