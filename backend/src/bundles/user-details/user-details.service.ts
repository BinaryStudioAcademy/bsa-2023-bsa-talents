import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { type TalentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.service.js';
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
    private talentHardSkillsService: TalentHardSkillsService;

    public constructor(
        userDetailsRepository: UserDetailsRepository,
        talentBadgeService: TalentBadgeService,
        talentHardSkillsService: TalentHardSkillsService,
    ) {
        this.userDetailsRepository = userDetailsRepository;
        this.talentBadgeService = talentBadgeService;
        this.talentHardSkillsService = talentHardSkillsService;
    }

    public async find(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        return this.userDetailsRepository.find({ ...payload });
    }

    public async findByUserId(
        userId: string,
    ): Promise<UserDetailsEntity | null> {
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessages.USER_DETAILS_NOT_FOUND,
            });
        }
        return userDetails;
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const { talentBadges, talentHardSkills, ...userDetails } = payload;

        const newUserDetails = await this.userDetailsRepository.create(
            userDetails,
        );

        const userDetailsId = newUserDetails.toObject().id as string;

        let badgesResult, hardSkillsResult;

        if (talentBadges) {
            badgesResult = await Promise.all(
                talentBadges.map((talentBadge) =>
                    this.talentBadgeService.create({
                        badgeId: talentBadge,
                        userId: userDetails.userId,
                        userDetailsId,
                    }),
                ),
            );
        }

        if (talentHardSkills) {
            hardSkillsResult = await Promise.all(
                talentHardSkills.map((hardSkillId) =>
                    this.talentHardSkillsService.create({
                        hardSkillId,
                        userDetailsId,
                    }),
                ),
            );
        }

        return {
            ...newUserDetails.toObject(),
            talentBadges: badgesResult,
            talentHardSkills: hardSkillsResult,
        };
    }

    public async update(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const { userId, talentBadges, talentHardSkills, ...rest } = payload;

        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessages.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        let badgesResult, hardSkillsResult;

        if (talentBadges) {
            badgesResult = await Promise.all(
                talentBadges.map((badgeId) =>
                    this.talentBadgeService.update({
                        badgeId,
                        userId: userId as string,
                        userDetailsId,
                    }),
                ),
            );
        }

        if (talentHardSkills) {
            hardSkillsResult = await this.talentHardSkillsService.update({
                talentHardSkills,
                userDetailsId,
            });
        }

        const updatedUserDetails = await this.userDetailsRepository.update({
            ...rest,
            id: userDetailsId,
        });

        return {
            ...updatedUserDetails.toObject(),
            talentHardSkills: hardSkillsResult,
            talentBadges: badgesResult,
        };
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsService };
