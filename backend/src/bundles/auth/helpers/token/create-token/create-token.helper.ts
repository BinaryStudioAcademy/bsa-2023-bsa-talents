import * as jose from 'jose';

import { config } from '~/common/config/config.js';

const createToken = async ({ id }: jose.JWTPayload): Promise<string> => {
    const secret = new TextEncoder().encode(config.ENV.JWT.SECRET);
    const alg = 'HS256';

    return await new jose.SignJWT({ id })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(config.ENV.JWT.EXPIRES_IN)
        .sign(secret);
};

export { createToken };
