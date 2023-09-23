import React from 'react';

import {
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './style';

const TalentProfile: React.FC = () => {
    //todo change to real data
    const { isApproved } = useAppSelector(({ talents }) => talents);

    //console.log(useAppSelector(({ talents }) => talents));

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.pv25,
                    globalStyles.pl25,
                    globalStyles.pr5,
                    styles.header,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Your profile</Text>
                <VerificationMessage isApproved={isApproved} />
            </View>
        </>
    );
};

export { TalentProfile };
