import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { HiringInfoEntity } from './hiring-info.entity.js';
import { type HiringInfoModel } from './hiring-info.model.js';
import { type HiringInfoCreateRequestDto } from './types/types.js';

class HiringInfoRepository implements Repository {
    private hiringInfoModel: typeof HiringInfoModel;

    public constructor(hiringInfoModel: typeof HiringInfoModel) {
        this.hiringInfoModel = hiringInfoModel;
    }

    public find(): Promise<HiringInfoEntity | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<HiringInfoEntity[]> {
        const hiringInfoAll = await this.hiringInfoModel
            .query()
            .withGraphJoined('[talent, company]');
        return hiringInfoAll.map((hiringInfo) =>
            HiringInfoEntity.initialize(hiringInfo),
        );
    }

    public async create(
        payload: HiringInfoCreateRequestDto,
    ): Promise<HiringInfoEntity> {
        const details = await this.hiringInfoModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return HiringInfoEntity.initialize({
            id: details.id,
            talentId: details.talentId,
            companyId: details.companyId,
            hiredTime: details.hiredTime,
        });
    }

    public update(): Promise<HiringInfoEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { HiringInfoRepository };
