import { ErrorMessage } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/service.type.js';

import { type HiringInfoRepository } from './hiring-info.repository.js';
import {
    type HiringInfoCreateRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoResponseDto,
} from './types/types.js';

class HiringInfoService implements Service {
    private hiringInfoRepository: HiringInfoRepository;

    public constructor(hiringInfoRepository: HiringInfoRepository) {
        this.hiringInfoRepository = hiringInfoRepository;
    }

    public async find(payload: HiringInfoFindRequestDto): Promise<boolean> {
        const hiringInfo = await this.hiringInfoRepository.find({ ...payload });

        return !!hiringInfo;
    }

    public async findAll(): Promise<{ items: HiringInfoResponseDto[] }> {
        const items = await this.hiringInfoRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: HiringInfoCreateRequestDto,
    ): Promise<HiringInfoResponseDto> {
        const newHiringInfo = await this.hiringInfoRepository.create(payload);

        return {
            ...newHiringInfo.toObject(),
        };
    }

    public update(): Promise<HiringInfoResponseDto> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { HiringInfoService };
