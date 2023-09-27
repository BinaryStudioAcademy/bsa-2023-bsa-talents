type TalentBadge = {
    id: string;
    userId: string;
    name: string;
    score: number | null;
    maxScore: number | null;
    level: string | null;
    badgeId: string;
    isShown: boolean;
    userDetailsId: string;
    type: string;
};

export { type TalentBadge };
