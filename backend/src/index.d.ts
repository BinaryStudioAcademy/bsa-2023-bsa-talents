import { type UserFindResponseDto } from './bundles/users/types/types.js';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserFindResponseDto;
    }
}
