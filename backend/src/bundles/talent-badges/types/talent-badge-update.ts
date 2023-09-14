type TalentBadgePatchAndFetch = {
    id: string;
    userId: string;
    badgeId: string;
    isShown?: boolean;
    userDetailsId: string | null;
};

type TalentBadgeUpdate = Omit<TalentBadgePatchAndFetch, 'id'>;

export { type TalentBadgePatchAndFetch, type TalentBadgeUpdate };
