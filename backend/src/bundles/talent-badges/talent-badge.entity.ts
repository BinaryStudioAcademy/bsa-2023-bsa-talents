import { type Entity } from '~/common/types/types.js';

import { type BSABadgeEntity } from '../bsa-badges/bsa-badges.entity.js';

class TalentBadgeEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'score': number | null;

    private 'level': string | null;

    private 'badgeId': string;

    private 'isShown': boolean;

    private 'userDetailsId': string | null;

    private 'badge'?: BSABadgeEntity | null;

    private constructor({
        id,
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
        badge,
    }: {
        id: string | null;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
        badge?: BSABadgeEntity | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.score = score;
        this.level = level;
        this.badgeId = badgeId;
        this.isShown = isShown;
        this.userDetailsId = userDetailsId;
        this.badge = badge;
    }

    public static initialize({
        id,
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
        badge,
    }: {
        id: string;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
        badge?: BSABadgeEntity | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id,
            userId,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
            badge,
        });
    }

    public static initializeNew({
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id: null,
            userId,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
        badge?: BSABadgeEntity | null;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
            badge: this.badge,
        };
    }

    public toNewObject(): {
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    } {
        return {
            userId: this.userId,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
        };
    }
}

export { TalentBadgeEntity };
