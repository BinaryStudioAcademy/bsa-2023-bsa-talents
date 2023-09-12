import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ScrollView, Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './style';

const iconSize = 24;

const Preview: React.FC = () => {
    return (
        <ScrollView style={globalStyles.defaultScreenPadding}>
            <Text category={TextCategory.H4} style={globalStyles.pb10}>
                Middle Python Developer
            </Text>
            <View style={[styles.profileWrapper, globalStyles.borderRadius5]}>
                <Text
                    category={TextCategory.H3}
                    style={[globalStyles.pv10, globalStyles.pl25]}
                >
                    $ 1500 / mo
                </Text>
                <View
                    style={[
                        globalStyles.pv25,
                        globalStyles.pl25,
                        styles.profileItems,
                    ]}
                >
                    <View style={globalStyles.flexDirectionRow}>
                        <Icon
                            name={IconName.LANGUAGE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            Ukraine
                        </Text>
                    </View>
                    <View style={globalStyles.flexDirectionRow}>
                        <Icon
                            name={IconName.EXPERIENCE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            1 year of experience
                        </Text>
                    </View>
                    <View style={globalStyles.flexDirectionRow}>
                        <Icon
                            name={IconName.FORUM}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            English: Upper-Intermediate
                        </Text>
                    </View>
                    <View style={globalStyles.flexDirectionRow}>
                        <Icon
                            name={IconName.CHECK_CIRCLE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            Remote work
                        </Text>
                    </View>
                    <View style={globalStyles.flexDirectionRow}>
                        <Icon
                            name={IconName.CHECK_CIRCLE}
                            size={iconSize}
                            color={Color.PRIMARY}
                        />
                        <Text
                            category={TextCategory.BODY1}
                            style={globalStyles.pl10}
                        >
                            Full time
                        </Text>
                    </View>
                    <View style={globalStyles.flexDirectionRow}>
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
                Published today
            </Text>
            <Text category={TextCategory.BODY1} style={globalStyles.pv25}>
                Hi! Throughout my time as a Python developer, I've developed a
                strong foundation in Python programming, enabling me to create
                efficient, modular, and maintainable code. I've become adept at
                leveraging the language's versatile libraries and frameworks to
                tackle complex tasks and deliver robust solutions.{' '}
            </Text>
        </ScrollView>
    );
};

export { Preview };
