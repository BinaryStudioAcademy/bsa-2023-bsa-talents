import { type BSABadgeEntity } from '~/bundles/bsa-badges/bsa-badges.entity.js';
import { type BSABadgesRepository } from '~/bundles/bsa-badges/bsa-badges.repository.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

class BSABadgesService implements Service {
    private bsaBadgesRepository: BSABadgesRepository;

    public constructor(bsaBadgesRepository: BSABadgesRepository) {
        this.bsaBadgesRepository = bsaBadgesRepository;
    }

    public async findAll(): Promise<{ items: BSABadgeEntity[] }> {
        const badges = await this.bsaBadgesRepository.findAll();
        return { items: badges };
    }

    public find(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public create(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public update(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { BSABadgesService };
