import {
    type JWTPayload,
    jwtVerify,
    type JWTVerifyResult,
    SignJWT,
} from 'jose';

import { config } from '../config/config.js';
import { type Token } from './interfaces/interfaces.js';

class TokenBase implements Token {
    private secret: Uint8Array;

    public constructor() {
        this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET);
    }

    public async create({ id }: JWTPayload): Promise<string> {
        return await new SignJWT({ id })
            .setProtectedHeader({ alg: config.ENV.JWT.ALG })
            .setIssuedAt()
            .setExpirationTime(config.ENV.JWT.EXPIRES_IN)
            .sign(this.secret);
    }

    public async decode(token: string): Promise<JWTVerifyResult> {
        return await jwtVerify(token, this.secret);
    }
}

export { TokenBase };
