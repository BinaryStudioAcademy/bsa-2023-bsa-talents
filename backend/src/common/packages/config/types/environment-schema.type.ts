import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        HOST: string;
    };
    JWT: {
        SECRET: string;
        EXPIRES_IN: string;
        ALG: string;
    };
    DB: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: number;
        NAME: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    CRYPT: {
        PASSWORD_SALT_ROUNDS: number;
    };
    AWS: {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET_NAME: string;
    };
    SEND_GRID: {
        MAIL_API_KEY: string;
        MAIL_SENDER_DOMAIN: string;
        CLIENT_URL: string;
    };
};

export { type EnvironmentSchema };
