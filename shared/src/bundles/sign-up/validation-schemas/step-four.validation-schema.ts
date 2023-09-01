import joi from 'joi';

import {
    SignUpStep4ValidationMessage,
    SignUpStep4ValidationRule,
} from '../enums/enums.js';
import { type UserSignUpStep4Dto } from '../types/types.js';

const signUpStep4ValidationSchema = joi.object<UserSignUpStep4Dto, true>({
    photo: joi.object().instance(File).required(),
    fullName: joi
        .string()
        .min(SignUpStep4ValidationRule.MIN_FULL_NAME_LENGTH)
        .max(SignUpStep4ValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty': SignUpStep4ValidationMessage.FULL_NAME_REQUIRED,
            'string.min': SignUpStep4ValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max': SignUpStep4ValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                SignUpStep4ValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    phoneNumber: joi
        .string()
        .pattern(/^\+\d{12}$/)
        .required()
        .messages({
            'string.empty': SignUpStep4ValidationMessage.PHONE_NUMDER_REQUIRED,
            'string.pattern.base':
                SignUpStep4ValidationMessage.PHONE_NUMBER_PATTERN,
        }),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^linkedin\.com\/in\//)
        .min(SignUpStep4ValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(SignUpStep4ValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty': SignUpStep4ValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min': SignUpStep4ValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max': SignUpStep4ValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                SignUpStep4ValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
    cv: joi.object().instance(File).required(),
});

export { signUpStep4ValidationSchema };
