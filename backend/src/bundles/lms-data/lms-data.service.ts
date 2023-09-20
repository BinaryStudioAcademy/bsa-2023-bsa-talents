// import { LMSDataApiPath } from '~/common/enums/enums.js';
import { http } from '~/common/packages/http/http.js';
import { type Service } from '~/common/types/types.js';

import { type LMSDataGetByIdResponseDto } from './types/types.js';

// remove

const apiTestPath =
    'https://api.nasa.gov/planetary/apod?api_key=kh4GZYsKSdeNeLTEJWjrm0129fpctvcrValmSbvk&date=2023-9-20';
// remove

class LMSDataService implements Service {
    public async findByUserId(
        userId: string,
    ): Promise<LMSDataGetByIdResponseDto | undefined> {
        const response = await http.load(apiTestPath, {});
        const data = await response.json();
        return { field1: userId, field2: data as string };
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
