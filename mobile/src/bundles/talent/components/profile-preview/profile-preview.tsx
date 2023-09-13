import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { BsaBadgeStepBadgesTitle } from '../../enums/enums';
import { PreviewTabs } from '../preview-tabs/preview-tabs';
import { styles } from './styles';

// TODO replace with real user data
const mockUser = {
    ID: 1,
    SALARY_EXPECTATION: 1500,
    JOB_TITLE: 'Middle python developer',
    LOCATION: 'Ukraine',
    EMPLOYMENT_TYPE: ['Remote work', 'Full time'],
    NOT_CONCEDER: ['crypto'],
    EXPERIENCE_YEARS: 2.5,
    DESCRIPTION:
        'Hi! Throughout my time as a  Python developer, I`ve developed a strong foundation in Python programming, enabling me to create efficient, modular, and maintainable code. I`ve become adept at leveraging the language`s versatile libraries and frameworks to tackle complex tasks and deliver robust solutions',
    ENGLISH_LEVEL: 'Upper-Intermediate',
    PUBLISHED: 'Published today',
    PERSONAL_TYPE: ['Thinker'],
    HR_BADGES: [
        'Communicative',
        'Collaboration',
        'Creative',
        'Problem-solving',
        'Leadership',
    ],
    HARD_SKILLS: [
        'JavaScript',
        'GitHub',
        'NodeJS',
        'React',
        'Vite',
        'React Native',
    ],
    BADGES: [
        { label: BsaBadgeStepBadgesTitle.LECTURE_SCORE, value: 7 },
        { label: BsaBadgeStepBadgesTitle.PROJECT_SCORE, value: 8 },
        { label: BsaBadgeStepBadgesTitle.TEAM_SCORE, value: 8 },
    ],
};

const iconSize = 24;

const ProfilePreview: React.FC = () => {
    return (
        <>
            <Text category={TextCategory.H5} style={globalStyles.pb10}>
                {mockUser.JOB_TITLE}
            </Text>
            <View style={[styles.profileWrapper, globalStyles.borderRadius5]}>
                <Text
                    category={TextCategory.H3}
                    style={[globalStyles.pv10, globalStyles.pl25]}
                >
                    $ {mockUser.SALARY_EXPECTATION} / mo
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
                            {mockUser.LOCATION}
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
                            {mockUser.EXPERIENCE_YEARS} year of experience
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
                            English: {mockUser.ENGLISH_LEVEL}
                        </Text>
                    </View>
                    <View>
                        {mockUser.EMPLOYMENT_TYPE.map((type) => {
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
                            Does’t consider: crypto
                        </Text>
                    </View>
                </View>
            </View>
            <Text category={TextCategory.INPUT} style={globalStyles.pt5}>
                {mockUser.PUBLISHED}
            </Text>
            <Text category={TextCategory.BODY1} style={globalStyles.pv25}>
                {mockUser.DESCRIPTION}
            </Text>
            <PreviewTabs
                badges={mockUser.BADGES}
                hardSkills={mockUser.HARD_SKILLS}
                personalType={mockUser.PERSONAL_TYPE}
                HRBadges={mockUser.HR_BADGES}
            />
        </>
    );
};

export { ProfilePreview };
