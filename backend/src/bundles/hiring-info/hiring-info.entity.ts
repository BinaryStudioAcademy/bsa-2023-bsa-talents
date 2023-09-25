import { type Entity } from '~/common/types/types.js';

import { type HiringInfoProperties } from './types/types.js';

class HiringInfoEntity implements Entity {
    private 'id': string | null;

    private 'talentId': string;

    private 'companyId': string;

    private 'hiredTime': Date | null;

    private 'talentEmail'?: string;

    private 'talentPhone'?: string;

    private 'talentFullName'?: string;

    private 'employerFullName'?: string;

    private 'employerPosition'?: string;

    private 'companyName'?: string;

    private 'companyEmail'?: string;

    private constructor({
        id,
        talentId,
        companyId,
        hiredTime,
        talentPhone,
        talentFullName,
        talentEmail,
        employerFullName,
        employerPosition,
        companyName,
        companyEmail,
    }: HiringInfoProperties) {
        this.id = id;
        this.talentId = talentId;
        this.companyId = companyId;
        this.hiredTime = hiredTime;
        this.talentPhone = talentPhone;
        this.talentEmail = talentEmail;
        this.talentFullName = talentFullName;
        this.companyName = companyName;
        this.companyEmail = companyEmail;
        this.employerFullName = employerFullName;
        this.employerPosition = employerPosition;
    }

    public static initialize({
        id,
        talentId,
        companyId,
        hiredTime,
        talentPhone,
        talentFullName,
        talentEmail,
        employerFullName,
        employerPosition,
        companyName,
        companyEmail,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id,
            talentId,
            companyId,
            hiredTime,
            talentPhone,
            talentFullName,
            talentEmail,
            employerFullName,
            employerPosition,
            companyName,
            companyEmail,
        });
    }

    public static initializeNew({
        talentId,
        companyId,
        hiredTime,
        talent,
        company,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id: null,
            talentId,
            companyId,
            hiredTime,
            talent,
            company,
        });
    }

    public toObject(): HiringInfoProperties {
        return {
            id: this.id as string,
            talentId: this.talentId,
            companyId: this.companyId,
            hiredTime: this.hiredTime,
            talentPhone: this.talentPhone,
            talentFullName: this.talentFullName,
            talentEmail: this.talentEmail,
            employerFullName: this.employerFullName,
            employerPosition: this.employerPosition,
            companyName: this.companyName,
            companyEmail: this.companyEmail,
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
