import { ErrorMessage } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { type TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeModel } from './talent-badge.model.js';
import {
    type TalentBadgeCreate,
    type TalentBadgePatchAndFetch,
} from './types/types.js';

class TalentBadgeRepository implements Repository {
    private talentBadgeModel: typeof TalentBadgeModel;

    public constructor(talentBadgeModel: typeof TalentBadgeModel) {
        this.talentBadgeModel = talentBadgeModel;
    }

    public findAll(): Promise<TalentBadgeEntity[]> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadgeModel> {
        return await this.talentBadgeModel
            .query()
            .insert(badge)
            .returning('*')
            .execute();
    }

    public async findAllByUserId(userId: string): Promise<TalentBadgeModel[]> {
        return await this.talentBadgeModel
            .query()
            .where('userId', userId)
            .withGraphFetched('badge')
            .execute();
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<TalentBadgeModel | undefined> {
        return await this.talentBadgeModel.query().findOne({ ...payload });
    }

    public async update({
        id,
        isShown,
    }: TalentBadgePatchAndFetch): Promise<TalentBadgeModel> {
        return await this.talentBadgeModel.query().patchAndFetchById(id, {
            isShown,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeRepository };
