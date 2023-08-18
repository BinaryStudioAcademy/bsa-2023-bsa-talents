import { config } from '~/framework/config/config';

import { Store } from './store.package';

const store = new Store(config);

export { store };
