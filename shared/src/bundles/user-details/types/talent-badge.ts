import { type BadgesItem } from '~/index.js';

type TalentBadge = {
    id: string | null;
    userId: string;
    score: number | null;
    level: string | null;
    badgeId: string;
    isShown: boolean;
    userDetailsId: string;
    badge?: BadgesItem | null;
};

export { type TalentBadge };
