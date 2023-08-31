import { type Service } from '~/common/types/service.type.js';

import { type UserDetailsRepository } from './user-details.repository.js';

class UserDetailsService implements Service {
    private userDetailsRepository: UserDetailsRepository;

    public constructor(userDetailsRepository: UserDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public find(payload: Record<string, unknown>): Promise<unknown> {
        return Promise.resolve(payload);
    }

    public findAll(): Promise<{ items: unknown[] }> {
        return Promise.resolve({ items: [] });
    }

    public create(payload: unknown): Promise<unknown> {
        return Promise.resolve(payload);
    }

    public update(): Promise<unknown> {
        return Promise.resolve(null);
    }

    public delete(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export { UserDetailsService };
