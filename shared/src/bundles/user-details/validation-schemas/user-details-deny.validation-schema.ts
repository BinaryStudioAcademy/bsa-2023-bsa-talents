import joi from 'joi';

import { type UserDetailsDenyRequestDto } from '../types/types.js';

const userDetailsDeny = joi.object<UserDetailsDenyRequestDto, true>({
    deniedReason: joi.string().required(),
});

export { userDetailsDeny };
