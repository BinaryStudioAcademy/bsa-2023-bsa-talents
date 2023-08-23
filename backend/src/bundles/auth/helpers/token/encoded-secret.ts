import { config } from '~/common/config/config.js';

const secret = new TextEncoder().encode(config.ENV.JWT.SECRET);

export { secret };
