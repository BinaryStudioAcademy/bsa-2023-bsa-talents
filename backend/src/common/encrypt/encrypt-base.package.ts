import { compare, hash } from 'bcrypt';

import { type Config } from '~/common/config/config.js';

class EncryptBase {
    private appConfig: Config;

    public constructor(config: Config) {
        this.appConfig = config;
    }

    public async make(data: string): Promise<string> {
        const { PASSWORD_SALT_ROUNDS } = this.appConfig.ENV.CRYPT;
        return await hash(data, PASSWORD_SALT_ROUNDS);
    }

    public async compare(data: string, encrypted: string): Promise<boolean> {
        return await compare(data, encrypted);
    }
}

export { EncryptBase };
