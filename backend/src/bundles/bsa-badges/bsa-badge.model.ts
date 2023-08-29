import { Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/packages/database/database.js';

import { TalentBadgeModel } from '../talent-badges/talent-badges.js';

class BSABadgesModel extends AbstractModel {
    public 'type': string;

    public 'name': string;

    public 'maxScore': number;

    public static override get tableName(): string {
        return DatabaseTableName.BSA_BADGES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            talentBadges: {
                relation: Model.HasManyRelation,
                modelClass: TalentBadgeModel,
                join: {
                    from: `${DatabaseTableName.BSA_BADGES}.id`,
                    to: `${DatabaseTableName.TALENT_BADGES}.badgeId`,
                },
            },
        };
    }
}

export { BSABadgesModel };
