import { mapQueryValuesToArrays } from 'shared/build/index.js';

import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { type TalentBadge } from '../talent-badges/types/talent-badge.js';
import { type TalentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.service.js';
import {
    type TalentHardSkill,
    type UserDetailsCreateRequestDto,
    type UserDetailsDenyRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsSearchUsersRequestDto,
    type UserDetailsShortResponseDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsRepository } from './user-details.repository.js';

type UserDetailsWithTalentHardSkills = UserDetailsEntity & {
    talentHardSkills: TalentHardSkill[];
};

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
    ): Promise<UserDetailsWithTalentHardSkills | null> {
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessage.USER_DETAILS_NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        const talentHardSkills =
            await this.talentHardSkillsService.findByUserDetailsId(
                userDetailsId,
            );

        return {
            ...userDetails,
            talentHardSkills,
        } as UserDetailsWithTalentHardSkills;
    }

    public async findShortByRole(
        role: 'talent' | 'employer',
    ): Promise<UserDetailsShortResponseDto[]> {
        const results = (await this.userDetailsRepository.findUnconfirmedByRole(
            role,
        )) as unknown as UserDetailsShortResponseDto[];

        return results.map((it) => {
            return {
                userId: it.userId,
                fullName: it.fullName,
                photoUrl: it.photoUrl,
            };
        });
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public searchUsers(
        searchData: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsEntity[]> {
        const preparedData = mapQueryValuesToArrays(searchData, [
            'searchValue',
            'sortBy',
        ]);

        return this.userDetailsRepository.searchUsers(preparedData);
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const { talentBadges, talentHardSkills, ...userDetails } = payload;

        const newUserDetails = await this.userDetailsRepository.create(
            userDetails,
        );

        const userDetailsId = newUserDetails.toObject().id as string;

        let badgesResult: TalentBadge[] = [],
            hardSkillsResult: TalentHardSkill[] = [];

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
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        let badgesResult: TalentBadge[] = [],
            hardSkillsResult: TalentHardSkill[] = [];

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
            talentBadges: badgesResult,
            talentHardSkills: hardSkillsResult,
        };
    }

    public async approve(userId: string): Promise<boolean> {
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        await this.userDetailsRepository.update({
            isApproved: true,
            deniedReason: '',
            id: userDetailsId,
        });

        return true;
    }

    public async deny(
        userId: string,
        payload: UserDetailsDenyRequestDto,
    ): Promise<boolean> {
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        await this.userDetailsRepository.update({
            ...payload,
            isApproved: false,
            id: userDetailsId,
        });

        return true;
    }

    public async publish(payload: {
        userId: string;
    }): Promise<UserDetailsEntity> {
        const { userId } = payload;

        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        return this.userDetailsRepository.publish({ id: userDetailsId });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { UserDetailsService };
