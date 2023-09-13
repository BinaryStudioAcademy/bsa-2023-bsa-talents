import { type UserDetailsCreateDto } from './types.js';

type UserDetailsCreateRequestDto = {
    talentBadges?: string[];
} & UserDetailsCreateDto;

export { type UserDetailsCreateRequestDto };
