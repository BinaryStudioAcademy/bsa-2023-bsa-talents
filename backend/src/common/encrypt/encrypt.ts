import { config } from '~/common/packages/config/config.js';

import { Encrypt } from './encrypt.package.js';

const encrypt = new Encrypt(config);

export { encrypt };
