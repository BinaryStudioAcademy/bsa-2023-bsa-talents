import { type Entity, type ValueOf } from '~/common/types/types.js';

import { type PaidStatus } from './enums/enums.js';
import { type HiringInfoProperties } from './types/types.js';

class HiringInfoEntity implements Entity {
    private 'id': string | null;

    private 'talentId': string;

    private 'companyId': string;

    private 'firstContactTime': Date;

    private 'hasSharedInfo': boolean;

    private 'sharedInfoTime': Date | null;

    private 'isHired': boolean;

    private 'hiredTime': Date | null;

    private 'hiredSalary': number | null;

    private 'hiredPosition': string | null;

    private 'isApproved': boolean;

    private 'fee': number | null;

    private 'status': ValueOf<typeof PaidStatus> | null;

    private constructor({
        id,
        talentId,
        companyId,
        firstContactTime,
        hasSharedInfo,
        sharedInfoTime,
        isHired,
        hiredTime,
        hiredSalary,
        hiredPosition,
        isApproved,
        status,
        fee,
    }: HiringInfoProperties) {
        this.id = id;
        this.talentId = talentId;
        this.isApproved = isApproved;
        this.companyId = companyId;
        this.isHired = isHired;
        this.firstContactTime = firstContactTime;
        this.hasSharedInfo = hasSharedInfo;
        this.sharedInfoTime = sharedInfoTime;
        this.hiredTime = hiredTime;
        this.hiredSalary = hiredSalary;
        this.hiredPosition = hiredPosition;
        this.status = status;
        this.fee = fee;
    }

    public static initialize({
        id,
        talentId,
        companyId,
        firstContactTime,
        hasSharedInfo,
        sharedInfoTime,
        isHired,
        hiredTime,
        hiredSalary,
        hiredPosition,
        isApproved,
        status,
        fee,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id,
            talentId,
            companyId,
            firstContactTime,
            hasSharedInfo,
            sharedInfoTime,
            isHired,
            hiredTime,
            hiredSalary,
            hiredPosition,
            isApproved,
            status,
            fee,
        });
    }

    public static initializeNew({
        talentId,
        companyId,
        firstContactTime,
        hasSharedInfo,
        sharedInfoTime,
        isHired,
        hiredTime,
        hiredSalary,
        hiredPosition,
        isApproved,
        status,
        fee,
    }: HiringInfoProperties): HiringInfoEntity {
        return new HiringInfoEntity({
            id: null,
            talentId,
            companyId,
            firstContactTime,
            hasSharedInfo,
            sharedInfoTime,
            isHired,
            hiredTime,
            hiredSalary,
            hiredPosition,
            isApproved,
            status,
            fee,
        });
    }

    public toObject(): HiringInfoProperties {
        return {
            id: this.id as string,
            talentId: this.talentId,
            isApproved: this.isApproved,
            companyId: this.companyId,
            isHired: this.isHired,
            hiredTime: this.hiredTime,
            hiredPosition: this.hiredPosition,
            hiredSalary: this.hiredSalary,
            hasSharedInfo: this.hasSharedInfo,
            sharedInfoTime: this.sharedInfoTime,
            firstContactTime: this.firstContactTime,
            status: this.status,
            fee: this.fee,
        };
    }

    public toNewObject(): HiringInfoProperties {
        return {
            id: null,
            talentId: this.talentId,
            isApproved: this.isApproved,
            companyId: this.companyId,
            isHired: this.isHired,
            hiredTime: this.hiredTime,
            hiredPosition: this.hiredPosition,
            hiredSalary: this.hiredSalary,
            hasSharedInfo: this.hasSharedInfo,
            sharedInfoTime: this.sharedInfoTime,
            firstContactTime: this.firstContactTime,
            status: this.status,
            fee: this.fee,
        };
    }
}

export { HiringInfoEntity };
