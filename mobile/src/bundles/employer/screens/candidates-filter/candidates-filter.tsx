import React from 'react';

import { Overlay, ScrollView } from '~/bundles/common/components/components';
import {
    DataStatus,
    EmployerBottomTabScreenName,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type EmployerBottomTabNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';
import { CandidatesFilterForm } from '~/bundles/employer/components/components';
import { transformCandidateFilterFormToQuery } from '~/bundles/employer/helpers/helpers';
import { actions } from '~/bundles/employer/store/';
import { getTalents } from '~/bundles/employer/store/actions';
import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

import { styles } from './styles';

const CandidatesFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setTalentsFilters } = actions;
    const commonDataStatus = useAppSelector(
        ({ commonData }) => commonData.dataStatus,
    );

    const navigation =
        useNavigation<
            NavigationProp<EmployerBottomTabNavigationParameterList>
        >();

    const handleFilterClose = useCallback((): void => {
        navigation.navigate(EmployerBottomTabScreenName.CANDIDATES);
    }, [navigation]);

    const handleFormSubmit = useCallback(
        (payload: EmployeesFiltersForm): void => {
            dispatch(setTalentsFilters(payload));
            const queryString = transformCandidateFilterFormToQuery(payload);
            void dispatch(getTalents(queryString));
            handleFilterClose();
        },
        [setTalentsFilters, handleFilterClose, dispatch],
    );

    const isCommonDataLoading = commonDataStatus === DataStatus.PENDING;

    return (
        <>
            <Overlay isActive={isCommonDataLoading} />
            <ScrollView
                persistentScrollbar
                style={[
                    globalStyles.defaultScreenPadding,
                    globalStyles.borderRadius10,
                    globalStyles.width100,
                    globalStyles.height100,
                    styles.container,
                ]}
            >
                <CandidatesFilterForm
                    onSubmit={handleFormSubmit}
                    onFilterClose={handleFilterClose}
                />
            </ScrollView>
        </>
    );
};

export { CandidatesFilter };
