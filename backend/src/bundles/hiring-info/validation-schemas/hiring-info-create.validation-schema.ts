import joi from 'joi';

import { type HiringInfoCreateRequestDto } from '../types/types.js';

const hiringInfoCreateValidationSchema = joi.object<
    HiringInfoCreateRequestDto,
    true
>({
    talentId: joi.string().trim().required(),
    companyId: joi.string().trim().required(),
    // firstContactTime: joi.date().required(),
    // hasSharedInfo: joi.boolean().allow(null),
    // sharedInfoTime: joi.date().allow(null),
    // isHired: joi.boolean().allow(null),
    // hiredTime: joi.date().allow(null),
    // hiredPosition: joi.string().trim().allow(null),
    // hiredSalary: joi.number(),
    // isApproved: joi.boolean().allow(null),
    // fee: joi.number().allow(null),
    // status: joi
    //     .string()
    //     .trim()
    //     .valid(...Object.values(PaidStatus)),
});

export { hiringInfoCreateValidationSchema };
