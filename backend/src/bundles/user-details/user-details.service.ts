import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import {
    type UserDetailsApproveRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsRepository } from './user-details.repository.js';

class UserDetailsService implements Service {
    private userDetailsRepository: UserDetailsRepository;

    public constructor(userDetailsRepository: UserDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<UserDetailsEntity | undefined> {
        return this.userDetailsRepository.find({ ...payload });
    }

    public async findUserDetails(payload: {
        userId: string;
    }): Promise<UserDetailsEntity | undefined> {
        return await this.find(payload);
    }

    public findAll(): Promise<{ items: unknown[] }> {
        return Promise.resolve({ items: [] });
    }

    public async create(payload: {
        id: string;
    }): Promise<UserDetailsResponseDto> {
        const newUserDetails = await this.userDetailsRepository.create(payload);
        return newUserDetails.toObject();
    }

    public async update(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsEntity> {
        const { userId, ...rest } = payload;
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessages.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        return this.userDetailsRepository.update({
            id: userDetailsId,
            ...rest,
        });
    }

    public async approve(
        payload: UserDetailsApproveRequestDto,
    ): Promise<UserDetailsEntity | undefined> {
        return this.userDetailsRepository.update(payload);
    }

    public delete(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export { UserDetailsService };
