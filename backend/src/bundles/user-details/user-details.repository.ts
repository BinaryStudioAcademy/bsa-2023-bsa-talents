import { ErrorMessages } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import {
    type UserDetailsCreateDto,
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

    public findAll(): ReturnType<Repository['findAll']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        payload: UserDetailsCreateDto,
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

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsRepository };
