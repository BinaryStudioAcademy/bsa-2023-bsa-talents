const TalentOnboardingProfileValidationMessage = {
    PROFILE_NAME_REQUIRE: 'Profile name is required.',
    PROFILE_NAME_MIN: 'Profile name must be at least 2 characters.',
    PROFILE_NAME_MAX: 'Profile name must not exceed 50 characters.',
    PROFILE_NAME_WRONG: 'Profile name contains invalid characters.',

    SALARY_REQUIRE: 'Salary expectation is required.',
    SALARY_MIN: 'Salary expectation must be at least 1 digit.',
    SALARY_MAX: 'Salary expectation must not exceed 4 digits.',
    SALARY_WRONG: 'Salary expectation must be a number.',

    JOB_TITLE_REQUIRE: 'Job title is required.',

    LOCATION_REQUIRE: 'Current location is required.',

    EXPERIENCE_YEARS_REQUIRE: 'Experience level is required.',
    EXPERIENCE_YEARS_MIN: 'Experience level cannot be negative.',
    EXPERIENCE_YEARS_MAX: 'Experience level cannot exceed 5 years.',
    EXPERIENCE_YEARS_WRONG: 'Experience level must be a number.',

    EMPLOYMENT_TYPE_REQUIRE: 'Employment types are required.',
    EMPLOYMENT_TYPE_WRONG: 'At least one employment type must be selected.',

    DESCRIPTION_REQUIRE: 'Description is required.',
    DESCRIPTION_MIN: 'Description must be at least 10 characters.',
    DESCRIPTION_MAX: 'Description must not exceed 250 characters.',
    DESCRIPTION_WRONG: 'Description contains invalid characters.',
} as const;

export { TalentOnboardingProfileValidationMessage };
