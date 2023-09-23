import { userRepository } from '~/bundles/users/users.js';
import { LMSDataApiPath } from '~/common/enums/enums.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

import { LMSDataEntity } from './lms-data.entity.js';
import { type LMSDataRepository } from './lms-data.repository.js';
import {
    type LMSDataServerResponseDto,
    type UserLMSDataDto,
} from './types/types.js';

class LMSDataService implements Service {
    private lmsDataRepository: LMSDataRepository;
    private requestsToLMSHeaders: { 'X-Token': string | undefined };

    public constructor(
        lmsDataRepository: LMSDataRepository,
        token: string | undefined,
    ) {
        this.lmsDataRepository = lmsDataRepository;
        this.requestsToLMSHeaders = { 'X-Token': token };
    }

    public async findByUserId(
        userId: string,
    ): Promise<UserLMSDataDto | undefined> {
        const dataFromDB = await this.lmsDataRepository.findByUserId({
            userId,
        });
        if (dataFromDB) {
            return dataFromDB.toObject();
        }

        const user = await userRepository.findById(userId);
        const userEmail = user?.toObject().email;

        if (userEmail) {
            const dataFromLMS = await this.findByUserEmailOnLMSServer(
                userEmail,
            );
            if (dataFromLMS) {
                const parsedLMSData = this.parseLMSServerData(
                    userId,
                    dataFromLMS,
                );

                const newDBRecord = await this.lmsDataRepository.create(
                    LMSDataEntity.initialize(parsedLMSData),
                );
                return newDBRecord.toObject();
            }

            return undefined;
        }

        return undefined;
    }

    private async findByUserEmailOnLMSServer(
        email: string,
    ): Promise<LMSDataServerResponseDto | undefined> {
        // TODO: specify type of return value

        const url = new URL(LMSDataApiPath.LMS_SERVER);
        url.searchParams.append('email', email);

        const response = await http.load(url, {
            headers: this.requestsToLMSHeaders,
        });

        //TODO: need change it to something proper
        const data = (await response.json()) as LMSDataServerResponseDto;

        // TODO: need to refactor this check on error, this was quick solution
        if (!Object.keys(data).includes('talent')) {
            return undefined;
        }

        return data;
    }

    // only for test, should be removed
    public async testLMSServer(
        email: string,
    ): Promise<UserLMSDataDto | unknown> {
        const url = new URL(LMSDataApiPath.LMS_SERVER);
        url.searchParams.append('email', email);

        const response = await http.load(url, {
            headers: this.requestsToLMSHeaders,
        });

        const json = (await response.json()) as LMSDataServerResponseDto;
        return this.parseLMSServerData(email, json);
    }

    private parseLMSServerData(
        userId: string,
        serverData: LMSDataServerResponseDto,
    ): UserLMSDataDto {
        return {
            userId,
            english: serverData.talent.english,
            averageProjectScore: serverData.averageProjectScore,
            averageLectureScore: serverData.averageLectureScore,
            lectureDetails: serverData.lectureDetails,
            projectCoachesFeedback: serverData.projectCoachesFeedback,
            hrFeedback: serverData.hrFeedback,
            project: serverData.project,
        };
    }

    public create(): ReturnType<Service['create']> {
        return Promise.resolve(null);
    }

    public find(): ReturnType<Service['find']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<Service['findAll']> {
        return Promise.resolve({ items: [] });
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { LMSDataService };
