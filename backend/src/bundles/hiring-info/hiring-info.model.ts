import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
    HiringInfoTableColumn,
    UserDetailsTableColumn,
} from '~/common/packages/database/database.js';

import { UserDetailsModel } from '../user-details/user-details.model.js';

class HiringInfoModel extends AbstractModel {
    public 'talentId': string;

    public 'companyId': string;

    public 'hiredTime': Date | null;

    public static override get tableName(): string {
        return DatabaseTableName.HIRING_INFO;
    }

    public static override relationMappings = {
        talent: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserDetailsModel,
            join: {
                from: `${DatabaseTableName.HIRING_INFO}.${HiringInfoTableColumn.TALENT_ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
            },
        },
        company: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserDetailsModel,
            join: {
                from: `${DatabaseTableName.HIRING_INFO}.${HiringInfoTableColumn.COMPANY_ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
            },
        },
    };
}

export { HiringInfoModel };
