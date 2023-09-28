import { type BadgesItem, type File } from '../../../index.js';
import { type UserDetailsResponseDto } from './types.js';

type UserDetailsFullResponseDto = Omit<
    UserDetailsResponseDto,
    'talentBadges'
> & {
    photo: File | null;
    companyLogo: File | null;
    cv: File | null;
    talentBadges: {
        id: string | null;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
        badge: BadgesItem;
    }[];
};

export { type UserDetailsFullResponseDto };
