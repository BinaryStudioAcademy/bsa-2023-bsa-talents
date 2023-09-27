import { TalentBadgeEntity } from '~/bundles/talent-badges/talent-badge.entity.js';

import { type UserDetailsResponseBadgeDto } from '../types/types.js';
import { type UserDetailsModel } from '../user-details.model.js';

const mapSearchUsersResponseBadges = (
    user: UserDetailsModel,
): UserDetailsResponseBadgeDto[] | null => {
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

    const formattedBadges = talentBadges.map((item) => {
        if (item) {
            const itemBSABadge = item.badge;
            return {
                id: item.id,
                userId: item.userId,
                score: item.score,
                level: item.level,
                badgeId: item.badgeId,
                isShown: item.isShown,
                userDetailsId: item.userDetailsId,
                type: itemBSABadge.type,
                name: itemBSABadge.name,
                maxScore: itemBSABadge.maxScore,
            };
        }
    });

    const filteredBadges = formattedBadges.filter(
        Boolean,
    ) as UserDetailsResponseBadgeDto[];

    if (filteredBadges.length === 0) {
        return null;
    }

    return filteredBadges;
};

export { mapSearchUsersResponseBadges };
