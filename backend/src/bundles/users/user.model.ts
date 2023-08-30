import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
    UserDetailsTableColumn,
    UsersTableColumn,
} from '~/common/database/database.js';
import { type UserRole } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'role': ValueOf<typeof UserRole>;

    public 'passwordHash': string;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static override relationMappings = {
        details: {
            relation: Model.HasOneRelation,
            modelClass: UserModel,
            join: {
                from: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
            },
        },
    };
}

export { UserModel };
