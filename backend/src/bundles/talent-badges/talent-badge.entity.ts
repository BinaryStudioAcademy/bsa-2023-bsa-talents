import { type Entity } from '~/common/types/types.js';

import { type BSABadgeEntity } from '../bsa-badges/bsa-badges.entity.js';
import { type BadgesItem } from '../lms-data/types/types.js';
import { type TalentBadgeCreateDto } from './types/types.js';

class TalentBadgeEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'score': number | null;

    private 'level': string | null;

    private 'badgeId': string;

    private 'isShown': boolean;

    private 'userDetailsId': string;

    private 'badge': BSABadgeEntity | null;

    private constructor({
        id,
        userId,
        score,
        level,
        badgeId,
        isShown,
        userDetailsId,
        badge,
    }: TalentBadgeCreateDto) {
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
    }: TalentBadgeCreateDto): TalentBadgeEntity {
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
        badge,
    }: {
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string;
        badge: BSABadgeEntity | null;
    }): TalentBadgeEntity {
        return new TalentBadgeEntity({
            id: null,
            userId,
            score,
            level,
            badgeId,
            isShown,
            userDetailsId,
            badge,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string;
        badge: BadgesItem | null;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            score: this.score,
            level: this.level,
            badgeId: this.badgeId,
            isShown: this.isShown,
            userDetailsId: this.userDetailsId,
            badge: this.badge?.toObject() ?? null,
        };
    }

    public toNewObject(): {
        userId: string;
        score: number | null;
        level: string | null;
        badgeId: string;
        isShown: boolean;
        userDetailsId: string;
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
