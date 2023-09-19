import React from 'react';

import {
    CommunityIcon,
    Text,
    TextInput,
    View,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type TextInputProps,
} from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    marker?: string;
    iconName?: string;
    iconSize?: number;
};

const defaultIconSize = 25;

const Input = <T extends FieldValues>({
    editable = true,
    hasError,
    control,
    name,
    marker,
    multiline = false,
    iconName,
    iconSize = defaultIconSize,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentCenter,
                globalStyles.alignItemsStretch,
            ]}
        >
            {marker && (
                <View
                    style={[
                        globalStyles.justifyContentCenter,
                        globalStyles.ph20,
                        styles.marker,
                    ]}
                >
                    <Text category={TextCategory.INPUT}>{marker}</Text>
                </View>
            )}

            {iconName && (
                <View
                    style={[
                        globalStyles.alignSelfCenter,
                        globalStyles.pv15,
                        globalStyles.pl5,
                        styles.iconContainer,
                    ]}
                >
                    <CommunityIcon
                        name={iconName}
                        size={iconSize}
                        color={Color.PRIMARY}
                    />
                </View>
            )}

            <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholderTextColor={Color.TEXT2}
                {...props}
                style={[
                    globalStyles.flex1,
                    globalStyles.Input,
                    !marker && !iconName && globalStyles.borderRadius5,
                    iconName ? styles.noLeftBorder : globalStyles.pl10,
                    styles.input,
                    multiline && styles.multiline,
                    !editable && styles.disabled,
                    hasError && styles.error,
                ]}
            />
        </View>
    );
};

export { Input };
