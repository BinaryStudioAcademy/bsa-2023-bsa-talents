import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';
import { type UserRole } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'role': ValueOf<typeof UserRole>;

    public 'passwordHash': string;

    public 'role': string; // Change in bt-86 to role type

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }
}

export { UserModel };
