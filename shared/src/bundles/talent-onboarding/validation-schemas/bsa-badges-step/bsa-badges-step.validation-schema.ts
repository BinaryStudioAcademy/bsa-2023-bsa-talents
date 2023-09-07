import joi from 'joi';

import {
    BsaBadgesStepValidationMessage,
    BsaBadgesStepValidationRule,
} from '../../enums/enums.js';
import { type BsaBadgesStepDto } from '../../types/types.js';

const BsaBadgesStepValidationSchema = joi.object<BsaBadgesStepDto, true>({
    bsaBadges: joi
        .array()
        .min(BsaBadgesStepValidationRule.BSA_BADGES_MIN_LENGTH)
        .required()
        .messages({
            'array.min': BsaBadgesStepValidationMessage.BSA_BADGES_REQUIRED,
            'any.invalid': BsaBadgesStepValidationMessage.BSA_BADGES_BASE,
        }),
});

export { BsaBadgesStepValidationSchema };
