import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
    HardSkillsTableColumn,
    TalentHardSkillsTableColumn,
    UserDetailsTableColumn,
} from '~/common/packages/database/database.js';

class HardSkillsModel extends AbstractModel {
    public 'name': string;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_HARD_SKILLS;
    }

    public static override relationMappings = {
        talents: {
            relation: Model.ManyToManyRelation,
            modelClass: '',
            join: {
                from: `${DatabaseTableName.HARD_SKILLS}.${HardSkillsTableColumn.ID}`,
                through: {
                    from: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.HARD_SKILL_ID}`,
                    to: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.USER_DETAILS_ID}`,
                },
                to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
            },
        },
    };
}

export { HardSkillsModel };
