import knex, { type Knex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { type Config } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { DatabaseTableName } from './enums/enums.js';
import { type Database } from './types/types.js';

class DatabaseBase implements Database {
    private appConfig: Config;

    private logger: Logger;

    public constructor(config: Config, logger: Logger) {
        this.appConfig = config;
        this.logger = logger;
    }

    public connect(): ReturnType<Database['connect']> {
        this.logger.info('Establish DB connection...');

        Model.knex(knex.default(this.environmentConfig));
    }

    public get environmentsConfig(): Database['environmentsConfig'] {
        return {
            [AppEnvironment.DEVELOPMENT]: this.initialConfig,
            [AppEnvironment.PRODUCTION]: this.initialConfig,
        };
    }

    private get initialConfig(): Knex.Config {
        return {
            client: this.appConfig.ENV.DB.DIALECT,
            connection: this.appConfig.ENV.DB.CONNECTION_STRING,
            pool: {
                min: this.appConfig.ENV.DB.POOL_MIN,
                max: this.appConfig.ENV.DB.POOL_MAX,
            },
            migrations: {
                directory: 'src/migrations',
                tableName: DatabaseTableName.MIGRATIONS,
            },
            debug: false,
            ...knexSnakeCaseMappers({
                underscoreBetweenUppercaseLetters: true,
            }),
        };
    }

    private get environmentConfig(): Knex.Config {
        return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
    }
}

export { DatabaseBase };
export { DatabaseTableName } from './enums/enums.js';
export { type Database } from './types/types.js';
