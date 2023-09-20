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
    CandidateCard,
    CandidatesHeader,
    SearchTalents,
} from '~/bundles/employer/components/components';
import { getTalentsData } from '~/bundles/employer/store/actions';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

const Candidates: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useAppDispatch();
    const { dataStatus, talentsData } = useAppSelector(
        ({ employees }) => employees,
    );

    useEffect(() => {
        void dispatch(getTalentsData());
    }, [dispatch]);

    const renderCandidateCard = ({
        item,
    }: {
        item: UserDetailsResponseDto;
    }): React.ReactElement => <CandidateCard key={item.userId} {...item} />;

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

    const isCandidatesLoading = dataStatus === DataStatus.PENDING;

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
                {isCandidatesLoading ? (
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
