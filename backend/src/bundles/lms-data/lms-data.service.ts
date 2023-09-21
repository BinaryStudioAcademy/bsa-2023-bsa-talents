import { userRepository } from '~/bundles/users/users.js';
import { LMSDataApiPath } from '~/common/enums/enums.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

// import { LMSDataEntity } from './lms-data.entity.js';
import { type LMSDataRepository } from './lms-data.repository.js';
import { type LMSDataGetByIdResponseDto } from './types/types.js';

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
    ): Promise<LMSDataGetByIdResponseDto | undefined> {
        const dataFromDB = await this.lmsDataRepository.findByUserId({
            userId,
        });
        if (dataFromDB) {
            return dataFromDB.toObject();
        }

        const user = await userRepository.findById(userId);
        const userEmail = user?.toObject().email;
        if (userEmail) {
            const dataFromLMS = await this.findByUserIdOnLMSServer(userEmail);
            // TODO: use this after created table user_lms_data
            // if(dataFromLMS) {
            //     const newDBRecord = await this.lmsDataRepository.create(LMSDataEntity.initialize({
            //         userId,
            //         data: dataFromLMS
            //     }));
            //     return newDBRecord.toObject();
            // }

            // TODO: should return only undefined if above will be uncomment
            return dataFromLMS ? { userId, data: dataFromLMS } : undefined;
        }

        return undefined;
    }

    private async findByUserIdOnLMSServer(
        email: string,
    ): Promise<string | undefined> {
        // TODO: specify type of return value

        const url = new URL(LMSDataApiPath.LMS_SERVER);
        url.searchParams.append('email', email);

        const response = await http.load(url, {
            headers: this.requestsToLMSHeaders,
        });

        const data = (await response.json()) as string;

        // TODO: need to refactor this check on error, this was quick solution
        if (!Object.keys(data).includes('talent')) {
            return undefined;
        }

        return data;
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
