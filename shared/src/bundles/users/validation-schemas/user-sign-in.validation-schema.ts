import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';
import { CONSTANTS } from './constants/constants.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
    email: joi
        .string()
        .trim()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .min(CONSTANTS.MIN_EMAIL_LENGTH)
        .max(CONSTANTS.MAX_LOGIN_INPUT_LENGTH)
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        }),
    password: joi
        .string()
        .trim()
        .required()
        .min(CONSTANTS.MIN_PASSWORD_LENGTH)
        .max(CONSTANTS.MAX_LOGIN_INPUT_LENGTH)
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .messages({
            'string.pattern.base': UserValidationMessage.PASSWORD_WRONG,
        }),
});

export { userSignIn };
