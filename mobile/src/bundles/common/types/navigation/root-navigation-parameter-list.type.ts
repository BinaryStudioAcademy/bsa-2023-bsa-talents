import { type RootScreenName } from '~/bundles/common/enums/enums';
import { type ContactTalentNavigationPropertiesType } from '~/bundles/common/types/types';

import { type ChatNavigationProperties } from './chat-navigation-properties.type';

type RootNavigationParameterList = {
    [RootScreenName.AUTH_ROOT_ROUTE]: undefined;
    [RootScreenName.MAIN_ROOT_ROUTE]: undefined;
    [RootScreenName.ONBOARDING_ROOT_ROUTE]: undefined;
    [RootScreenName.PREVIEW]: undefined;
    [RootScreenName.CHAT]: ChatNavigationProperties;
    [RootScreenName.CANDIDATE_FILTER]: undefined;
    [RootScreenName.CONTACT_CANDIDATE]: ContactTalentNavigationPropertiesType;
    [RootScreenName.CHAT_USER_DETAILS]: undefined;
};

export { type RootNavigationParameterList };
