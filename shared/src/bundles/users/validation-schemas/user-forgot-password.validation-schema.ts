import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserForgotPasswordRequestDto } from '../types/types.js';

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
        .regex(UserValidationRule.EMAIL_REGEXP)
        .min(UserValidationRule.MIN_EMAIL_LENGTH)
        .max(UserValidationRule.MAX_LOGIN_INPUT_LENGTH)
        .messages({
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
            'string.pattern.base': UserValidationMessage.EMAIL_INVALID,
        }),
});

export { userForgotPassword };
