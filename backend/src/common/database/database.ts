import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { DatabaseBase } from './database-base.package.js';

const database = new DatabaseBase(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { DatabaseTableName } from './enums/enums.js';
export { type Database } from './interfaces/interfaces.js';
