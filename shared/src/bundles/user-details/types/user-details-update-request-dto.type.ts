import { type UserDetailsUpdateDto } from './types';

type UserDetailsUpdateRequestDto = {
    talentBadges?: string[];
} & UserDetailsUpdateDto;

export { type UserDetailsUpdateRequestDto };
