const SignUpStep1ValidationRule = {
    MIN_PROFILE_NAME_LENGTH: 2,
    MAX_PROFILE_NAME_LENGTH: 50,
    MIN_SALARY_EXPECTATIONS_LENGTH: 1,
    MAX_SALARY_EXPECTATIONS_LENGTH: 4,
    MIN_EXPERIENCE_DESCRIPTION_LENGTH: 10,
    MAX_EXPERIENCE_DESCRIPTION_LENGTH: 250,
    MIN_YEARS_OF_EXPERIENCE: 0,
    MAX_YEARS_OF_EXPERIENCE: 5,
    MAX_YEARS_OF_EXPERIENCE_STRING: '5+',
    YEARS_OF_EXPERIENCE_STEP: 0.5,
    EMPLOYMENT_TYPES: [
        'Full time',
        'Part-time',
        'Freelance',
        'Remotely',
        'Relocation',
    ],
    JOB_TITLES: ['JS', '.Net', 'QA'],
};

export { SignUpStep1ValidationRule };
