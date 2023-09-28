import { type ValueOf } from 'shared/build/index.js';

import { type AppRoute } from '~/bundles/common/enums/enums.js';

import { type RoutePattern } from './route-pattern.type.js';

type ApplicationRoute = RoutePattern<ValueOf<typeof AppRoute>>;

export { type ApplicationRoute };
