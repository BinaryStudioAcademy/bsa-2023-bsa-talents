import { type Entity } from '~/common/types/types.js';

class BSABadgeEntity implements Entity {
    private 'id': string | null;

    private 'type': string;

    private 'name': string;

    private 'maxScore': number;

    private constructor({
        id,
        type,
        name,
        maxScore,
    }: {
        id: string | null;
        type: string;
        name: string;
        maxScore: number;
    }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.maxScore = maxScore;
    }

    public static initialize({
        id,
        type,
        name,
        maxScore,
    }: {
        id: string;
        type: string;
        name: string;
        maxScore: number;
    }): BSABadgeEntity {
        return new BSABadgeEntity({
            id,
            type,
            name,
            maxScore,
        });
    }

    public static initializeNew({
        type,
        name,
        maxScore,
    }: {
        type: string;
        name: string;
        maxScore: number;
    }): BSABadgeEntity {
        return new BSABadgeEntity({
            id: null,
            type,
            name,
            maxScore,
        });
    }

    public toObject(): {
        id: string;
        type: string;
        name: string;
        maxScore: number;
    } {
        return {
            id: this.id as string,
            type: this.type,
            name: this.name,
            maxScore: this.maxScore,
        };
    }

    public toNewObject(): {
        type: string;
        name: string;
        maxScore: number;
    } {
        return {
            type: this.type,
            name: this.name,
            maxScore: this.maxScore,
        };
    }
}

export { BSABadgeEntity };
