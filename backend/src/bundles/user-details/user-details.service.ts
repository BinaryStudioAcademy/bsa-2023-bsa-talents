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

        if (talentBadges) {
            await Promise.all(
                talentBadges.map((talentBadge) =>
                    this.talentBadgeService.create({
                        badgeId: talentBadge,
                        userId: userDetails.userId,
                    }),
                ),
            );
        }

        if (talentHardSkills) {
            await Promise.all(
                talentHardSkills.map((hardSkillId) =>
                    this.talentHardSkillsService.create({ hardSkillId }),
                ),
            );
        }

        return newUserDetails.toObject();
    }

    public async update(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsEntity> {
        const { userId, talentBadges, talentHardSkills, ...rest } = payload;

        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessages.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        if (talentBadges) {
            await Promise.all(
                talentBadges.map((badgeId: string) =>
                    this.talentBadgeService.update({
                        badgeId,
                        userId,
                        userDetailsId,
                    }),
                ),
            );
        }

        if (talentHardSkills) {
            await this.talentHardSkillsService.update({
                talentHardSkills,
                userDetailsId,
            });
        }

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
