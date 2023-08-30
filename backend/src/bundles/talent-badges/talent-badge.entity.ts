import { type Entity } from '~/common/types/types.js';

class TalentBadgeEntity implements Entity {
    private 'id': string | null;

    private 'userEmail': string;

    private 'score': number | null;

    private 'level': string | null;

    private 'badgeId': string;

    private 'isShown': boolean;

    private 'userDetailsId': string | null;

    private constructor({
        id,
        userEmail,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        id: string | null;
        userEmail: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }) {
        this.id = id;
        this.userEmail = userEmail;
        this.score = score;
        this.level = level;
        this.badgeId = badgeId;
        this.isShown = isShown;
        this.userDetailsId = userDetailsId;
    }

    public static initialize({
        id,
        userEmail,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        id: string;
        userEmail: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id,
            userEmail,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
        });
    }

    public static initializeNew({
        userEmail,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
    }: {
        userEmail: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id: null,
            userEmail,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
        });
    }

    public toObject(): {
        id: string;
        userEmail: string;
        score: number | null;
        level: string | null;
        badgeId: string | null;
        isShown: boolean;
        userDetailsId: string | null;
    } {
        return {
            id: this.id as string,
            userEmail: this.userEmail,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
        };
    }

    public toNewObject(): {
        userEmail: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string | null;
    } {
        return {
            userEmail: this.userEmail,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
        };
    }
}

export { TalentBadgeEntity };
