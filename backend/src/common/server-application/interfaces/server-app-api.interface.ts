import { type ServerAppRouteParameters } from '../types/types.js';

type ServerAppApi = {
    version: string;
    routes: ServerAppRouteParameters[];
    generateDoc(): object;
};

export { type ServerAppApi };
