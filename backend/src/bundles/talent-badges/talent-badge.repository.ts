import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeModel } from './talent-badge.model.js';

class TalentBadgeRepository implements Repository {
    private talentBadgeModel: typeof TalentBadgeModel;

    public constructor(talentBadgeModel: typeof TalentBadgeModel) {
        this.talentBadgeModel = talentBadgeModel;
    }

    public findAll(): Promise<TalentBadgeEntity[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(badgeId: string): Promise<TalentBadgeEntity> {
        const item = await this.talentBadgeModel
            .query()
            .insert({
                badgeId,
                isShown: true,
                // TODO: change userEmail when we get data from LMS
                userEmail: 'qwe@gmail.com',
            })
            .returning('*')
            .execute();

        return TalentBadgeEntity.initializeNew(item);
    }

    public find(): Promise<TalentBadgeEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public update(): Promise<TalentBadgeEntity> {
        // if a badge is in db - is shown false otherwise create with value true
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeRepository };
