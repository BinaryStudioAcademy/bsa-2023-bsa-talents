import joi from 'joi';

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
            .messages({ 'number.max': 'Allowed image file is < 5MB' }),
        uri: joi
            .string()
            .regex(TALENT_CONSTANT.IMAGE_TYPE_REGEX)
            .required()
            .messages({
                'string.pattern.base':
                    'Allowed image could be only jpeg, png, jpg',
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
            'string.min':
                'The Full name field should min 3 characters in length',
            'string.max':
                'The Full name field should max 50 characters in length',
            'string.pattern.base':
                'The Full name field should accept A-Z, a-z, (.), (-), spaces',
        }),

    phoneNumber: joi
        .string()
        .regex(TALENT_CONSTANT.PHONE_NUMBER_REGEX)
        .max(TALENT_CONSTANT.PHONE_NUMBER_MAX)
        .required()
        .messages({
            'string.max': 'allow up to 10 symbols total',
            'string.pattern.base':
                'The Phone number must start with "+" and contain digits 0-9 only',
        }),

    linkedinProfile: joi
        .string()
        .min(TALENT_CONSTANT.LINKEDIN_LINK_MIN_LENGTH)
        .max(TALENT_CONSTANT.LINKEDIN_LINK_MAX_LENGTH)
        .regex(TALENT_CONSTANT.LINKEDIN_REGEX)
        .required()
        .messages({
            'string.min': 'Length should be min 30 chars',
            'string.max': 'Length should be max 250 chars',
            'string.pattern.base':
                'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
        }),

    fileCV: joi.string().regex(TALENT_CONSTANT.CV_REGEX).required().messages({
        'string.pattern.base':
            'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
    }),
});

export { onboardingStepFourValidationSchema };
