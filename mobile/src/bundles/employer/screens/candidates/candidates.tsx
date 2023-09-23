import React from 'react';

import {
    FlatList,
    Loader,
    StatusBar,
    View,
} from '~/bundles/common/components/components';
import { Color, DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    getBadgesData,
    getHardSkillsData,
} from '~/bundles/common-data/store/actions';
import {
    CandidateCard,
    CandidatesHeader,
    SearchTalents,
} from '~/bundles/employer/components/components';
import { getTalentsData } from '~/bundles/employer/store/actions';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

const Candidates: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useAppDispatch();
    const { dataStatus: employerDataStatus, talentsData } = useAppSelector(
        ({ employees }) => employees,
    );
    const {
        dataStatus: commonDataStatus,
        badgesData,
        hardSkillsData,
    } = useAppSelector(({ commonData }) => commonData);

    useEffect(() => {
        void dispatch(getTalentsData());
        if (!hardSkillsData) {
            void dispatch(getHardSkillsData());
        }
        if (!badgesData) {
            void dispatch(getBadgesData());
        }
    }, [badgesData, dispatch, hardSkillsData]);

    const renderCandidateCard = ({
        item,
    }: {
        item: UserDetailsResponseDto;
    }): React.ReactElement => <CandidateCard key={item.userId} {...item} />;

    // TODO: replace if backend search will be finished
    const filteredCandidates = useMemo(() => {
        if (!talentsData) {
            return null;
        }

        return searchQuery
            ? talentsData.filter(({ jobTitle }) =>
                  jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            : talentsData;
    }, [searchQuery, talentsData]);

    const isDataLoading =
        employerDataStatus === DataStatus.PENDING ||
        commonDataStatus === DataStatus.PENDING;

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.flex1,
                    globalStyles.pb25,
                    { backgroundColor: Color.BACKGROUND },
                ]}
            >
                <CandidatesHeader numberOfUsers={filteredCandidates?.length} />
                <SearchTalents
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                {isDataLoading ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={filteredCandidates}
                        renderItem={renderCandidateCard}
                        keyExtractor={(item): string => item.userId}
                    />
                )}
            </View>
        </>
    );
};

export { Candidates };
