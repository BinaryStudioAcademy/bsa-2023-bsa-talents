import { type Repository } from '~/common/types/types.js';

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
                isApproved: false,
                fullName: '',
            })
            .returning('*')
            .execute();

        return UserDetailsEntity.initialize(newDetails);
    }

    public async update(
        payload: Record<string, unknown>,
    ): Promise<UserDetailsEntity | undefined> {
        const { userId, ...rest } = payload;

        const instance = await this.userDetailsModel
            .query()
            .findOne({ userId });

        const details = await instance?.$query().patchAndFetch(rest).execute();

        return details ? UserDetailsEntity.initialize(details) : undefined;
    }

    public async delete(): Promise<boolean> {
        return await Promise.resolve(true);
    }
}

export { UserDetailsRepository };
