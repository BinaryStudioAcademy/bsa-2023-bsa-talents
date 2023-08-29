import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'role': string; // Change in bt-86 to role type

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static override relationMappings = {
        details: {
            relation: Model.HasOneRelation,
            modelClass: UserModel,
            join: {
                from: `${DatabaseTableName.USERS}.id`,
                to: `${DatabaseTableName.USER_DETAILS}.userId`,
            },
        },
    };
}

export { UserModel };
