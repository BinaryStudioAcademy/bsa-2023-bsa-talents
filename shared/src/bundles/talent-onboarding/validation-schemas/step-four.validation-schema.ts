import joi from 'joi';

import {
    StepFourValidationMessage,
    StepFourValidationRule,
} from '../enums/enums';

type onboardingStepFourDto = {
    photoId: {
        size: number;
        uri: string;
    };
    fullName: string;
    phoneNumber: string;
    linkedinProfile: string;
    fileCV: string;
};

const onboardingStepFourValidationSchema = joi.object<
    onboardingStepFourDto,
    true
>({
    photoId: joi.object({
        size: joi
            .number()
            .integer()
            .max(StepFourValidationRule.IMAGE_MAX_SIZE)
            .required()
            .messages({ 'number.max': StepFourValidationMessage.IMG_MAX_SIZE }),
        uri: joi
            .string()
            .regex(StepFourValidationRule.IMAGE_TYPE_REGEX)
            .required()
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
            'string.min': StepFourValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.max': StepFourValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.pattern.base': StepFourValidationMessage.FULL_NAME_REGEX,
        }),

    phoneNumber: joi
        .string()
        .regex(StepFourValidationRule.PHONE_NUMBER_REGEX)
        .max(StepFourValidationRule.PHONE_NUMBER_MAX)
        .required()
        .messages({
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
            'string.min': StepFourValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max': StepFourValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base':
                StepFourValidationMessage.LINKEDIN_LINK_REGEX,
        }),

    fileCV: joi
        .string()
        .regex(StepFourValidationRule.CV_REGEX)
        .required()
        .messages({
            'string.pattern.base': '',
        }),
});

export { onboardingStepFourValidationSchema };
