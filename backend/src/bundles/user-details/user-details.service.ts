import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsRepository } from './user-details.repository.js';

class UserDetailsService implements Service {
    private userDetailsRepository: UserDetailsRepository;
    private talentBadgeService: TalentBadgeService;

    public constructor(
        userDetailsRepository: UserDetailsRepository,
        talentBadgeService: TalentBadgeService,
    ) {
        this.userDetailsRepository = userDetailsRepository;
        this.talentBadgeService = talentBadgeService;
    }

    public async find(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        return this.userDetailsRepository.find({ ...payload });
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const { talentBadges, ...userDetails } = payload;

        const newUserDetails = await this.userDetailsRepository.create(
            userDetails,
        );

        talentBadges?.map(async (talentBadge) => {
            await this.talentBadgeService.create({
                badgeId: talentBadge,
                userId: userDetails.userId,
            });
        });

        return newUserDetails.toObject();
    }

    public async update(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsEntity> {
        const { userId, talentBadges, ...rest } = payload;

        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessages.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        talentBadges?.map(async (badgeId: string) => {
            await this.talentBadgeService.update({ badgeId, userId });
        });

        const userDetailsId = userDetails.toObject().id as string;

        return this.userDetailsRepository.update({
            id: userDetailsId,
            ...rest,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsService };
