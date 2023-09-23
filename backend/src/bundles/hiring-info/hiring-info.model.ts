import { Model } from 'objection';

import { FileModel } from '~/bundles/files/files.js';
import { UserDetailsModel } from '~/bundles/user-details/user-details.model.js';
import {
    AbstractModel,
    DatabaseTableName,
    HiringInfoTableColumn,
    UserDetailsTableColumn,
} from '~/common/packages/database/database.js';
import { type ValueOf } from '~/common/types/types.js';

import { type PaidStatus } from './enums/enums.js';

class HiringInfoModel extends AbstractModel {
    public 'talentId': string;

    public 'companyId': string;

    public 'firstContactTime': Date;

    public 'hasSharedInfo': boolean;

    public 'sharedInfoTime': Date | null;

    public 'isHired': boolean;

    public 'hiredTime': Date | null;

    public 'hiredSalary': number | null;

    public 'hiredPosition': string | null;

    public 'isApproved': boolean;

    public 'fee': number | null;

    public 'status': ValueOf<typeof PaidStatus> | null;

    public static override get tableName(): string {
        return DatabaseTableName.HIRING_INFO;
    }

    public static override relationMappings = {
        talent: {
            relation: Model.HasOneRelation,
            modelClass: UserDetailsModel,
            join: {
                from: `${DatabaseTableName.HIRING_INFO}.${HiringInfoTableColumn.TALENT_ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
            },
        },
        company: {
            relation: Model.HasOneRelation,
            modelClass: FileModel,
            join: {
                from: `${DatabaseTableName.HIRING_INFO}.${HiringInfoTableColumn.COMPANY_ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
            },
        },
    };
}

export { HiringInfoModel };
