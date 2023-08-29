import { Model } from 'objection';

import { UserDetailsModel } from '~/bundles/users/user-details.model.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class HardSkillsModel extends AbstractModel {
    public 'name': string;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_HARD_SKILLS;
    }

    public static override relationMappings = {
        talents: {
            relation: Model.ManyToManyRelation,
            modelClass: UserDetailsModel,
            join: {
                from: 'hard_skills.id',
                through: {
                    from: 'talent_hard_skills.hardSkillsId',
                    to: 'talent_hard_skills.userDetailsId',
                },
                to: 'user_details.id',
            },
        },
    };
}

export { HardSkillsModel };
