import { type AppEnvironment } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    API: {
        ORIGIN_URL: string;
    };
};

export { type EnvironmentSchema };
