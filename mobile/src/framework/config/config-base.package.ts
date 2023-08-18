import EnvConfig from 'react-native-config';

import { type AppEnvironment } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { type Config } from './interfaces/interfaces';
import { type EnvironmentSchema } from './types/types';

class ConfigBase implements Config {
    public ENV: EnvironmentSchema;

    public constructor() {
        this.ENV = this.envSchema;
    }

    private get envSchema(): EnvironmentSchema {
        return {
            APP: {
                ENVIRONMENT: EnvConfig.ENVIRONMENT as ValueOf<
                    typeof AppEnvironment
                >,
            },
            API: {
                ORIGIN_URL: EnvConfig.API_URL as string,
            },
        };
    }
}

export { ConfigBase };
