import { type ServerAppRouteParameters } from '../types/types.js';

type ServerApp = {
    addRoute(parameters: ServerAppRouteParameters): void;
    addRoutes(parameters: ServerAppRouteParameters[]): void;
};

export { type ServerApp };
