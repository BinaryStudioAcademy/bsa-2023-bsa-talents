import { type UserFindResponseDto } from './bundles/users/types/types.js';

declare module 'fastify' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface FastifyRequest {
        user: UserFindResponseDto;
    }
}
