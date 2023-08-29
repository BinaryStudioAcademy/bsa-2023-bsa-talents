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
}

export { UserModel };
