// TODO: Remove after fix shared and backend values
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { type CandidateHardSkill } from './candidate-hard-skill.type';

type CandidateDetailsType = {
    hardSkills: CandidateHardSkill;
} & Omit<UserDetailsResponseDto, 'talentHardSkills'>;

export { type CandidateDetailsType };
