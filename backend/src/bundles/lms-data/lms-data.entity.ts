import { type Entity } from '~/common/types/types.js';

class LMSDataEntity implements Entity {
    private 'id': string | null;

    private 'field': string;

    // TODO: should be added another fields

    private constructor({ id, field }: { id: string | null; field: string }) {
        this.id = id;
        this.field = field;
    }

    public static initialize({
        id,
        field,
    }: {
        id: string;
        field: string;
    }): LMSDataEntity {
        return new LMSDataEntity({
            id,
            field,
        });
    }

    public static initializeNew({ field }: { field: string }): LMSDataEntity {
        return new LMSDataEntity({
            id: null,
            field,
        });
    }

    public toObject(): {
        id: string;
        field: string;
    } {
        return {
            id: this.id as string,
            field: this.field,
        };
    }

    public toNewObject(): {
        field: string;
    } {
        return {
            field: this.field,
        };
    }
}

export { LMSDataEntity };
