import { logger } from '~/common/packages/packages.js';

import { ConfigBase } from './config-base.package.js';

const config = new ConfigBase(logger);

export { config };
export { type Config } from './types/types.js';
