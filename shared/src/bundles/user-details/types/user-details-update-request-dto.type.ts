import { type ValueOf } from '~/types/value-of.type.js';

import { type OnboardingSteps } from '../user-details.js';
import { type UserDetailsUpdateDto } from './types.js';

type UserDetailsUpdateRequestDto = {
    talentBadges?: string[];
    talentHardSkills?: string[];
    completedStep?: ValueOf<typeof OnboardingSteps>;
} & UserDetailsUpdateDto;

export { type UserDetailsUpdateRequestDto };
