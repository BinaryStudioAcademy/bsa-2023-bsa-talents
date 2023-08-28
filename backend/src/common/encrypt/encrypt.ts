import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { EncryptBase } from './encrypt.package.js';

const encrypt = new EncryptBase(config, logger);

export { encrypt };
