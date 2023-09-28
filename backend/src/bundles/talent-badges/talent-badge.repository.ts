import { ErrorMessage } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

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

    public findAll(): Promise<TalentBadgeModel[]> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async findAllByUserId(userId: string): Promise<TalentBadgeModel[]> {
        return await this.talentBadgeModel
            .query()
            .where('userId', userId)
            .withGraphFetched('badge')
            .execute();
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadgeModel> {
        return await this.talentBadgeModel
            .query()
            .insert({
                ...badge,
                isShown: badge.isShown ?? true,
            })
            .returning('*')
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
        userDetailsId,
    }: TalentBadgePatchAndFetch): Promise<TalentBadgeModel> {
        return await this.talentBadgeModel
            .query()
            .patchAndFetchById(id as string, {
                isShown,
                userDetailsId,
            });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeRepository };
