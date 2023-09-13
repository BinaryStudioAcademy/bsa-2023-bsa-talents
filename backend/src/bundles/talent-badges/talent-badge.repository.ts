import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeModel } from './talent-badge.model.js';
import { type TalentBadgeCreate } from './types/types.js';

class TalentBadgeRepository implements Repository {
    private talentBadgeModel: typeof TalentBadgeModel;

    public constructor(talentBadgeModel: typeof TalentBadgeModel) {
        this.talentBadgeModel = talentBadgeModel;
    }

    public findAll(): Promise<TalentBadgeEntity[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create({
        badgeId,
        userId,
    }: TalentBadgeCreate): Promise<TalentBadgeEntity> {
        const item = await this.talentBadgeModel
            .query()
            .insert({
                badgeId,
                isShown: true,
                userId,
            })
            .returning('*')
            .execute();

        return TalentBadgeEntity.initializeNew(item);
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<TalentBadgeModel | null> {
        const badge = await this.talentBadgeModel
            .query()
            .findOne({ ...payload });

        return badge ?? null;
    }

    public async update(
        badge: TalentBadgeModel & { id: string },
    ): Promise<TalentBadgeEntity> {
        const talentBadge = await this.talentBadgeModel
            .query()
            .patchAndFetchById(badge.id, { isShown: !badge.isShown });

        return TalentBadgeEntity.initializeNew(talentBadge);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeRepository };
