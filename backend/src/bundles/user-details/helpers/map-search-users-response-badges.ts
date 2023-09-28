import { TalentBadgeEntity } from '~/bundles/talent-badges/talent-badge.entity.js';

import { type TalentBadge } from '../types/types.js';
import { type UserDetailsModel } from '../user-details.model.js';

const mapSearchUsersResponseBadges = (
    user: UserDetailsModel,
): TalentBadge[] | null => {
    const talentBadges = user.talentBadges.map((badge) => {
        if (badge.badge) {
            const basicBadge = TalentBadgeEntity.initialize({
                id: badge.id,
                userId: badge.userId,
                score: badge.score,
                level: badge.level,
                badgeId: badge.badgeId,
                isShown: badge.isShown,
                userDetailsId: badge.userDetailsId,
            }).toObject();

            return { ...basicBadge, badge: badge.badge };
        }
    });

    const filteredBadges = talentBadges.filter(Boolean) as TalentBadge[];

    if (filteredBadges.length === 0) {
        return null;
    }

    return filteredBadges;
};

export { mapSearchUsersResponseBadges };
