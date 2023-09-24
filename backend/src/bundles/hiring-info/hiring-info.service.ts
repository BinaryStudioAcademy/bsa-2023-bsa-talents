import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { type TalentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.service.js';
import { type HiringInfoEntity } from './hiring-info.entity.js';
import { type HiringInfoRepository } from './hiring-info.repository.js';
import {
    type HiringInfoCreateDto,
    type HiringInfoFindRequestDto,
    type HiringInfoResponseDto,
} from './types/types.js';

class HiringInfoService implements Service {
    private userDetailsRepository: HiringInfoRepository;
    private talentBadgeService: TalentBadgeService;
    private talentHardSkillsService: TalentHardSkillsService;

    public constructor(
        userDetailsRepository: HiringInfoRepository,
        talentBadgeService: TalentBadgeService,
        talentHardSkillsService: TalentHardSkillsService,
    ) {
        this.userDetailsRepository = userDetailsRepository;
        this.talentBadgeService = talentBadgeService;
        this.talentHardSkillsService = talentHardSkillsService;
    }

    public async find(
        payload: HiringInfoFindRequestDto,
    ): Promise<HiringInfoEntity | null> {
        return this.userDetailsRepository.find({ ...payload });
    }

    public async findByTalentIdCompanyId(
        talentId: string,
        companyId: string,
    ): Promise<HiringInfoEntity | null> {
        const userDetails = await this.userDetailsRepository.find({
            talentId,
            companyId,
        });

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
        payload: HiringInfoCreateDto,
    ): Promise<HiringInfoResponseDto> {
        const newHiringInfo = await this.userDetailsRepository.create(payload);

        return {
            ...newHiringInfo.toObject(),
        };
    }

    public update(): Promise<HiringInfoResponseDto> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
        // const { talentId, companyId, ...rest } = payload;

        // const hiringInfo = await this.userDetailsRepository.find({
        //     talentId,
        //     companyId,
        // });

        // if (!hiringInfo) {
        //     throw new HttpError({
        //         message: ErrorMessages.NOT_FOUND,
        //         status: HttpCode.NOT_FOUND,
        //     });
        // }

        // const hiringInfoId = hiringInfo.toObject().id as string;

        // const updatedHiringInfo = await this.userDetailsRepository.update({
        //     ...rest,
        //     id: hiringInfoId,
        // });

        // return {
        //     ...updatedHiringInfo.toObject(),
        // };
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { HiringInfoService };
