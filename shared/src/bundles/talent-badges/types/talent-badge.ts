import { type BadgesItem } from '../../../bundles/common-data/badges/types/badges-item.js';

type TalentBadge = {
    id: string;
    userId: string;
    score: number | null;
    level: string | null;
    badgeId: string;
    isShown: boolean;
    userDetailsId: string;
    badge?: BadgesItem | null;
};

export { type TalentBadge };
