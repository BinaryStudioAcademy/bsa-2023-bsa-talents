import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
    HardSkillsTableColumn,
    TalentHardSkillsTableColumn,
} from '~/common/packages/database/database.js';

class HardSkillsModel extends AbstractModel {
    public 'name': string;

    public static override get tableName(): string {
        return DatabaseTableName.HARD_SKILLS;
    }

    public static override relationMappings = {
        talentSkills: {
            relation: Model.HasManyRelation,
            modelClass: '',
            join: {
                from: `${DatabaseTableName.HARD_SKILLS}.${HardSkillsTableColumn.ID}`,
                to: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.HARD_SKILL_ID}`,
            },
        },
    };
}

export { HardSkillsModel };
