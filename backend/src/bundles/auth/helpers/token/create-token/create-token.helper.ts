import * as jose from 'jose';

import { config } from '~/common/config/config.js';

import { secret } from '../encoded-secret.js';

const createToken = async ({ id }: jose.JWTPayload): Promise<string> => {
    return await new jose.SignJWT({ id })
        .setProtectedHeader({ alg: config.ENV.JWT.ALG })
        .setIssuedAt()
        .setExpirationTime(config.ENV.JWT.EXPIRES_IN)
        .sign(secret);
};

export { createToken };
