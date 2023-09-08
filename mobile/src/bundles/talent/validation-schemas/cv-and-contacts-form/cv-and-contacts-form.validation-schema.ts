import joi from 'joi';

import {
    CvAndContactsFormValidationMessage,
    CvAndContactsFormValidationRule,
} from '~/bundles/talent/enums/enums';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types.js';

const CvAndContactsFormValidationSchema = joi.object<
    CvAndContactsFormDto,
    true
>({
    photo: joi.object().required(),
    fullName: joi
        .string()
        .trim()
        .min(CvAndContactsFormValidationRule.MIN_FULL_NAME_LENGTH)
        .max(CvAndContactsFormValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty':
                CvAndContactsFormValidationMessage.FULL_NAME_REQUIRED,
            'string.min':
                CvAndContactsFormValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max':
                CvAndContactsFormValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                CvAndContactsFormValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    phoneNumber: joi
        .string()
        .pattern(/^\+\d{12}$/)
        .required()
        .messages({
            'string.empty':
                CvAndContactsFormValidationMessage.PHONE_NUMBER_REQUIRED,
            'string.pattern.base':
                CvAndContactsFormValidationMessage.PHONE_NUMBER_PATTERN,
        }),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^https:\/\/www\.linkedin\.com\/in\//)
        .min(CvAndContactsFormValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(CvAndContactsFormValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty':
                CvAndContactsFormValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min':
                CvAndContactsFormValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max':
                CvAndContactsFormValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                CvAndContactsFormValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
    cv: joi.object().required(),
});

export { CvAndContactsFormValidationSchema };
