import joi from 'joi';

type onboardingStepFourDto = {
    photoId:
        | {
              size: number;
              uri: string;
          }
        | undefined;
    fullName: string;
    phoneNumber: string;
    linkedinProfile: string;
    fileCV: string;
};

const IMAGE_MAX_SIZE = 500_000;
const IMAGE_TYPE_REGEX = /\.(jpeg|jpg|png)$/;
const MAX_LENGTH_FULL_NAME = 50;
const MIN_LENGTH_FULL_NAME = 3;
const LINKEDIN_LINK_MAX_LENGTH = 250;
const LINKEDIN_LINK_MIN_LENGTH = 30;
const FULL_NAME_REGEX = /^[\s'.A-Za-z-]+$/;
const PHONE_NUMBER_MAX = 10;
const PHONE_NUMBER_REGEX = /^\+\d{1,10}$/;
const LINKEDIN_REGEX =
    /^https:\/\/www\.linkedin\.com\/in\/[\w!#$%&()*+,./:;<>?@[\\\]^{}~-]+$/;
const CV_REGEX = /\.(docx|doc|pdf)$/;

const onboardingStepFourValidationSchema = joi.object<
    onboardingStepFourDto,
    true
>({
    photoId: joi.object({
        size: joi
            .number()
            .integer()
            .max(IMAGE_MAX_SIZE)
            .required()
            .messages({ 'number.max': 'Allowed image file is < 5MB' }),
        uri: joi.string().regex(IMAGE_TYPE_REGEX).required().messages({
            'string.pattern.base': 'Allowed image could be only jpeg, png, jpg',
        }),
    }),

    fullName: joi
        .string()
        .trim()
        .min(MIN_LENGTH_FULL_NAME)
        .max(MAX_LENGTH_FULL_NAME)
        .regex(FULL_NAME_REGEX)
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
        .regex(PHONE_NUMBER_REGEX)
        .max(PHONE_NUMBER_MAX)
        .required()
        .messages({
            'string.max': 'allow up to 10 symbols total',
            'string.pattern.base':
                'The Phone number must start with "+" and contain digits 0-9 only',
        }),

    linkedinProfile: joi
        .string()
        .min(LINKEDIN_LINK_MIN_LENGTH)
        .max(LINKEDIN_LINK_MAX_LENGTH)
        .regex(LINKEDIN_REGEX)
        .required()
        .messages({
            'string.min': 'Length should be min 30 chars',
            'string.max': 'Length should be max 250 chars',
            'string.pattern.base':
                'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
        }),

    fileCV: joi.string().regex(CV_REGEX).required().messages({
        'regex':
            'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
    }),
});

export { onboardingStepFourValidationSchema };
