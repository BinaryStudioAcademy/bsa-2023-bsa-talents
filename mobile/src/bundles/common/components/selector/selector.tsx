import { type ReactElement } from 'react';
import React from 'react';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    FlatList,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';

// import { Color } from '../../enums/enums';
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
    const [chooseData, setChooseData] = React.useState('Option');
    const [isModalVisible, setIsMOdalVisible] = React.useState(false);

    const DropdownButton = React.useRef<View>(null);

    const changeModalVisibility = (): void => {
        setIsMOdalVisible((previous) => !previous);
    };

    const onPressItem = (option: Select): void => {
        changeModalVisibility();
        setChooseData(option.label);
    };

    return (
        <View>
            <Text style={[styles.label, globalStyles.pb5]}>{label}</Text>
            <Pressable
                ref={DropdownButton}
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                ]}
                onPress={changeModalVisibility}
            >
                <Text style={styles.text}>{chooseData}</Text>
                <View style={[globalStyles.mr10, globalStyles.p5]}>
                    {/* <Icon
                        name="arrow-drop-down"
                        size={12}
                        color={Color.PRIMARY}
                    /> */}
                </View>
            </Pressable>
            {isModalVisible && (
                <View>
                    <Pressable
                        style={[globalStyles.flex1]}
                        onPress={changeModalVisibility}
                    >
                        <View style={[globalStyles.pl20, styles.dropdown]}>
                            <FlatList
                                data={options}
                                renderItem={({ item }): ReactElement => {
                                    return (
                                        <TouchableOpacity
                                            onPress={(): void => {
                                                onPressItem(item);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.text,
                                                    globalStyles.p5,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item): string => item.value}
                            />
                        </View>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export { Selector };
