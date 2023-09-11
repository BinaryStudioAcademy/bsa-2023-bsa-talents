import React from 'react';

import { ScrollView, StatusBar } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

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
    },
];

const Candidates: React.FC = () => {
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
                <CandidatesHeader />
                <SearchTalents />
                {mockUsers.map((user) => (
                    <CandidateCard key={user.ID} {...user} />
                ))}
            </ScrollView>
        </>
    );
};

export { Candidates };
