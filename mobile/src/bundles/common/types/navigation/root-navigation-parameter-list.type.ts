import { type RootScreenName } from '~/bundles/common/enums/enums';

type RootNavigationParameterList = {
    [RootScreenName.AUTH_ROOT_ROUTE]: undefined;
    [RootScreenName.MAIN_ROOT_ROUTE]: undefined;
    [RootScreenName.DRAWER_ROOT_ROUTE]: undefined;
};

export { type RootNavigationParameterList };
