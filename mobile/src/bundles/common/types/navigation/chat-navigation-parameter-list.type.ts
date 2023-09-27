import { type ChatScreenName } from '~/bundles/common/enums/enums';

import { type ChatNavigationProperties } from './chat-navigation-properties.type';

type ChatNavigationParameterList = {
    [ChatScreenName.CHAT_LIST]: undefined;
    [ChatScreenName.CHAT]: ChatNavigationProperties;
    [ChatScreenName.CHAT_USER_DETAILS]: undefined;
};

export { type ChatNavigationParameterList };
