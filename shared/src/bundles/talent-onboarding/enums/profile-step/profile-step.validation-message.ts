const ProfileStepValidationMessage = {
    PROFILE_NAME_NOT_STRING: 'Profile name must be a string',
    PROFILE_NAME_REQUIRED: 'Profile name is required',
    PROFILE_NAME_MIN_LENGTH:
        'Profile name must be at least {{#limit}} characters',
    PROFILE_NAME_MAX_LENGTH:
        'Profile name must be at most {{#limit}} characters',
    PROFILE_NAME_WRONG_PATTERN:
        'Profile name must contain only letters, spaces, (.) and (-)',
    SALARY_EXPECTATION_NOT_NUMBER: 'Salary expectations must be a number',
    SALARY_EXPECTATION_REQUIRED: 'Salary expectations is required',
    SALARY_EXPECTATION_MIN_VALUE:
        'Salary expectations must be at least {{#limit}} ',
    SALARY_EXPECTATION_MAX_VALUE:
        'Salary expectations must be at most {{#limit}} ',
    SALARY_EXPECTATIONS_WRONG_PATTERN:
        'Salary expectations must contain only numeric values',
    JOB_TITLE_NOT_STRING: 'Job title must be a string',
    JOB_TITLE_REQUIRED: 'Job title is required',
    JOB_TITLE_LENGTH:
        'Job title must be between {{#limit.min}} and {{#limit.max}} characters',
    JOB_TITLE_BASE: 'Please select a valid job title from the provided options',
    JOB_TITLE_WRONG_PATTERN: 'Job title must contain only letters and spaces',
    EXPERIENCE_YEARS_NOT_NUMBER: 'Experience years must be a number',
    EXPERIENCE_YEARS_REQUIRED: 'Experience years is required',
    LOCATION_NOT_STRING: 'Location must be a string',
    LOCATION_REQUIRED: 'Location is required',
    LOCATION_BASE: 'Please select a valid location from the provided options',
    EMPLOYMENT_TYPES_REQUIRED: 'At least one employment type must be selected',
    EMPLOYMENT_TYPES_BASE:
        'Please select valid employment types from the provided options',
    DESCRIPTION_NOT_STRING: 'Description must be a string',
    DESCRIPTION_REQUIRED: 'Description is required',
    DESCRIPTION_MIN_LENGTH:
        'Description must be at least {{#limit}} characters',
    DESCRIPTION_MAX_LENGTH: 'Description must be at most {{#limit}} characters',
    DESCRIPTION_EMPTY: 'Description can not be empty',
};

export { ProfileStepValidationMessage };
