import { WHITE_ROUTES } from '../constants/api.constants.js';

const checkWhiteRoute = (route: string, method: string): boolean => {
    return method === 'POST' && WHITE_ROUTES.includes(route);
};

export { checkWhiteRoute };
