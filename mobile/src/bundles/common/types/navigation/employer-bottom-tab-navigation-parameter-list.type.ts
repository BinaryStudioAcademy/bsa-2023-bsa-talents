import { type EmployerBottomTabScreenName } from '~/bundles/common/enums/enums';
import { type UserDetailsResponseDto } from '~/bundles/common/types/types';

type EmployerBottomTabNavigationParameterList = {
    [EmployerBottomTabScreenName.CANDIDATES]: undefined;
    [EmployerBottomTabScreenName.CHAT_LIST]: undefined;
    [EmployerBottomTabScreenName.EMPLOYER_PROFILE]: undefined;
    [EmployerBottomTabScreenName.CANDIDATE_DETAILS]: UserDetailsResponseDto;
};

export { type EmployerBottomTabNavigationParameterList };
