import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class TalentBadgeModel extends AbstractModel {
    public 'userEmail': string;

    public 'score': number | null;

    public 'level': string | null;

    public 'isShown': boolean;

    public 'badgeId': string;

    public 'userDetailsId': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_BADGES;
    }
}

export { TalentBadgeModel };
