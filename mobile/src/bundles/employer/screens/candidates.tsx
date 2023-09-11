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
        ID: 1,
        SALARY_EXPECTATION: 1500,
        JOB_TITLE: 'middle python developer',
        LOCATION: 'Ukraine',
        EXPERIENCE_YEARS: 2.5,
        DESCRIPTION:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text',
        ENGLISH_LEVEL: 'Upper-Intermediate',
        PUBLISHED: 'Published today',
        HARD_SKILLS: [
            'JavaScript',
            'GitHub',
            'NodeJS',
            'React',
            'Vite',
            'React Native',
        ],
        BADGES: [
            { label: BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE, value: 7 },
            { label: BsaBadgeStepBadgesTitle.PUNCTUALITY, value: 8 },
            { label: 'You average project score', value: 9 },
        ],
    },
    {
        ID: 2,
        SALARY_EXPECTATION: 2500,
        JOB_TITLE: 'middle c++ developer',
        LOCATION: 'Ukraine',
        EXPERIENCE_YEARS: 1,
        DESCRIPTION:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text text',
        ENGLISH_LEVEL: 'Intermediate',
        PUBLISHED: 'Published yesterday',
        HARD_SKILLS: [
            'JavaScript',
            'GitHub',
            'NodeJS',
            'React',
            'React Native',
        ],
        BADGES: [
            { label: BsaBadgeStepBadgesTitle.ENGLISH_LEVEL, value: 'B1' },
            { label: BsaBadgeStepBadgesTitle.COMMUNICATION_SCORE, value: 7 },
            { label: 'You average lecture score', value: 8 },
        ],
    },
    {
        ID: 3,
        SALARY_EXPECTATION: 2000,
        JOB_TITLE: 'middle javascript developer',
        LOCATION: 'Ukraine',
        EXPERIENCE_YEARS: 2.5,
        DESCRIPTION:
            'Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients text text text text text text text text text text text',
        ENGLISH_LEVEL: 'Advanced',
        PUBLISHED: 'Published 2 days ago',
        HARD_SKILLS: ['JavaScript', 'GitHub', 'NodeJS', 'React', 'Vite'],
        BADGES: [
            { label: BsaBadgeStepBadgesTitle.PUNCTUALITY, value: 8 },
            { label: BsaBadgeStepBadgesTitle.ENGLISH_LEVEL, value: 'C1' },
            { label: 'You average project score', value: 9 },
        ],
    },
];
const numberOfMockUsers = mockUsers.length;

const Candidates: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCandidates = useMemo(() => {
        return mockUsers.filter((user) =>
            user.JOB_TITLE.toLowerCase().includes(searchQuery.toLowerCase()),
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
                    <CandidateCard key={user.ID} {...user} />
                ))}
            </ScrollView>
        </>
    );
};

export { Candidates };
