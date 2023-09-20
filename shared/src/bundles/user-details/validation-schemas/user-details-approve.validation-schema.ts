import joi from 'joi';

import { type UserDetailsApproveRequestDto } from '../types/types.js';

const userDetailsApprove = joi.object<UserDetailsApproveRequestDto, true>({
    userId: joi.string().trim().required(),
    isApproved: joi.boolean().required(),
    deniedReason: joi.string().when('isApproved', {
        is: joi.valid(true),
        // eslint-disable-next-line unicorn/no-thenable
        then: joi.forbidden(),
        otherwise: joi.required(),
    }),
});

export { userDetailsApprove };
