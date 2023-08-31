import { type Repository } from '~/common/types/types.js';

import { type UserDetailsModel } from './user-details.model.js';

class UserDetailsRepository implements Repository {
    private userDetailsModel: typeof UserDetailsModel;

    public constructor(userDetailsModel: typeof UserDetailsModel) {
        this.userDetailsModel = userDetailsModel;
    }

    public async find(payload: Record<string, unknown>): Promise<unknown> {
        return await Promise.resolve(payload);
    }

    public async findAll(): ReturnType<Repository['findAll']> {
        return await Promise.resolve([]);
    }

    public async create(payload: {
        id: string;
    }): ReturnType<Repository['create']> {
        await this.userDetailsModel
            .query()
            .insert({
                userId: payload.id,
                fullName: '',
            })
            .returning('*')
            .execute();

        return await Promise.resolve(payload);
    }

    public async update(): Promise<unknown> {
        return await Promise.resolve([]);
    }

    public async delete(): Promise<boolean> {
        return await Promise.resolve(true);
    }
}

export { UserDetailsRepository };
