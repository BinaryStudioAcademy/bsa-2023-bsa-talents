import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
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
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public find(): Promise<TalentBadgeRepository> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadge> {
        return this.talentBadgeRepository.create(badge);
    }

    public async update({
        badgeId,
        userId,
    }: TalentBadgeUpdate): Promise<TalentBadge> {
        const badge = await this.talentBadgeRepository.find({
            badgeId,
            userId,
        });

        if (!badge) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return this.talentBadgeRepository.update({
            ...badge,
            isShown: !badge.isShown,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
