import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserResetPasswordRequestDto } from '../types/types.js';

const userResetPassword = joi.object<UserResetPasswordRequestDto, true>({
    resetToken: joi.string().trim().required(),
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

export { userResetPassword };
