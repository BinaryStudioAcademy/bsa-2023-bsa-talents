import { type Entity } from '~/common/types/types.js';

import { type HiringInfoProperties } from './types/types.js';

class HiringInfoEntity implements Entity {
    private 'id': string | null;

    private 'talentId': string;

    private 'companyId': string;

    private 'hiredTime': Date | null;

    private constructor({
        id,
        talentId,
        companyId,
        hiredTime,
    }: HiringInfoProperties) {
        this.id = id;
        this.talentId = talentId;
        this.companyId = companyId;
        this.hiredTime = hiredTime;
    }

    public static initialize({
        id,
        talentId,
        companyId,
        hiredTime,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id,
            talentId,
            companyId,
            hiredTime,
        });
    }

    public static initializeNew({
        talentId,
        companyId,
        hiredTime,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id: null,
            talentId,
            companyId,
            hiredTime,
        });
    }

    public toObject(): HiringInfoProperties {
        return {
            id: this.id as string,
            talentId: this.talentId,
            companyId: this.companyId,
            hiredTime: this.hiredTime,
        };
    }

    public toNewObject(): HiringInfoProperties {
        return {
            id: null,
            talentId: this.talentId,
            companyId: this.companyId,
            hiredTime: this.hiredTime,
        };
    }
}

export { HiringInfoEntity };
