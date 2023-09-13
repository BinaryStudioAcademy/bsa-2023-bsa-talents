import Icon from 'react-native-vector-icons/MaterialIcons';
import { type ValueOf } from 'shared/build/index';

import { Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { type BsaBadgeStepBadgesTitle } from '../../enums/enums';
import { PreviewTabs } from '../preview-tabs/preview-tabs';
import { styles } from './styles';

// TODO replace with real user data
const mockUser = {
    PUBLISHED: 'Published today',
    PERSONAL_TYPE: ['Thinker'],
    HR_BADGES: [
        'Communicative',
        'Collaboration',
        'Creative',
        'Problem-solving',
        'Leadership',
    ],
};

const iconSize = 24;

const ProfilePreview: React.FC = () => {
    const { onboardingData } = useAppSelector(({ talents }) => talents);

    //console.log(onboardingData);

    if (!onboardingData) {
        return null;
    }

    return (
        <>
            <Text category={TextCategory.H5} style={globalStyles.pb10}>
                {onboardingData.jobTitle}
            </Text>
            <View style={[styles.profileWrapper, globalStyles.borderRadius5]}>
                <Text
                    category={TextCategory.H3}
                    style={[globalStyles.pv10, globalStyles.pl25]}
                >
                    $ {onboardingData?.salaryExpectation} / mo
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
                        <Icon
                            name={IconName.LANGUAGE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            {onboardingData?.location}
                        </Text>
                    </View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <Icon
                            name={IconName.EXPERIENCE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            {onboardingData?.experienceYears} year of experience
                        </Text>
                    </View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.pb15,
                        ]}
                    >
                        <Icon
                            name={IconName.FORUM}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            English: {onboardingData?.englishLevel}
                        </Text>
                    </View>
                    <View>
                        {onboardingData?.employmentType?.map((type) => {
                            return (
                                <View
                                    key={type}
                                    style={[
                                        globalStyles.flexDirectionRow,
                                        globalStyles.pb15,
                                    ]}
                                >
                                    <Icon
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
                        <Icon
                            name={IconName.NOT_CONSIDER}
                            size={iconSize}
                            color={Color.ERROR}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            Does’t consider:{' '}
                            {onboardingData?.notConsidered?.join(' ')}
                        </Text>
                    </View>
                </View>
            </View>
            <Text category={TextCategory.INPUT} style={globalStyles.pt5}>
                {/* todo replace with real data */}
                {mockUser.PUBLISHED}
            </Text>
            <Text category={TextCategory.BODY1} style={globalStyles.pv25}>
                {onboardingData?.description}
            </Text>
            <PreviewTabs
                badges={
                    onboardingData?.badges as ValueOf<
                        typeof BsaBadgeStepBadgesTitle
                    >[]
                }
                hardSkills={onboardingData.hardSkills}
                personalType={mockUser.PERSONAL_TYPE}
                HRBadges={mockUser.HR_BADGES}
            />
        </>
    );
};

export { ProfilePreview };
