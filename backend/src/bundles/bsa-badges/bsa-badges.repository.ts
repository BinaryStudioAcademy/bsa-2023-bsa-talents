import { BSABadgeEntity } from '~/bundles/bsa-badges/bsa-badges.entity.js';
import { type BSABadgesModel } from '~/bundles/bsa-badges/bsa-badges.model.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

class BSABadgesRepository implements Repository {
    private bsaBadgesModel: typeof BSABadgesModel;

    public constructor(bsaBadgesModel: typeof BSABadgesModel) {
        this.bsaBadgesModel = bsaBadgesModel;
    }

    public async findAll(): Promise<BSABadgeEntity[]> {
        const badges = await this.bsaBadgesModel.query().execute();
        return badges.map((it) => BSABadgeEntity.initialize(it));
    }

    public create(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public find(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public update(): Promise<BSABadgeEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { BSABadgesRepository };
