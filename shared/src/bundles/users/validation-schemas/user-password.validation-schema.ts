import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserResetPasswordDto } from '../types/types.js';

const userPassword = joi.object<UserResetPasswordDto, true>({
    password: joi
        .string()
        .trim()
        .required()
        .min(UserValidationRule.MIN_PASSWORD_LENGTH)
        .max(UserValidationRule.MAX_LOGIN_INPUT_LENGTH)
        .regex(UserValidationRule.PASSWORD_REGEXP)
        .messages({
            'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
            'string.min': UserValidationMessage.PASSWORD_SHORT,
            'string.pattern.base': UserValidationMessage.PASSWORD_WRONG,
        }),
});

export { userPassword };
