import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { config } from '~/common/config/config.js';
import { encrypt, generateSalt } from '~/common/helpers/helpers.js';
import { type Service } from '~/common/interfaces/interfaces.js';

import {
    type UserGetAllResponseDto,
    type UserGetOneItemResponseDto,
    type UserSignUpRequestDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public async findByEmail(
        email: UserEntity['email'],
    ): Promise<UserGetOneItemResponseDto> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Incorrect email');
        }

        return user.toObject();
    }

    public async findById(id: number): Promise<UserGetOneItemResponseDto> {
        const user = await this.userRepository.findById(id);

        // if (!user) {
        //     throw new Error('User not found');
        // }

        return user.toObject();
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
