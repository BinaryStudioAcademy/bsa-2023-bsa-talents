import { type FastifyReply, type FastifyRequest } from 'fastify';

type PreHandlerHook = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: (error?: Error) => void,
) => void;

export { type PreHandlerHook };
