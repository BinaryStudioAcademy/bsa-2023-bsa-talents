import { type ReactElement, useState } from 'react';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    FlatList,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';

import { TextCategory } from '../../enums/enums';
import { globalStyles } from '../../styles/styles';
import { styles } from './styles';

type Select = {
    label: string;
    value: string;
};

type Properties = {
    label: string;
    options: Select[];
    onSelect?: (item: Select) => void;
};

const Selector: React.FC<Properties> = ({ label, options }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: Select): void => {
        toggleIsListVisible();
        setSelectedOption(option.label);
    };

    return (
        <View>
            <Text category={TextCategory.LABEL}>{label}</Text>
            <Pressable
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                ]}
                onPress={(): void => {
                    setIsListVisible((previous) => !previous);
                }}
            >
                <Text category={TextCategory.LABEL}>{selectedOption}</Text>
                {/* <View style={[globalStyles.mr10, globalStyles.p5]}>
                    <Icon
                        name="arrow-drop-down"
                        size={12}
                        color={Color.PRIMARY}
                    />
                </View> */}
            </Pressable>
            {isListVisible && (
                <Pressable
                    style={globalStyles.flex1}
                    onPress={toggleIsListVisible}
                >
                    <View style={[globalStyles.pl20, styles.dropdown]}>
                        <FlatList
                            data={options}
                            renderItem={({ item }): ReactElement => {
                                return (
                                    <TouchableOpacity
                                        onPress={(): void => {
                                            handlePressItem(item);
                                        }}
                                    >
                                        <Text category={TextCategory.LABEL}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item): string => item.value}
                        />
                    </View>
                </Pressable>
            )}
        </View>
    );
};

export { Selector };
