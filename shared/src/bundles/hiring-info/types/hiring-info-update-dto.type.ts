import { type ValueOf } from '~/types/types.js';

import { type Status } from '../enums/enums.js';

type HiringInfoUpdateDto = {
    id?: string;
    talentId?: string;
    companyId?: string;
    hasSharedInfo?: boolean;
    sharedInfoTime?: Date;
    isHired?: boolean;
    hiredTime?: Date;
    hiredSalary?: number;
    hiredPosition?: string;
    isApproved?: boolean;
    status?: ValueOf<typeof Status>;
    fee?: number | null;
};

export { type HiringInfoUpdateDto };
