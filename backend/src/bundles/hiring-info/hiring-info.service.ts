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
    private hiringInfoRepository: HiringInfoRepository;
    private talentBadgeService: TalentBadgeService;
    private talentHardSkillsService: TalentHardSkillsService;

    public constructor(
        hiringInfoRepository: HiringInfoRepository,
        talentBadgeService: TalentBadgeService,
        talentHardSkillsService: TalentHardSkillsService,
    ) {
        this.hiringInfoRepository = hiringInfoRepository;
        this.talentBadgeService = talentBadgeService;
        this.talentHardSkillsService = talentHardSkillsService;
    }

    public async find(
        payload: HiringInfoFindRequestDto,
    ): Promise<HiringInfoEntity | null> {
        return this.hiringInfoRepository.find({ ...payload });
    }

    public async findByTalentIdCompanyId(
        talentId: string,
        companyId: string,
    ): Promise<HiringInfoEntity | null> {
        const userDetails = await this.hiringInfoRepository.find({
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

    public async findAll(): Promise<{ items: HiringInfoResponseDto[] }> {
        const items = await this.hiringInfoRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: HiringInfoCreateDto,
    ): Promise<HiringInfoResponseDto> {
        const newHiringInfo = await this.hiringInfoRepository.create(payload);

        return {
            ...newHiringInfo.toObject(),
        };
    }

    public update(): Promise<HiringInfoResponseDto> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { HiringInfoService };
