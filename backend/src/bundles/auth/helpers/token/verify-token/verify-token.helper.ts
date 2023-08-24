import * as jose from 'jose';

import { secret } from '../encoded-secret.js';

const verifyToken = async (token: string): Promise<jose.JWTVerifyResult> => {
    return await jose.jwtVerify(token, secret);
};

export { verifyToken };
