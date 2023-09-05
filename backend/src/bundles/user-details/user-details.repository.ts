import { type Repository } from '~/common/types/types.js';

import {
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsUpdateDto,
} from './types/types.js';
import { UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsModel } from './user-details.model.js';

class UserDetailsRepository implements Repository {
    private userDetailsModel: typeof UserDetailsModel;

    public constructor(userDetailsModel: typeof UserDetailsModel) {
        this.userDetailsModel = userDetailsModel;
    }

    public async find(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        const details = await this.userDetailsModel
            .query()
            .findOne({ ...payload });

        return details ? UserDetailsEntity.initialize(details) : null;
    }

    public async findAll(): ReturnType<Repository['findAll']> {
        return await Promise.resolve([]);
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsEntity> {
        const newDetails = await this.userDetailsModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return UserDetailsEntity.initialize(newDetails);
    }

    public async update(
        payload: UserDetailsUpdateDto,
    ): Promise<UserDetailsEntity> {
        const { id, ...rest } = payload;

        const details = await this.userDetailsModel
            .query()
            .patchAndFetchById(id, rest);

        return UserDetailsEntity.initialize(details);
    }

    public async delete(): Promise<boolean> {
        return await Promise.resolve(true);
    }
}

export { UserDetailsRepository };
