const ContactCandidateValidationMessage = {
    LINK_NOT_STRING: 'Link must be a string.',
    LINK_REQUIRED: 'Link is required.',
    LINK_MIN_VALUE: 'Link must be at least {{#limit}} characters long.',
    LINK_MAX_VALUE: 'Link cannot exceed {{#limit}} characters.',
    LINKS_NOT_ARRAY: 'Links must be an array.',
    LINK_INVALID: 'Invalid link format.',
    LINKS_MIN_VALUE: 'You must provide at least {{#limit}} link(s)',
    LINKS_MAX_VALUE: 'You can provide up to {{#limit}} link(s)',
    LINKS_UNIQUE: 'Each link value must be unique',
    LINKS_REQUIRED: 'Provide at least one link',
    MESSAGE_NOT_STRING: 'Message must be string',
    MESSAGE_MIN_VALUE: 'Message must be at least {{#limit}} characters long.',
    MESSAGE_MAX_VALUE: 'Message cannot exceed {{#limit}} characters.',
    MESSAGE_REQUIRED: 'Message is required',
    TEMPLATE_REQUIRED: 'Template name can`t be empty',
};

export { ContactCandidateValidationMessage };
