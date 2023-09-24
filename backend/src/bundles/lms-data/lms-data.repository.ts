import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/repository.type.js';

import { LMSDataEntity } from './lms-data.entity.js';
import { type LMSDataModel } from './lms-data.model.js';
import { type UserGetLMSDataById } from './types/types.js';

class LMSDataRepository implements Repository {
    private lmsDataModel: typeof LMSDataModel;

    public constructor(lmsDataModel: typeof LMSDataModel) {
        this.lmsDataModel = lmsDataModel;
    }

    public find(): ReturnType<Repository['find']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findByUserId(
        payload: UserGetLMSDataById,
    ): Promise<LMSDataEntity | null> {
        const data = await this.lmsDataModel
            .query()
            .findOne({ userId: payload.userId });

        if (!data) {
            return null;
        }
        return LMSDataEntity.initialize(data);
    }

    public async findAll(): Promise<LMSDataEntity[]> {
        const users = await this.lmsDataModel.query().execute();

        return users.map((it) => LMSDataEntity.initialize(it));
    }

    public async create(payload: LMSDataEntity): Promise<LMSDataEntity> {
        const item = await this.lmsDataModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return LMSDataEntity.initialize(item);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { LMSDataRepository };
