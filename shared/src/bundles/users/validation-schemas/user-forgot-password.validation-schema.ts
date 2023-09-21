import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserForgotPasswordRequestDto } from '../types/types.js';
import { AUTH_CONSTANTS } from './constants/constants.js';

const userForgotPassword = joi.object<UserForgotPasswordRequestDto, true>({
    email: joi
        .string()
        .trim()
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .regex(AUTH_CONSTANTS.EMAIL_REGEXP)
        .min(AUTH_CONSTANTS.MIN_EMAIL_LENGTH)
        .max(AUTH_CONSTANTS.MAX_LOGIN_INPUT_LENGTH)
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'string.pattern.base': UserValidationMessage.EMAIL_INVALID,
        }),
});

export { userForgotPassword };
