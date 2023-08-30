import { config } from '~/common/packages/config/config.js';

import { EncryptBase } from './encrypt.package.js';

const encrypt = new EncryptBase(config);

export { encrypt };
export { type Encrypt } from './types/types.js';
