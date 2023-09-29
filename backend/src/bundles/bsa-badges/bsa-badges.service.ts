import { type BSABadgeEntity } from '~/bundles/bsa-badges/bsa-badges.entity.js';
import { type BSABadgesRepository } from '~/bundles/bsa-badges/bsa-badges.repository.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type BadgesResponseDto } from './types/types.js';

class BSABadgesService implements Service {
    private bsaBadgesRepository: BSABadgesRepository;

    public constructor(bsaBadgesRepository: BSABadgesRepository) {
        this.bsaBadgesRepository = bsaBadgesRepository;
    }

    public async findAll(): Promise<BadgesResponseDto> {
        const badges = await this.bsaBadgesRepository.findAll();
        return { items: badges.map((badge) => badge.toObject()) };
    }

    public find(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public create(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public update(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { BSABadgesService };
