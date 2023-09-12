import React from 'react';

import { ScrollView, StatusBar } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { useMemo, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

import {
    CandidateCard,
    CandidatesHeader,
    SearchTalents,
} from '../components/components';

// TODO replace with real users
const mockUsers = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        return mockUsers.filter(
            (
                user, //TODO replace with real users
            ) =>
                user.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <ScrollView
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
                {filteredCandidates.map((user) => (
                    <CandidateCard key={user.id} {...user} />
                ))}
            </ScrollView>
        </>
    );
};

export { Candidates };
