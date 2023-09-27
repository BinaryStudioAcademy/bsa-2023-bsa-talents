import { Headers } from 'node-fetch';

import { userRepository } from '~/bundles/users/users.js';
import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { config } from '~/common/packages/config/config.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

import { type BSABadgesService } from '../bsa-badges/bsa-badges.service.js';
import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { type UserDetailsService } from '../user-details/user-details.service.js';
import { mapTalentBadges, parseLMSServerData } from './helpers/helpers.js';
import { LMSDataEntity } from './lms-data.entity.js';
import { type LMSDataRepository } from './lms-data.repository.js';
import {
    type LMSDataServerResponseDto,
    type UserLMSDataDto,
} from './types/types.js';

class LMSDataService implements Service {
    private lmsDataRepository: LMSDataRepository;
    private requestsToLMSHeaders: { 'X-Token': string };
    private bsaBadgesService: BSABadgesService;
    private talentBadgeService: TalentBadgeService;
    private userDetailsService: UserDetailsService;

    public constructor({
        lmsDataRepository,
        bsaBadgesService,
        talentBadgeService,
        userDetailsService,
    }: {
        lmsDataRepository: LMSDataRepository;
        bsaBadgesService: BSABadgesService;
        talentBadgeService: TalentBadgeService;
        userDetailsService: UserDetailsService;
    }) {
        this.lmsDataRepository = lmsDataRepository;
        this.bsaBadgesService = bsaBadgesService;
        this.talentBadgeService = talentBadgeService;
        this.userDetailsService = userDetailsService;
        this.requestsToLMSHeaders = {
            'X-Token': config.ENV.LMS_DATA_SERVER.LMS_X_TOKEN,
        };
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
            const dataFromLMS = await this.getUserDataFromLMSServerbyEmail(
                userEmail,
            );
            if (dataFromLMS) {
                await this.addUserLMSDataToDB(user.toObject().id, dataFromLMS);
            }

            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessage.NOT_FOUND_ON_LMS,
            });
        }

        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: ErrorMessage.USER_NOT_FOUND,
        });
    }

    public async addUserLMSDataToDB(
        userId: string,
        dataFromLMS: LMSDataServerResponseDto | null,
    ): Promise<UserLMSDataDto | null> {
        if (!dataFromLMS) {
            return null;
        }

        const parsedLMSData = parseLMSServerData(userId, dataFromLMS);

        const userDetails = await this.userDetailsService.create({
            userId,
        });

        const userDetailsId = userDetails.id;

        const bsaBadges = await this.bsaBadgesService.findAll();

        const talentBadges = mapTalentBadges(
            userDetailsId as string,
            parsedLMSData,
            bsaBadges,
        );

        await Promise.all(
            talentBadges.map((talentBadge) =>
                this.talentBadgeService.create(talentBadge),
            ),
        );

        const newDBRecord = await this.lmsDataRepository.create(
            LMSDataEntity.initialize({
                ...parsedLMSData,
                userId,
                lectureDetails: JSON.stringify(parsedLMSData.lectureDetails),
                projectCoachesFeedback: JSON.stringify(
                    parsedLMSData.projectCoachesFeedback,
                ),
                hrFeedback: JSON.stringify(parsedLMSData.hrFeedback),
                project: JSON.stringify(parsedLMSData.project),
            }),
        );
        return newDBRecord.toObject();
    }

    public async getUserDataFromLMSServerbyEmail(
        email: string,
    ): Promise<LMSDataServerResponseDto | null> {
        const url = new URL(config.ENV.LMS_DATA_SERVER.LMS_SERVER);
        url.searchParams.append('email', email);

        const response = await http.load(url, {
            headers: new Headers(this.requestsToLMSHeaders),
        });

        const data = (await response.json()) as LMSDataServerResponseDto;

        if (!Object.keys(data).includes('talent')) {
            return null;
        }

        return data;
    }

    public create(): ReturnType<Service['create']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public find(): ReturnType<Service['find']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public findAll(): ReturnType<Service['findAll']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public update(): ReturnType<Service['update']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): ReturnType<Service['delete']> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { LMSDataService };
