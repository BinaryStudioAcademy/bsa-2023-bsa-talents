import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type Logger } from '~/common/packages/logger/logger.js';

import { type Config, type EnvironmentSchema } from './types/types.js';

class ConfigBase implements Config {
    private logger: Logger;

    public ENV: EnvironmentSchema;

    public constructor(logger: Logger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => {
                this.logger.info(message);
            },
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): LibraryConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
                HOST: {
                    doc: 'Host for server app',
                    format: String,
                    env: 'HOST',
                    default: null,
                },
            },
            JWT: {
                SECRET: {
                    doc: 'Secret key for token generation',
                    format: String,
                    env: 'JWT_SECRET',
                    default: null,
                },
                EXPIRES_IN: {
                    doc: 'Expiration time fo generated token',
                    format: String,
                    env: 'JWT_TOKEN_EXPIRE',
                    default: '24h',
                },
                ALG: {
                    doc: 'Algorithm used for encoding token',
                    format: String,
                    env: 'JWT_ALG',
                    default: 'HS256',
                },
            },
            DB: {
                USERNAME: {
                    doc: 'Database connection username',
                    format: String,
                    env: 'DB_USERNAME',
                    default: null,
                },
                PASSWORD: {
                    doc: 'Database connection password',
                    format: String,
                    env: 'DB_PASSWORD',
                    default: null,
                },
                HOST: {
                    doc: 'Database connection host',
                    format: String,
                    env: 'DB_HOST',
                    default: null,
                },
                PORT: {
                    doc: 'Database connection port',
                    format: Number,
                    env: 'DB_PORT',
                    default: null,
                },
                NAME: {
                    doc: 'Database name to connect',
                    format: String,
                    env: 'DB_NAME',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            CRYPT: {
                PASSWORD_SALT_ROUNDS: {
                    doc: 'Salt rounds for password encryption',
                    format: Number,
                    env: 'PASSWORD_SALT_ROUNDS',
                    default: null,
                },
            },
            AWS: {
                AWS_ACCESS_KEY_ID: {
                    doc: 'Access ID for AWS S3 bucket',
                    format: String,
                    env: 'AWS_ACCESS_KEY_ID',
                    default: null,
                },
                AWS_SECRET_ACCESS_KEY: {
                    doc: 'Secret key for AWS S3 bucket',
                    format: String,
                    env: 'AWS_SECRET_ACCESS_KEY',
                    default: null,
                },
                AWS_BUCKET_NAME: {
                    doc: 'Name of AWS S3 bucket',
                    format: String,
                    env: 'AWS_BUCKET_NAME',
                    default: null,
                },
            },
            SEND_GRID: {
                MAIL_API_KEY: {
                    doc: 'API key for sendGrid',
                    format: String,
                    env: 'MAIL_API_KEY',
                    default: null,
                },
                MAIL_SENDER_DOMAIN: {
                    doc: 'Mail sender domain',
                    format: String,
                    env: 'MAIL_SENDER_DOMAIN',
                    default: null,
                },
                CLIENT_URL: {
                    doc: 'Client URL',
                    format: String,
                    env: 'CLIENT_URL',
                    default: null,
                },
            },
            LMS_DATA_SERVER: {
                LMS_X_TOKEN: {
                    doc: 'X-Token key used in request header to access talent data from LMS server',
                    format: String,
                    env: 'LMS_X_TOKEN',
                    default: null,
                },
                LMS_SERVER: {
                    doc: 'lms server api url for GET requests of talent data',
                    format: String,
                    env: 'LMS_SERVER',
                    default: null,
                },
            },
        });
    }
}

export { ConfigBase };
