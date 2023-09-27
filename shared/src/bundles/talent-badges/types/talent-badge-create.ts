type TalentBadgeCreate = {
    badgeId: string;
    userId: string;
    score?: number | null;
    level?: string | null;
    isShown?: boolean;
    userDetailsId: string;
};

export { type TalentBadgeCreate };
