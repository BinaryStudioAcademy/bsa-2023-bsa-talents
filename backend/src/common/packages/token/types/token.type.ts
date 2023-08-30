import { type JWTPayload, type JWTVerifyResult } from 'jose';

type Token = {
    create({ id }: JWTPayload): Promise<string>;
    decode(token: string): Promise<JWTVerifyResult>;
};

export { type Token };
