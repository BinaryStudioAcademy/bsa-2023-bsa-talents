import { type Repository } from '~/common/types/types.js';

import { type UserDetailsUpdateDto } from './types/types.js';
import { UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsModel } from './user-details.model.js';

class UserDetailsRepository implements Repository {
    private userDetailsModel: typeof UserDetailsModel;

    public constructor(userDetailsModel: typeof UserDetailsModel) {
        this.userDetailsModel = userDetailsModel;
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<UserDetailsEntity | undefined> {
        const details = await this.userDetailsModel.query().findOne(payload);

        return details ? UserDetailsEntity.initialize(details) : undefined;
    }

    public async findAll(): ReturnType<Repository['findAll']> {
        return await Promise.resolve([]);
    }

    public async create(payload: { id: string }): Promise<UserDetailsEntity> {
        const newDetails = await this.userDetailsModel
            .query()
            .insert({
                userId: payload.id,
                fullName: '',
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
