import React from 'react';

import {
    MaterialIcon,
    Text,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { PreviewTabs } from './preview-tabs/preview-tabs';
import { styles } from './styles';

// Toto change to real data.
const mockUser = {
    PUBLISHED: 'Published today',
};

const iconSize = 24;

const ProfilePreview: React.FC = () => {
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    if (!onboardingData) {
        return null;
    }

    const {
        jobTitle,
        salaryExpectation,
        location,
        experienceYears,
        englishLevel,
        employmentType,
        notConsidered,
        description,
    } = onboardingData;

    return (
        <>
            <Text category={TextCategory.H5} style={globalStyles.pb10}>
                {jobTitle}
            </Text>
            <View style={[styles.profileWrapper, globalStyles.borderRadius5]}>
                <Text
                    category={TextCategory.H3}
                    style={[globalStyles.pv10, globalStyles.pl25]}
                >
                    $ {salaryExpectation} / mo
                </Text>
                <View
                    style={[
                        globalStyles.pv25,
                        globalStyles.pl25,
                        styles.profileItems,
                    ]}
                >
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <MaterialIcon
                            name={IconName.LANGUAGE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            {location}
                        </Text>
                    </View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <MaterialIcon
                            name={IconName.EXPERIENCE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            {experienceYears} year of experience
                        </Text>
                    </View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <MaterialIcon
                            name={IconName.FORUM}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            English: {englishLevel}
                        </Text>
                    </View>
                    <View>
                        {employmentType?.map((type) => {
                            return (
                                <View
                                    key={type}
                                    style={[
                                        globalStyles.flexDirectionRow,
                                        globalStyles.pb15,
                                    ]}
                                >
                                    <MaterialIcon
                                        name={IconName.CHECK_CIRCLE}
                                        size={iconSize}
                                        color={Color.PRIMARY}
                                    />
                                    <Text
                                        category={TextCategory.BODY1}
                                        style={globalStyles.pl10}
                                    >
                                        {type}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <MaterialIcon
                            name={IconName.NOT_CONSIDER}
                            size={iconSize}
                            color={Color.ERROR}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            Does’t consider: {notConsidered?.join(' ')}
                        </Text>
                    </View>
                </View>
            </View>
            <Text category={TextCategory.CAPTION} style={globalStyles.pt5}>
                {/* todo replace with real data */}
                {mockUser.PUBLISHED}
            </Text>
            <Text category={TextCategory.BODY1} style={globalStyles.pv25}>
                {description}
            </Text>
            <PreviewTabs />
        </>
    );
};

export { ProfilePreview };
