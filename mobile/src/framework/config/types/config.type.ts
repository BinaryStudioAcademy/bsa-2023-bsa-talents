import { type Config as ConfigBase } from 'shared/build/index.js';

import { type EnvironmentSchema } from './types';

type Config = ConfigBase<EnvironmentSchema>;

export { type Config };
