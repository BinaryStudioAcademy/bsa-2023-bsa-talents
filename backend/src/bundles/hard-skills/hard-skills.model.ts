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
                from: `${DatabaseTableName.HARD_SKILLS}.id`,
                through: {
                    from: `${DatabaseTableName.TALENT_HARD_SKILLS}.hardSkillsId`,
                    to: `${DatabaseTableName.TALENT_HARD_SKILLS}.userDetailsId`,
                },
                to: 'user_details.id',
            },
        },
    };
}

export { HardSkillsModel };
