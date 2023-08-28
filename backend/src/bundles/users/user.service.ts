import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type EncryptBase } from '~/common/encrypt/encrypt-base.package.js';
import { type Service } from '~/common/types/types.js';

import {
    type UserFindResponseDto,
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;
    private encrypt: EncryptBase;

    public constructor(userRepository: UserRepository, encrypt: EncryptBase) {
        this.userRepository = userRepository;
        this.encrypt = encrypt;
    }

    public find(
        payload: Record<string, unknown>,
    ): Promise<UserEntity | undefined> {
        return this.userRepository.find({ ...payload });
    }

    public async findById(
        id: number,
    ): Promise<UserFindResponseDto | undefined> {
        const user = await this.userRepository.find({ id });
        return user ? user.toObject() : undefined;
    }

    public async findByEmail(
        email: string,
    ): Promise<UserFindResponseDto | undefined> {
        const user = await this.userRepository.find({ email });
        return user ? user.toObject() : undefined;
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: UserSignUpRequestDto,
    ): Promise<{ id: number; email: string }> {
        const passwordHash = await this.encrypt.make(payload.password);

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordHash: passwordHash,
            }),
        );

        return user.toObject();
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
