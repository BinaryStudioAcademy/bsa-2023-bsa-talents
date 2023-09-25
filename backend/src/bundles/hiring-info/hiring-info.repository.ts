import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { HiringInfoEntity } from './hiring-info.entity.js';
import { type HiringInfoModel } from './hiring-info.model.js';
import {
    type HiringInfoCreateDto,
    type HiringInfoFindRequestDto,
    type HiringInfoUpdateDto,
} from './types/types.js';

class HiringInfoRepository implements Repository {
    private hiringInfoModel: typeof HiringInfoModel;

    public constructor(hiringInfoModel: typeof HiringInfoModel) {
        this.hiringInfoModel = hiringInfoModel;
    }

    public async find(
        payload: HiringInfoFindRequestDto,
    ): Promise<HiringInfoEntity | null> {
        const details = await this.hiringInfoModel
            .query()
            .findOne({ ...payload });

        if (!details) {
            return null;
        }

        return HiringInfoEntity.initialize({
            id: details.id,
            talentId: details.talentId,
            companyId: details.companyId,
            firstContactTime: details.firstContactTime,
            hasSharedInfo: details.hasSharedInfo,
            sharedInfoTime: details.sharedInfoTime,
            isHired: details.isHired,
            hiredTime: details.hiredTime,
            hiredPosition: details.hiredPosition,
            hiredSalary: details.hiredSalary,
            isApproved: details.isApproved,
            status: details.status,
            fee: details.fee,
        });
    }

    public async findAll(): Promise<HiringInfoEntity[]> {
        const hiringInfoAll = await this.hiringInfoModel.query().execute();

        return hiringInfoAll.map((hiringInfo) =>
            HiringInfoEntity.initialize(hiringInfo),
        );
    }

    public async create(
        payload: HiringInfoCreateDto,
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
            firstContactTime: details.firstContactTime,
            hasSharedInfo: details.hasSharedInfo,
            sharedInfoTime: details.sharedInfoTime,
            isHired: details.isHired,
            hiredTime: details.hiredTime,
            hiredPosition: details.hiredPosition,
            hiredSalary: details.hiredSalary,
            isApproved: details.isApproved,
            status: details.status,
            fee: details.fee,
        });
    }

    public async update(
        payload: HiringInfoUpdateDto,
    ): Promise<HiringInfoEntity> {
        const { id, ...rest } = payload;

        const details = await this.hiringInfoModel
            .query()
            .patchAndFetchById(id as string, rest);

        return HiringInfoEntity.initialize({
            id: details.id,
            talentId: details.talentId,
            companyId: details.companyId,
            firstContactTime: details.firstContactTime,
            hasSharedInfo: details.hasSharedInfo,
            sharedInfoTime: details.sharedInfoTime,
            isHired: details.isHired,
            hiredTime: details.hiredTime,
            hiredPosition: details.hiredPosition,
            hiredSalary: details.hiredSalary,
            isApproved: details.isApproved,
            status: details.status,
            fee: details.fee,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { HiringInfoRepository };
