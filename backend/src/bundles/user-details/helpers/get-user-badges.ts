import { type BSABadgeEntity } from '~/bundles/bsa-badges/bsa-badges.entity.js';
import { bsaBadgesService } from '~/bundles/bsa-badges/bsa-badges.js';
import { talentBadgeService } from '~/bundles/talent-badges/talent-badges.js';

const getUserBadges = async (
    userDetailsId: string,
): Promise<BSABadgeEntity[]> => {
    const badgesData = await talentBadgeService.findByUserDetailsId(
        userDetailsId,
    );

    const userBadges: BSABadgeEntity[] = [];

    for (const badge of badgesData) {
        if (badge.badgeId) {
            const badges = await bsaBadgesService.findById(badge.badgeId);
            if (badges) {
                userBadges.push(badges);
            }
        }
    }

    return userBadges;
};

export { getUserBadges };
