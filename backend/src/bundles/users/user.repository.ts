import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type Repository } from '~/common/types/repository.type.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<UserEntity | undefined> {
        const user = await this.userModel.query().findOne(payload);

        return user ? UserEntity.initialize(user) : undefined;
    }

    public async findByToken(tokenString: string): Promise<UserEntity | null> {
        const user = await this.userModel.query().findOne({ id: tokenString });

        return user ? UserEntity.initialize(user) : null;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, role, passwordHash } = entity.toNewObject();

        const item = await this.userModel
            .query()
            .insert({
                role,
                email,
                passwordHash,
            })
            .returning('*')
            .execute();

        return UserEntity.initialize(item);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
