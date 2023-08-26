import { type AuthScreenName } from '~/bundles/common/enums/enums';

type AuthNavigationParameterList = {
    [AuthScreenName.SIGN_IN]: undefined;
    [AuthScreenName.SIGN_UP]: undefined;
};

export { type AuthNavigationParameterList };
