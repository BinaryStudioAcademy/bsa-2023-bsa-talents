type TalentBadgeCreate = {
    badgeId: string;
    userId: string;
    userDetailsId: string;
    score?: number | null;
    level?: string | null;
    isShown?: boolean;
};

export { type TalentBadgeCreate };
