import { type ValueOf } from '~/types/types.js';

import { type PaidStatus } from '../hiring-info.js';

type HiringInfoResponseDto = {
    id: string | null;
    talentId: string;
    companyId: string;
    firstContactTime: Date;
    hasSharedInfo: boolean;
    sharedInfoTime: Date | null;
    isHired: boolean;
    hiredTime: Date | null;
    hiredSalary: number | null;
    hiredPosition: string | null;
    isApproved: boolean;
    status: ValueOf<typeof PaidStatus> | null;
    fee: number | null;
};

export { type HiringInfoResponseDto };
