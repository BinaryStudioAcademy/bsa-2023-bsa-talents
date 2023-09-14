import { type UserDetailsCreateDto } from './types.js';

type UserDetailsCreateRequestDto = {
    talentBadges?: string[];
    talentHardSkills?: string[];
} & UserDetailsCreateDto;

export { type UserDetailsCreateRequestDto };
