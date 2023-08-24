import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type Service } from '~/common/interfaces/interfaces.js';

import {
    type UserCreationResponseDto,
    type UserFindResponseDto,
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
} from './types/types.js';

class UserService implements Service {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findById(id: number): Promise<UserFindResponseDto> {
        const user = await this.userRepository.findById(id);
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
    ): Promise<UserCreationResponseDto> {
        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                passwordSalt: 'SALT', // TODO
                passwordHash: 'HASH', // TODO
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
