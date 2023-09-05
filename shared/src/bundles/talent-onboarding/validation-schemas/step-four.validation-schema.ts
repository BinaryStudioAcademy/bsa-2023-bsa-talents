import joi from 'joi';

import {
    StepFourValidationMessage,
    StepFourValidationRule,
} from '../enums/enums';
import { type StepFourDto } from '../types/types';

const StepFourValidationSchema = joi.object<StepFourDto, true>({
    photoId: joi.object().keys({
        size: joi
            .number()
            .integer()
            .max(StepFourValidationRule.IMAGE_MAX_SIZE)
            .messages({ 'number.max': StepFourValidationMessage.IMG_MAX_SIZE }),
        uri: joi
            .string()
            .regex(StepFourValidationRule.IMAGE_TYPE_REGEX)
            .messages({
                'string.pattern.base': StepFourValidationMessage.IMG_TYPE,
            }),
    }),

    fullName: joi
        .string()
        .trim()
        .min(StepFourValidationRule.MIN_LENGTH_FULL_NAME)
        .max(StepFourValidationRule.MAX_LENGTH_FULL_NAME)
        .regex(StepFourValidationRule.FULL_NAME_REGEX)
        .required()
        .messages({
            'string.empty': StepFourValidationMessage.FULL_NAME_REQUIRED,
            'string.min': StepFourValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.max': StepFourValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.pattern.base': StepFourValidationMessage.FULL_NAME_REGEX,
        }),

    phoneNumber: joi
        .string()
        .regex(StepFourValidationRule.PHONE_NUMBER_REGEX)
        .max(StepFourValidationRule.PHONE_NUMBER_LENGTH)
        .min(StepFourValidationRule.PHONE_NUMBER_LENGTH)
        .required()
        .messages({
            'string.empty': StepFourValidationMessage.PHONE_NUMBER_REQUIRED,
            'string.max': StepFourValidationMessage.PHONE_NUMBER_LENGTH,
            'string.pattern.base': StepFourValidationMessage.PHONE_NUMBER_REGEX,
        }),

    linkedinProfile: joi
        .string()
        .min(StepFourValidationRule.LINKEDIN_LINK_MIN_LENGTH)
        .max(StepFourValidationRule.LINKEDIN_LINK_MAX_LENGTH)
        .regex(StepFourValidationRule.LINKEDIN_REGEX)
        .required()
        .messages({
            'string.empty': StepFourValidationMessage.LINKEDIN_LINK_REQUIRED,
            'string.min': StepFourValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max': StepFourValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                StepFourValidationMessage.LINKEDIN_LINK_REGEX,
        }),

    cv: joi
        .object()
        .keys({
            size: joi
                .number()
                .integer()
                .max(StepFourValidationRule.CV_MAX_SIZE)
                .required()
                .messages({
                    'number.max': StepFourValidationMessage.CV_MAX_SIZE,
                }),
            name: joi
                .string()
                .regex(StepFourValidationRule.CV_TYPE_REGEX)
                .required()
                .messages({
                    'string.pattern.base':
                        StepFourValidationMessage.CV_TYPE_REGEX,
                }),
            uri: joi.string().required(),
        })
        .required(),
});

export { StepFourValidationSchema };
