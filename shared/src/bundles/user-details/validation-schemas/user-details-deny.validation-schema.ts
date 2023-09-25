import joi from 'joi';

import { type UserDetailsDenyRequestDto } from '../types/types.js';

const userDetailsDenyValidationSchema = joi.object<
    UserDetailsDenyRequestDto,
    true
>({
    deniedReason: joi.string().required(),
});

export { userDetailsDenyValidationSchema };
