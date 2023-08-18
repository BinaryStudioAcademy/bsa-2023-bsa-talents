import { type Config as ConfigBase } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../types/types.js';

type Config = ConfigBase<EnvironmentSchema>;

export { type Config };
