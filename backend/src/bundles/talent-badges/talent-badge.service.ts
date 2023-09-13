import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeRepository } from './talent-badge.repository.js';

class TalentBadgeService implements Service {
    private talentBadgeRepository: TalentBadgeRepository;

    public constructor(talentBadgeRepository: TalentBadgeRepository) {
        this.talentBadgeRepository = talentBadgeRepository;
    }

    public findAll(): Promise<{ items: TalentBadgeRepository[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public find(): Promise<TalentBadgeRepository> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(badgeId: string): Promise<TalentBadgeEntity> {
        return await this.talentBadgeRepository.create(badgeId);
    }

    public update(): Promise<TalentBadgeRepository> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
