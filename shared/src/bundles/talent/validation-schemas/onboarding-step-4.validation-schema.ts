import joi from 'joi';

import { TalentValidationMessage } from '../enums/enums';
import { TALENT_CONSTANT } from './talent-constant';

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
            .max(TALENT_CONSTANT.IMAGE_MAX_SIZE)
            .required()
            .messages({ 'number.max': TalentValidationMessage.IMG_MAX_SIZE }),
        uri: joi
            .string()
            .regex(TALENT_CONSTANT.IMAGE_TYPE_REGEX)
            .required()
            .messages({
                'string.pattern.base': TalentValidationMessage.IMG_TYPE,
            }),
    }),

    fullName: joi
        .string()
        .trim()
        .min(TALENT_CONSTANT.MIN_LENGTH_FULL_NAME)
        .max(TALENT_CONSTANT.MAX_LENGTH_FULL_NAME)
        .regex(TALENT_CONSTANT.FULL_NAME_REGEX)
        .required()
        .messages({
            'string.min': TalentValidationMessage.FULL_NAME_MAX_LENGTH,
            'string.max': TalentValidationMessage.FULL_NAME_MIN_LENGTH,
            'string.pattern.base': TalentValidationMessage.FULL_NAME_REGEX,
        }),

    phoneNumber: joi
        .string()
        .regex(TALENT_CONSTANT.PHONE_NUMBER_REGEX)
        .max(TALENT_CONSTANT.PHONE_NUMBER_MAX)
        .required()
        .messages({
            'string.max': TalentValidationMessage.PHONE_NUMBER_LENGTH,
            'string.pattern.base': TalentValidationMessage.PHONE_NUMBER_REGEX,
        }),

    linkedinProfile: joi
        .string()
        .min(TALENT_CONSTANT.LINKEDIN_LINK_MIN_LENGTH)
        .max(TALENT_CONSTANT.LINKEDIN_LINK_MAX_LENGTH)
        .regex(TALENT_CONSTANT.LINKEDIN_REGEX)
        .required()
        .messages({
            'string.min': TalentValidationMessage.LINKEDIN_LINK_MIN_LENGTH,
            'string.max': TalentValidationMessage.LINKEDIN_LINK_MAX_LENGTH,
            'string.pattern.base': TalentValidationMessage.LINKEDIN_LINK_REGEX,
        }),

    fileCV: joi.string().regex(TALENT_CONSTANT.CV_REGEX).required().messages({
        'string.pattern.base': '',
    }),
});

export { onboardingStepFourValidationSchema };
