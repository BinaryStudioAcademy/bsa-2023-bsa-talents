import { WHITE_ROUTES } from '../constants/api.constants.js';

const checkWhiteRoute = (route: string, method: string): boolean => {
    for (const whiteRoute of WHITE_ROUTES) {
        const isMethodMatch = whiteRoute.methods.includes(method);
        if (!isMethodMatch) {
            continue;
        }

        const routePattern = whiteRoute.routerPath.replace('*', '.*');
        const regex = new RegExp(`^${routePattern}$`);
        if (regex.test(route)) {
            return true;
        }
    }
    return false;
};

export { checkWhiteRoute };
