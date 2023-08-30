import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';
import { constants } from './constants.js';

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
        .min(constants.MIN_EMAIL_LENGTH)
        .max(constants.MAX_LOGIN_INPUT_LENGTH)
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        }),
    password: joi
        .string()
        .trim()
        .required()
        .min(constants.MIN_PASSWORD_LENGTH)
        .max(constants.MAX_LOGIN_INPUT_LENGTH)
        .regex(constants.PASSWORD_REGEXP)
        .messages({
            'string.pattern.base': UserValidationMessage.PASSWORD_WRONG,
        }),
});

export { userSignIn };
