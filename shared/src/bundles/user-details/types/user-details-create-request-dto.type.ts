import { type ValueOf } from '~/types/value-of.type.js';

import { type OnboardingSteps } from '../user-details.js';
import { type UserDetailsCreateDto } from './types.js';

type UserDetailsCreateRequestDto = {
    talentBadges?: string[];
    talentHardSkills?: string[];
    completedStep?: ValueOf<typeof OnboardingSteps>;
} & UserDetailsCreateDto;

export { type UserDetailsCreateRequestDto };
