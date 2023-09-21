import { type Entity } from '~/common/types/types.js';

class LMSDataEntity implements Entity {
    private 'userId': string | null;

    private 'data': string;

    // TODO: should be added another fields

    private constructor({
        userId,
        data,
    }: {
        userId: string | null;
        data: string;
    }) {
        this.userId = userId;
        this.data = data;
    }

    public static initialize({
        userId,
        data,
    }: {
        userId: string;
        data: string;
    }): LMSDataEntity {
        return new LMSDataEntity({
            userId,
            data,
        });
    }

    public static initializeNew({ data }: { data: string }): LMSDataEntity {
        return new LMSDataEntity({
            userId: null,
            data,
        });
    }

    public toObject(): {
        userId: string;
        data: string;
    } {
        return {
            userId: this.userId as string,
            data: this.data,
        };
    }

    public toNewObject(): {
        userId: string | null;
        data: string;
    } {
        return {
            userId: this.userId,
            data: this.data,
        };
    }
}

export { LMSDataEntity };
