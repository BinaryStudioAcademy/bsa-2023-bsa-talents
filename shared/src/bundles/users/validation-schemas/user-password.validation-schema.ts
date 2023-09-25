import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserResetPasswordDto } from '../types/types.js';
import { AUTH_CONSTANTS } from './constants/constants.js';

const userPassword = joi.object<UserResetPasswordDto, true>({
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
});

export { userPassword };
