import { type TalentBadge, type ValueOf } from 'shared/build/index.js';

import { type BadgeColors } from '~/bundles/common/enums/enums';
import { type MappedBSABadge } from '~/bundles/common-data/types/types';

import { getBadgeColor, getBadgeType } from '../helpers';

const DECIMAL_PLACES = 1;
const LEVEL_LENGTH = 2;

const mapBsaBadges = (talentBadges: TalentBadge[]): MappedBSABadge[] => {
    return talentBadges.map((talentBadge) => {
        const { id, userId, userDetailsId, score, level, badge } = talentBadge;
        let roundedNumber = null;
        if (score) {
            roundedNumber = Number.parseFloat(score.toFixed(DECIMAL_PLACES));
        }

        const shortLevel = level ? level.slice(0, LEVEL_LENGTH) : null;

        return {
            id: id,
            userId,
            userDetailsId,
            score: roundedNumber,
            level: shortLevel,
            maxScore: badge?.maxScore as number,
            name: badge?.name as string,
            type: getBadgeType(badge?.type),
            color: getBadgeColor(badge?.type) as ValueOf<typeof BadgeColors>,
        };
    });
};

export { mapBsaBadges };
