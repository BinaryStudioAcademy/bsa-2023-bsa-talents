import { mapQueryValuesToArrays } from 'shared/build/index.js';

import { type BSABadgesService } from '~/bundles/bsa-badges/bsa-badges.service.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type BSABadgeEntity } from '../bsa-badges/bsa-badges.entity.js';
import { type HardSkillsEntity } from '../hard-skills/hard-skills.entity.js';
import { type HardSkillsService } from '../hard-skills/hard-skills.service.js';
import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { type TalentBadge } from '../talent-badges/types/talent-badge.js';
import { type TalentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.service.js';
import { type UserDetailsOptions } from '../talent-hard-skills/types/user-details-options.js';
import {
    type TalentHardSkill,
    type UserDetailsCreateRequestDto,
    type UserDetailsDenyRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsProperties,
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
    private hardSkillsService: HardSkillsService;
    private bsaBadgesService: BSABadgesService;

    public constructor(options: UserDetailsOptions) {
        this.userDetailsRepository = options.userDetailsRepository;
        this.talentBadgeService = options.talentBadgeService;
        this.talentHardSkillsService = options.talentHardSkillsService;
        this.hardSkillsService = options.hardSkillsService;
        this.bsaBadgesService = options.bsaBadgesService;
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

    public async findCompanyInfoByUserId(
        userId: string,
    ): Promise<UserDetailsEntity | null> {
        const userDetails =
            await this.userDetailsRepository.findCompanyInfoByUserId({
                userId,
            });

        if (!userDetails) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessage.USER_DETAILS_NOT_FOUND,
            });
        }
        return userDetails;
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

    public async searchUsers(
        searchData: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsProperties[]> {
        const preparedData = mapQueryValuesToArrays(searchData, [
            'searchValue',
            'sortBy',
            'searchType',
            'searchStringType',
        ]);

        const filteredUsers = await this.userDetailsRepository.searchUsers(
            preparedData,
        );

        const userPromises = filteredUsers.map(async (user) => {
            const userDetails = user.toObject();
            const userDetailsId = userDetails.id as string;
            const hardSkillsData =
                await this.talentHardSkillsService.findByUserDetailsId(
                    userDetailsId,
                );

            const userHardSkills: HardSkillsEntity[] = [];

            for (const skill of hardSkillsData) {
                if (skill.hardSkillId) {
                    const hardSkill = await this.hardSkillsService.findById(
                        skill.hardSkillId,
                    );
                    if (hardSkill) {
                        userHardSkills.push(hardSkill);
                    }
                }
            }

            userDetails.hardSkills = userHardSkills;

            const badgesData =
                await this.talentBadgeService.findByUserDetailsId(
                    userDetailsId,
                );

            const userBadges: BSABadgeEntity[] = [];

            for (const badge of badgesData) {
                if (badge.badgeId) {
                    const badges = await this.bsaBadgesService.findById(
                        badge.badgeId,
                    );
                    if (badges) {
                        userBadges.push(badges);
                    }
                }
            }

            userDetails.badges = userBadges;

            return userDetails;
        });

        return await Promise.all(userPromises);
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

    public async publish(payload: { userId: string }): Promise<string> {
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
