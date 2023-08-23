import { type AuthScreenName } from '~/bundles/common/enums/enums';

type AuthNavigationParameterList = {
    [AuthScreenName.MAIL]: undefined;
    [AuthScreenName.MAIN]: undefined;
    [AuthScreenName.PERSON]: undefined;
    [AuthScreenName.SHARED_FOLDER]: undefined;
};

export { type AuthNavigationParameterList };
