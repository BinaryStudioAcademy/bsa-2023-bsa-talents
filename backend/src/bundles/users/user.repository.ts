import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type Repository } from '~/common/interfaces/interfaces.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public find(): ReturnType<Repository['find']> {
        return Promise.resolve(null);
    }

    public async findByEmail(
        email: UserEntity['email'],
    ): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .select()
            .where({ email })
            .first();
        if (!user) {
            return null;
        }
        return UserEntity.initialize(user);
    }

    public async findById(id: UserEntity['id']): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .select()
            .where({ id })
            .first();
        if (!user) {
            return null;
        }
        return UserEntity.initialize(user);
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, passwordSalt, passwordHash } = entity.toNewObject();

        const item = await this.userModel
            .query()
            .insert({
                email,
                passwordSalt,
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
