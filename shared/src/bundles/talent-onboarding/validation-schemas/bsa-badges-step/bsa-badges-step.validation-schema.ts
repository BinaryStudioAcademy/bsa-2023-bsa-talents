import joi from 'joi';

import { BsaBadgesStepValidationMessage } from '../../enums/enums.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { BSA_BADGES_MIN_LENGTH_CONST } from './constants/bsa-badges-step.constants.js';

const bsaBadgesStep = joi.object<BsaBadgesStepDto, true>({
    badges: joi.array().min(BSA_BADGES_MIN_LENGTH_CONST).required().messages({
        'array.min': BsaBadgesStepValidationMessage.BSA_BADGES_REQUIRED,
        'any.invalid': BsaBadgesStepValidationMessage.BSA_BADGES_BASE,
    }),
});

export { bsaBadgesStep };
