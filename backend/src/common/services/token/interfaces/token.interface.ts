import { type JWTPayload, type JWTVerifyResult } from 'jose';

type TokenService = {
    create({ id }: JWTPayload): Promise<string>;
    decode(token: string): Promise<JWTVerifyResult>;
};

export { type TokenService };
