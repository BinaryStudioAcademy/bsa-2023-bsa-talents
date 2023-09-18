import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type TalentBadgeRepository } from './talent-badge.repository.js';
import {
    type TalentBadge,
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

    public async create(badge: TalentBadgeCreate): Promise<TalentBadge> {
        return this.talentBadgeRepository.create(badge);
    }

    public async update({
        userDetailsId,
        badgeId,
        userId,
    }: TalentBadgeUpdate): Promise<TalentBadge> {
        const badge = await this.talentBadgeRepository.find({
            badgeId,
            userId,
        });

        return badge
            ? this.talentBadgeRepository.update({
                  ...badge,
                  isShown: !badge.isShown,
                  userDetailsId,
              })
            : this.talentBadgeRepository.create({
                  badgeId,
                  userId,
                  userDetailsId,
              });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
