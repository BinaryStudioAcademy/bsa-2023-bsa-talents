import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeModel } from './talent-badge.model.js';
import {
    type TalentBadge,
    type TalentBadgeCreate,
    type TalentBadgePatchAndFetch,
} from './types/types.js';

class TalentBadgeRepository implements Repository {
    private talentBadgeModel: typeof TalentBadgeModel;

    public constructor(talentBadgeModel: typeof TalentBadgeModel) {
        this.talentBadgeModel = talentBadgeModel;
    }

    public findAll(): Promise<TalentBadgeEntity[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadge> {
        const item = await this.talentBadgeModel
            .query()
            .insert({
                ...badge,
                isShown: true,
            })
            .returning('*')
            .execute();

        return TalentBadgeEntity.initialize(item).toObject();
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<TalentBadge | null> {
        const badge = await this.talentBadgeModel
            .query()
            .findOne({ ...payload });

        return badge ? TalentBadgeEntity.initialize(badge).toObject() : null;
    }

    public async update({
        id,
        isShown,
        userDetailsId,
    }: TalentBadgePatchAndFetch): Promise<TalentBadge> {
        const talentBadge = await this.talentBadgeModel
            .query()
            .patchAndFetchById(id as string, {
                isShown,
                userDetailsId,
            });

        return TalentBadgeEntity.initialize(talentBadge).toObject();
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeRepository };
