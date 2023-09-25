import joi from 'joi';

import { type HiringInfoCreateRequestDto } from '../types/types.js';

const hiringInfoCreateValidationSchema = joi.object<
    HiringInfoCreateRequestDto,
    true
>({
    talentId: joi.string().trim().required(),
    companyId: joi.string().trim().required(),
});

export { hiringInfoCreateValidationSchema };
