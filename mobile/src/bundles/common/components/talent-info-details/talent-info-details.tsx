import React from 'react';

import {
    MaterialIcon,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    IconSize,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type UserDetailsResponseDto } from '~/bundles/common/types/types';

import { PreviewTabs } from './preview-tabs/preview-tabs';
import { styles } from './styles';

type TalentInfoDetailsProperties = {
    talent: Partial<UserDetailsResponseDto>;
};
const TalentInfoDetails: React.FC<TalentInfoDetailsProperties> = ({
    talent,
}) => {
    const {
        salaryExpectation,
        location,
        description,
        notConsidered,
        employmentType,
        englishLevel,
        experienceYears,
        jobTitle,
    } = talent;

    return (
        <>
            <Text category={TextCategory.H3} style={globalStyles.pb10}>
                {jobTitle}
            </Text>
            <View style={[styles.profileWrapper, globalStyles.borderRadius5]}>
                <Text
                    category={TextCategory.H3}
                    style={[globalStyles.pv10, globalStyles.pl25]}
                >
                    $ {salaryExpectation}{' '}
                    <Text category={TextCategory.H3} style={styles.salaryText}>
                        / mo
                    </Text>
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
                            size={IconSize.GENERAL}
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
                            size={IconSize.GENERAL}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            {experienceYears && +experienceYears} year of
                            experience
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
                            size={IconSize.GENERAL}
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
                                        size={IconSize.GENERAL}
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
                    {notConsidered?.map((item, index) => {
                        return (
                            <View
                                key={item}
                                style={[
                                    globalStyles.flexDirectionRow,
                                    globalStyles.pb15,
                                ]}
                            >
                                <MaterialIcon
                                    name={IconName.NOT_CONSIDER}
                                    size={IconSize.GENERAL}
                                    color={Color.ERROR}
                                />
                                <Text
                                    category={TextCategory.BODY1}
                                    style={globalStyles.pl10}
                                >
                                    {index === 0 && 'Does’t consider: '}
                                    {item}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <Text category={TextCategory.CAPTION} style={globalStyles.pt5}>
                {/* todo replace with real data created at */}
            </Text>
            <Text category={TextCategory.BODY1} style={globalStyles.pv25}>
                {description}
            </Text>
            <PreviewTabs />
        </>
    );
};

export { TalentInfoDetails };
