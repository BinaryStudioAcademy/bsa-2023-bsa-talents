import { type BadgeColors } from '../enums/enums.js';
import {
    type MappedBSABadge,
    type TalentBadge,
    type ValueOf,
} from '../types/types.js';
import { getBadgeColor, getBadgeType } from './helpers.js';

const mapBsaBadges = (talentBadges: TalentBadge[]): MappedBSABadge[] => {
    return talentBadges.map((talentBadge) => {
        const { id, userId, userDetailsId, score, level, badge } = talentBadge;

        return {
            id: id,
            userId,
            userDetailsId,
            score,
            level,
            maxScore: badge?.maxScore as number,
            name: badge?.name as string,
            type: getBadgeType(badge?.type),
            color: getBadgeColor(badge?.type) as ValueOf<typeof BadgeColors>,
        };
    });
};

export { mapBsaBadges };
