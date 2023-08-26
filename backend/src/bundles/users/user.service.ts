import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { config } from '~/common/config/config.js';
import { encrypt, generateSalt } from '~/common/helpers/helpers.js';
import { type Service } from '~/common/interfaces/interfaces.js';

import {
    type UserFindResponseDto,
    type UserGetAllResponseDto,
    type UserGetOneItemResponseDto,
    type UserSignUpRequestDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
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
        // TODO: change UserGetOneItemResponseDto to type for user.toObject()
    ): Promise<UserGetOneItemResponseDto> {
        const { PASSWORD_SALT_ROUNDS } = config.ENV.CRYPT;

        const passwordSalt = await generateSalt(PASSWORD_SALT_ROUNDS);
        const passwordHash = await encrypt(
            payload.password,
            PASSWORD_SALT_ROUNDS,
        );
        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordSalt: passwordSalt,
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
