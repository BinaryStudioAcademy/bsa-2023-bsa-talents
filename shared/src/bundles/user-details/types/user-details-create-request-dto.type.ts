import { type UserDetailsCreateDto } from './user-details-create-dto.type.js';

type UserDetailsCreateRequestDto = {
    talentBadges: string[];
} & UserDetailsCreateDto;

export { type UserDetailsCreateRequestDto };
