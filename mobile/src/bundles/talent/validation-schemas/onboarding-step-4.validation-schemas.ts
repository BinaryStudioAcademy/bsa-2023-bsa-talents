import joi from 'joi';

type onboardingStepFourDto = {
    imageSize: number;
    imageType: string;
    fullName: string;
    phoneNumber: string;
    linkedInProfileLink: string;
    fileCV: string;
};

const IMAGE_MAX_SIZE = 500_000;
const IMAGE_TYPE_REGEX = /\.(jpeg|jpg|png)$/;
const MAX_LENGTH_FULLNAME = 50;
const MIN_LENGTH_FULLNAME = 3;
const LINKEDIN_LINK_MAX_LENGTH = 250;
const LINKEDIN_LINK_MIN_LENGTH = 30;
const FULLNAME_REGEX = /^[ '.A-Za-z]+$/;
const PHONE_NUMBER_REGEX = /^\+\d{1,10}$/;
const LINKEDIN_REGEX =
    /^https:\/\/www\.linkedin\.com\/in\/[\w!#$%&()*+,./:;<>?@[\\\]^{}~-]+$/;
const CV_REGEX = /\.(docx|doc|pdf)$/;

const onboardingStepFourValidationSchema = joi.object<
    onboardingStepFourDto,
    true
>({
    imageSize: joi
        .number()
        .max(IMAGE_MAX_SIZE)
        .required()
        .messages({ 'number.max': 'Allowed image file is < 5MB' }),

    imageType: joi.string().regex(IMAGE_TYPE_REGEX).required().messages({
        'regex': 'Allowed image could be only jpeg, png, jpg',
    }),

    fullName: joi
        .string()
        .trim()
        .min(MIN_LENGTH_FULLNAME)
        .max(MAX_LENGTH_FULLNAME)
        .regex(FULLNAME_REGEX)
        .required()
        .messages({
            'string.min':
                'The Full name field should min 3 characters in length',
            'string.max':
                'The Full name field should max 50 characters in length',
        }),

    phoneNumber: joi
        .string()
        .regex(PHONE_NUMBER_REGEX)
        .required()
        .messages({ 'regex': 'Allowed image could be only jpeg, png, jpg' }),

    linkedInProfileLink: joi
        .string()
        .min(LINKEDIN_LINK_MIN_LENGTH)
        .max(LINKEDIN_LINK_MAX_LENGTH)
        .regex(LINKEDIN_REGEX)
        .required()
        .messages({
            'string.min': 'Length should be min 30 chars',
            'string.max': 'Length should be max 250 chars',
            'regex':
                'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
        }),

    fileCV: joi.string().regex(CV_REGEX).required().messages({
        'regex':
            'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
    }),
});

export { onboardingStepFourValidationSchema };
