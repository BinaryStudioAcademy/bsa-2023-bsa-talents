import { HttpCode, HttpError } from 'shared/build/index.js';

import { ErrorMessage } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { BSABadgeEntity } from '../bsa-badges/bsa-badges.entity.js';
import { TalentBadgeEntity } from './talent-badge.entity.js';
import { type TalentBadgeRepository } from './talent-badge.repository.js';
import {
    type TalentBadge,
    type TalentBadgeCreate,
    type TalentBadgePatchAndFetch,
    type TalentBadgeResponseDto,
} from './types/types.js';

class TalentBadgeService implements Service {
    private talentBadgeRepository: TalentBadgeRepository;

    public constructor(talentBadgeRepository: TalentBadgeRepository) {
        this.talentBadgeRepository = talentBadgeRepository;
    }

    public findAll(): Promise<{ items: TalentBadgeRepository[] }> {
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

    public find(): Promise<TalentBadgeRepository> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(badge: TalentBadgeCreate): Promise<TalentBadge> {
        const item = await this.talentBadgeRepository.create(badge);

        return TalentBadgeEntity.initialize({
            ...item,
            badge: item.badge ? BSABadgeEntity.initialize(item.badge) : null,
        }).toObject();
    }

    public async update({
        id,
    }: TalentBadgePatchAndFetch): Promise<TalentBadge> {
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

    public async enableBadges(
        ids: string[],
        userId: string,
    ): Promise<TalentBadge[]> {
        const talentBadges = await this.talentBadgeRepository.findAllByUserId(
            userId,
        );

        const updatedBadges = talentBadges.map((badge) => {
            return this.talentBadgeRepository.update({
                ...badge,
                isShown: ids.includes(badge.id),
            });
        });

        return await Promise.all(updatedBadges);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { TalentBadgeService };
