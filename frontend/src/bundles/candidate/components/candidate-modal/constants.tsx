const DEFAULT_CONTACT_CANDIDATE_MODAL = {
    links: [{ value: '' }],
    message: '',
    isSaveTemplate: false,
    templateName: '',
};

const MODAL = {
    EMPTY_ARRAY_LENGTH: 0,
    MAX_LINKS: 5,
} as const;

const TEXTAREA = {
    minRows: 3,
    maxRows: 7,
};

export { DEFAULT_CONTACT_CANDIDATE_MODAL, MODAL, TEXTAREA };
