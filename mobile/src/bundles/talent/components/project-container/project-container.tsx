import React from 'react';

import {
    Linking,
    Pressable,
    Text,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { globalStyles } from '~/bundles/common/styles/styles';

import { PROJECT_MOCK } from './constants/constants';
import { styles } from './style';

const ProjectContainer = (): JSX.Element => {
    const { lmsData } = useAppSelector(({ commonData }) => commonData);

    const projectData = lmsData?.project ?? PROJECT_MOCK;
    const { name, repositoryUrl, details } = projectData;

    const handleSitePress = (): void => {
        void Linking.openURL(repositoryUrl ?? PROJECT_MOCK.repositoryUrl);
    };

    return (
        <Pressable onPress={handleSitePress}>
            <Text category={TextCategory.BODY1} style={globalStyles.pb10}>
                {name}
            </Text>
            <Text
                category={TextCategory.CAPTION}
                style={[styles.text, globalStyles.pb10]}
            >
                {details?.en ?? PROJECT_MOCK.details.en}
            </Text>
        </Pressable>
    );
};

export { ProjectContainer };
