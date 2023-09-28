import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { BSABadgeEntity } from '../bsa-badges/bsa-badges.entity.js';
import { TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeRepository } from './talent-badge.repository.js';
import {
    type TalentBadge,
    type TalentBadgeCreate,
    type TalentBadgeResponseDto,
    type TalentBadgeUpdate,
} from './types/types.js';

class TalentBadgeService implements Service {
    private talentBadgeRepository: TalentBadgeRepository;

    public constructor(talentBadgeRepository: TalentBadgeRepository) {
        this.talentBadgeRepository = talentBadgeRepository;
    }

    public findAll(): Promise<{ items: TalentBadge[] }> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public find(): Promise<TalentBadge> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<TalentBadgeResponseDto> {
        const badges = await this.talentBadgeRepository.findAllByUserId(userId);
        return {
            items: badges.map((item) =>
                TalentBadgeEntity.initialize({
                    ...item,
                    badge: item.badge
                        ? BSABadgeEntity.initialize(item.badge)
                        : null,
                }).toObject(),
            ),
        };
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadge> {
        const item = await this.talentBadgeRepository.create(badge);
        return TalentBadgeEntity.initialize({
            ...item,
            badge: item.badge ? BSABadgeEntity.initialize(item.badge) : null,
        }).toObject();
    }

    public async update({ id }: TalentBadgeUpdate): Promise<TalentBadge> {
        const badge = await this.talentBadgeRepository.find({
            id,
        });

        if (!badge) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const item = await this.talentBadgeRepository.update({
            ...badge,
            isShown: !badge.isShown,
        });

        return TalentBadgeEntity.initialize({
            ...item,
            badge: item.badge ? BSABadgeEntity.initialize(item.badge) : null,
        }).toObject();
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
