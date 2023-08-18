import { type Config as ConfigBase } from 'shared/build/index';

import { type EnvironmentSchema } from '../types/types';

type Config = ConfigBase<EnvironmentSchema>;

export { type Config };
