const ContactCandidateValidationRule = {
    MIN_LINK_AMOUNT: 1,
    MAX_LINK_AMOUNT: 2,
    MIN_LINK_LENGTH: 5,
    MAX_LINK_LENGTH: 250,
    MIN_MESSAGE_LENGTH: 10,
    MAX_MESSAGE_LENGTH: 5000,
    MIN_TEMPLATE_LENGTH: 1,
} as const;

export { ContactCandidateValidationRule };
