import { logger } from '~/common/logger/logger.js';

import { ConfigBase } from './config-base.package.js';

const config = new ConfigBase(logger);

export { config };
export { type Config } from './types/types.js';
