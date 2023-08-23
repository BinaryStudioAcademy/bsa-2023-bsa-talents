import { type ReactElement } from 'react';
import React from 'react';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    FlatList,
    Modal,
    Pressable,
    Text,
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

const INITIAL_DROPDOWN_TOP = 0;

const Selector: React.FC<Properties> = ({ label, options }) => {
    const [chooseData, setChooseData] = React.useState('Option');
    const [isModalVisible, setIsMOdalVisible] = React.useState(false);
    const [dropdownTop, setDropdownTop] = React.useState(INITIAL_DROPDOWN_TOP);

    const DropdownButton = React.useRef<View>(null);

    const changeModalVisibility = (): void => {
        setIsMOdalVisible((previous) => !previous);
        // eslint-disable-next-line max-params
        DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py): void => {
            setDropdownTop(py + h);
        });
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
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={changeModalVisibility}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={changeModalVisibility}
                >
                    <View
                        style={[
                            globalStyles.pl20,
                            styles.dropdown,
                            { top: dropdownTop },
                        ]}
                    >
                        <FlatList
                            data={options}
                            renderItem={({ item }): ReactElement => {
                                return (
                                    <Pressable
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
                                    </Pressable>
                                );
                            }}
                            keyExtractor={(item): string => item.value}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export { Selector };
