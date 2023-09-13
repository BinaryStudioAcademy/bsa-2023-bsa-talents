import { type Entity } from '~/common/types/types.js';

class TalentBadgeEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'score': number | null;

    private 'level': string | null;

    private 'badgeId': string;

    private 'isShown': boolean;

    private 'userDetailsId': string | null;

    private constructor({
        id,
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        id: string | null;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.score = score;
        this.level = level;
        this.badgeId = badgeId;
        this.isShown = isShown;
        this.userDetailsId = userDetailsId;
    }

    public static initialize({
        id,
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        id: string;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id,
            userId,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
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
        badgeId: string | null;
        isShown: boolean;
        userDetailsId: string | null;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
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
