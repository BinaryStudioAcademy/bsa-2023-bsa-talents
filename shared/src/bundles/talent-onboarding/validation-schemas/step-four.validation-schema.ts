import joi from 'joi';

import { Step4ValidationMessage, Step4ValidationRule } from '../enums/enums.js';
import { type TalentOnBoardingStep4Dto } from '../types/types.js';

const step4ValidationSchema = joi.object<TalentOnBoardingStep4Dto, true>({
    photo: joi.object().instance(File).required(),
    fullName: joi
        .string()
        .min(Step4ValidationRule.MIN_FULL_NAME_LENGTH)
        .max(Step4ValidationRule.MAX_FULL_NAME_LENGTH)
        .pattern(/^[ '.A-Za-z-]+$/)
        .required()
        .messages({
            'string.empty': Step4ValidationMessage.FULL_NAME_REQUIRED,
            'string.min': Step4ValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max': Step4ValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base':
                Step4ValidationMessage.FULL_NAME_WRONG_PATTERN,
        }),

    phoneNumber: joi
        .string()
        .pattern(/^\+\d{12}$/)
        .required()
        .messages({
            'string.empty': Step4ValidationMessage.PHONE_NUMDER_REQUIRED,
            'string.pattern.base': Step4ValidationMessage.PHONE_NUMBER_PATTERN,
        }),

    linkedInLink: joi
        .string()
        .trim()
        .pattern(/^linkedin\.com\/in\//)
        .min(Step4ValidationRule.MIN_LINKEDIN_LINK_LENGTH)
        .max(Step4ValidationRule.MAX_LINKEDIN_LINK_LENGTH)
        .required()
        .messages({
            'string.empty': Step4ValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min': Step4ValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max': Step4ValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                Step4ValidationMessage.LINKEDIN_LINK_WRONG_PATTERN,
        }),
    cv: joi.object().instance(File).required(),
});

export { step4ValidationSchema };
