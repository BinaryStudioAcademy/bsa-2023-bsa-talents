import {
    type NavigationProp,
    type ParamListBase,
    type RouteProp,
} from '~/bundles/common/types/types';

type NavigationScreenProperties = {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase>;
};

export { type NavigationScreenProperties };
