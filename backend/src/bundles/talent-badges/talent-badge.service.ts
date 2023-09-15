import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeRepository } from './talent-badge.repository.js';
import {
    type TalentBadgeCreate,
    type TalentBadgeUpdate,
} from './types/types.js';

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

    public async create(badge: TalentBadgeCreate): Promise<TalentBadgeEntity> {
        return await this.talentBadgeRepository.create(badge);
    }

    public async update({
        userDetailsId,
        badgeId,
        userId,
    }: TalentBadgeUpdate): Promise<TalentBadgeEntity> {
        const badge = await this.talentBadgeRepository.find({
            badgeId,
            userId,
        });

        return await (badge
            ? this.talentBadgeRepository.update({
                  ...badge,
                  userDetailsId,
              })
            : this.talentBadgeRepository.create({
                  badgeId,
                  userId,
              }));
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
