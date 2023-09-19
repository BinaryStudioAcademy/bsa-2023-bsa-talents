import joi from 'joi';

import { UserRole, UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';
import { AUTH_CONSTANTS } from './constants/constants.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
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
    password: joi
        .string()
        .trim()
        .required()
        .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH)
        .max(AUTH_CONSTANTS.MAX_LOGIN_INPUT_LENGTH)
        .regex(AUTH_CONSTANTS.PASSWORD_REGEXP)
        .messages({
            'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
            'string.min': UserValidationMessage.PASSWORD_SHORT,
            'string.pattern.base': UserValidationMessage.PASSWORD_WRONG,
        }),
    role: joi
        .string()
        .trim()
        .valid(...Object.values(UserRole))
        .required(),
});

export { userSignUp };
