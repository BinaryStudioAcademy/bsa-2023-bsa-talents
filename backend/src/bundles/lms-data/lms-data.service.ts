// import { LMSDataApiPath } from '~/common/enums/enums.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

import { type LMSDataGetByIdResponseDto } from './types/types.js';

// remove
const apiTestPath = 'https://api.github.com/users/github';
// remove

class LMSDataService implements Service {
    public async findByUserId(
        userId: string,
    ): Promise<LMSDataGetByIdResponseDto | undefined> {
        return await this.findByUserIdOnLMSServer(userId);
    }

    public async findByUserIdOnLMSServer(
        userId: string,
    ): Promise<LMSDataGetByIdResponseDto | undefined> {
        const response = await http.load(apiTestPath, {});
        const data = await response.json();
        return { userId, data: data as string };
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
