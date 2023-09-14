import { type UserDetailsUpdateDto } from './types';

type UserDetailsUpdateRequestDto = {
    talentBadges?: string[];
    talentHardSkills?: string[];
} & UserDetailsUpdateDto;

export { type UserDetailsUpdateRequestDto };
