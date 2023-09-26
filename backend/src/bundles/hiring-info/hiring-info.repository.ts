import { ErrorMessage } from 'shared/build/index.js';

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
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<HiringInfoEntity[]> {
        const hiringInfoAll = await this.hiringInfoModel
            .query()
            .select(
                'hiring_info.*',
                'talent.id as talent_id',
                'talent.phone as talent_phone',
                'talent.full_name as talent_full_name',
                'talentUser.email as talent_email',
                'company.id as company_id',
                'company.full_name as employer_full_name',
                'company.employer_position as employer_position',
                'company.company_name as company_name',
                'companyUser.email as company_email',
            )
            .leftJoinRelated('talent')
            .join('users as talentUser', 'talentUser.id', 'talent.user_id')
            .leftJoinRelated('company')
            .join('users as companyUser', 'companyUser.id', 'company.user_id')
            .returning('*');

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
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { HiringInfoRepository };
