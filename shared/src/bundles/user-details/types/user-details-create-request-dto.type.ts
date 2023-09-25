import { type ValueOf } from '~/types/value-of.type.js';

import { type OnboardingStep } from '../user-details.js';
import { type UserDetailsCreateDto } from './types.js';

type UserDetailsCreateRequestDto = {
    talentBadges?: string[];
    talentHardSkills?: string[];
    completedStep?: ValueOf<typeof OnboardingStep>;
} & UserDetailsCreateDto;

export { type UserDetailsCreateRequestDto };
