import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserResetPasswordRequestDto } from '../types/types.js';
import { AUTH_CONSTANTS } from './constants/constants.js';

const userResetPassword = joi.object<UserResetPasswordRequestDto, true>({
    resetToken: joi.string().trim().required(),
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

export { userResetPassword };
