import { type ServerAppRouteParameters } from './types.js';

type ServerAppApi = {
    version: string;
    routes: ServerAppRouteParameters[];
    generateDoc(): object;
};

export { type ServerAppApi };
