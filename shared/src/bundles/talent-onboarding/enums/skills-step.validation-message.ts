const SkillsStepValidationMessage = {
    HARD_SKILLS_DIDNT_MATCH_PATTERN:
        'Hard Skills must contain only letters, special chars, spaces.',
    HARD_SKILLS_REQUIRED: 'Hard Skills is required',
    ENGLISH_LEVEL_REQUIRED: 'English level is required',
    NOT_CONSIDERED_REQUIRED:
        'At least one not considered option must be selected',
    NOT_CONSIDERED_DIDNT_MATCH_ALLOWED_TYPES:
        'Not considered did not match allowed types',
    PREFERRED_LANGUAGES_WRONG_PATTERN: 'Preferred languages must be an array',
    PREFERRED_LANGUAGES_DIDNT_MATCH_ALLOWED_TYPES:
        'Preferred languages did not match allowed languages',
    PREFERRED_LANGUAGES_REQUIRED: 'Preferred languages is required',
    PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES:
        'Project links must be a valid URL, between 5 and 50 characters',
    PROJECT_LINKS_MAX_LINKS:
        'Project links must contain less than {{#limit.max}} links',
    PROJECT_LINKS_INVALID_URL: 'Project links must be a valid URL',
    PROJECT_LINKS_MIN_LENGTH:
        'Project links must contain at least {{#limit.min}} chars',
    PROJECT_LINKS_MAX_LENGTH:
        'Project links must contain less than {{#limit.max}} chars',
};

export { SkillsStepValidationMessage };
