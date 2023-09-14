import { Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
    HardSkillsTableColumn,
    TalentHardSkillsTableColumn,
} from '~/common/packages/database/database.js';

import { HardSkillsModel } from '../hard-skills/hard-skills.js';

class TalentHardSkillsModel extends AbstractModel {
    public 'hardSkillId': string;

    public 'userDetailsId': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_HARD_SKILLS;
    }

    public static get relationMappings(): RelationMappings {
        return {
            hardSkill: {
                relation: Model.BelongsToOneRelation,
                modelClass: HardSkillsModel,
                join: {
                    from: `${DatabaseTableName.TALENT_HARD_SKILLS}.${TalentHardSkillsTableColumn.HARD_SKILL_ID}`,
                    to: `${DatabaseTableName.HARD_SKILLS}.${HardSkillsTableColumn.ID}`,
                },
            },
        };
    }
}

export { TalentHardSkillsModel };
