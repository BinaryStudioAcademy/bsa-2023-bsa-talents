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

    public async findById(id: string): Promise<BSABadgeEntity | null> {
        const badgeData = await this.bsaBadgesModel
            .query()
            .where('id', id)
            .first();

        if (!badgeData) {
            return null;
        }

        return BSABadgeEntity.initialize({
            id: badgeData.id,
            type: badgeData.type,
            name: badgeData.name,
            maxScore: badgeData.maxScore,
        });
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
