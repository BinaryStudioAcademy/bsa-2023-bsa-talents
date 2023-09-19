import React from 'react';

import {
    FlatList,
    StatusBar,
    View,
} from '~/bundles/common/components/components';
import { BsaBadgeStepBadgesTitle, Color } from '~/bundles/common/enums/enums';
import { useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    CandidateCard,
    CandidatesHeader,
    SearchTalents,
} from '~/bundles/employer/components/components';
import { type Candidate } from '~/bundles/employer/types/types';

// TODO replace with real users
const mockUsers = [
    {
        userId: '1',
        salaryExpectation: 1500,
        jobTitle: 'middle python developer',
        location: 'Ukraine',
        experienceYears: 2.5,
        description:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text',
        englishLevel: 'Upper-Intermediate',
        published: 'Published today',
        hardSkills: [
            'JavaScript',
            'GitHub',
            'NodeJS',
            'React',
            'Vite',
            'React Native',
        ],
        badges: [
            { label: BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE, value: 7 },
            { label: BsaBadgeStepBadgesTitle.PUNCTUALITY, value: 8 },
            { label: BsaBadgeStepBadgesTitle.PROJECT_SCORE, value: 9 },
        ],
    },
    {
        userId: '2',
        salaryExpectation: 2500,
        jobTitle: 'middle c++ developer',
        location: 'Ukraine',
        experienceYears: 1,
        description:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text text',
        englishLevel: 'Intermediate',
        published: 'Published yesterday',
        hardSkills: ['JavaScript', 'GitHub', 'NodeJS', 'React', 'React Native'],
        badges: [
            { label: BsaBadgeStepBadgesTitle.ENGLISH_LEVEL, value: 'B1' },
            { label: BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE, value: 7 },
            { label: BsaBadgeStepBadgesTitle.LECTURE_SCORE, value: 8 },
        ],
    },
    {
        userId: '3',
        salaryExpectation: 2000,
        jobTitle: 'middle javascript developer',
        location: 'Ukraine',
        experienceYears: 2.5,
        description:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text text text',
        englishLevel: 'Advanced',
        published: 'Published 2 days ago',
        hardSkills: ['JavaScript', 'GitHub', 'NodeJS', 'React', 'Vite'],
        badges: [
            { label: BsaBadgeStepBadgesTitle.PUNCTUALITY, value: 8 },
            { label: BsaBadgeStepBadgesTitle.ENGLISH_LEVEL, value: 'C1' },
            { label: BsaBadgeStepBadgesTitle.LECTURE_SCORE, value: 9 },
        ],
    },
];
const numberOfMockUsers = mockUsers.length;

const Candidates: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCandidates = useMemo(() => {
        //TODO replace with request to backend
        return mockUsers.filter((user) =>
            user.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    const renderCandidateCard = ({
        item,
    }: {
        item: Candidate;
    }): React.ReactElement => <CandidateCard key={item.userId} {...item} />;

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.flex1,
                    { backgroundColor: Color.BACKGROUND },
                ]}
            >
                <CandidatesHeader numberOfUsers={numberOfMockUsers} />
                <SearchTalents
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <FlatList
                    data={filteredCandidates}
                    renderItem={renderCandidateCard}
                    keyExtractor={(item): string => item.userId}
                />
            </View>
        </>
    );
};

export { Candidates };
