import { Headers } from 'node-fetch';

import { userRepository } from '~/bundles/users/users.js';
import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

import { parseLMSServerData } from './helpers/helpers.js';
import { LMSDataEntity } from './lms-data.entity.js';
import { type LMSDataRepository } from './lms-data.repository.js';
import {
    type LMSDataServerResponseDto,
    type UserLMSDataDto,
} from './types/types.js';

class LMSDataService implements Service {
    private lmsDataRepository: LMSDataRepository;
    private requestsToLMSHeaders: { 'X-Token': string };

    public constructor(
        lmsDataRepository: LMSDataRepository,
        token: string | undefined,
    ) {
        this.lmsDataRepository = lmsDataRepository;
        this.requestsToLMSHeaders = { 'X-Token': token ?? '' };
    }

    public async findByUserId(userId: string): Promise<UserLMSDataDto> {
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
                const parsedLMSData = parseLMSServerData(userId, dataFromLMS);

                const newDBRecord = await this.lmsDataRepository.create(
                    LMSDataEntity.initialize({
                        ...parsedLMSData,
                        userId: user.toObject().id,
                        lectureDetails: JSON.stringify(
                            parsedLMSData.lectureDetails,
                        ),
                        projectCoachesFeedback: JSON.stringify(
                            parsedLMSData.projectCoachesFeedback,
                        ),
                        hrFeedback: JSON.stringify(parsedLMSData.hrFeedback),
                        project: JSON.stringify(parsedLMSData.project),
                    }),
                );
                return newDBRecord.toObject();
            }

            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessages.NOT_FOUND_ON_LMS,
            });
        }

        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: ErrorMessages.USER_NOT_FOUND,
        });
    }

    private async findByUserEmailOnLMSServer(
        email: string,
    ): Promise<LMSDataServerResponseDto | undefined> {
        const url = new URL(process.env.LMS_SERVER ?? '');
        url.searchParams.append('email', email);

        const response = await http.load(url, {
            headers: new Headers(this.requestsToLMSHeaders),
        });

        const data = (await response.json()) as LMSDataServerResponseDto;

        if (!Object.keys(data).includes('talent')) {
            return undefined;
        }

        return data;
    }

    public create(): ReturnType<Service['create']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public find(): ReturnType<Service['find']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public findAll(): ReturnType<Service['findAll']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public update(): ReturnType<Service['update']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): ReturnType<Service['delete']> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { LMSDataService };
