import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/packages/database/database.js';

class HardSkillsModel extends AbstractModel {
    public 'name': string;

    public static override get tableName(): string {
        return DatabaseTableName.HARD_SKILLS;
    }
}

export { HardSkillsModel };
