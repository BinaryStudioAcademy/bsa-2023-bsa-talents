import { type RootScreenName } from '~/bundles/common/enums/enums';

import { type ChatNavigationProperties } from './chat-navigation-properties.type';

type RootNavigationParameterList = {
    [RootScreenName.AUTH_ROOT_ROUTE]: undefined;
    [RootScreenName.MAIN_ROOT_ROUTE]: undefined;
    [RootScreenName.ONBOARDING_ROOT_ROUTE]: undefined;
    [RootScreenName.CHAT_ROOT_ROUTE]: ChatNavigationProperties;
};

export { type RootNavigationParameterList };
