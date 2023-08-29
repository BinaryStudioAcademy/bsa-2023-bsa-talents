import { WHITE_ROUTES } from '../constants/api.constants.js';

const checkWhiteRoute = ({
    routerPath,
    routerMethod,
}: {
    routerPath: string;
    routerMethod: string;
}): boolean => {
    return WHITE_ROUTES.some((route) => {
        const routePattern = route.path.replace('*', '.*');
        const regex = new RegExp(`^${routePattern}$`);
        return regex.test(routerPath) && route.methods.includes(routerMethod);
    });
};

export { checkWhiteRoute };
