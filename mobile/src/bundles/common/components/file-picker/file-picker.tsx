import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import DocumentPicker, {
    isCancel,
    isInProgress,
    types,
} from 'react-native-document-picker';

import { Button, Text } from '~/bundles/common/components/components';
import { useFormController } from '~/bundles/common/hooks/hooks';

type FilePickerProperties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    label: string;
    style: StyleProp<ViewStyle>;
};
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    ButtonType,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';
//import { notifications } from '~/framework/notifications/notifications';

const handleError = (error: unknown): void => {
    if (isCancel(error)) {
        // notifications.showError({ title: 'cancelled' });
    } else if (isInProgress(error)) {
        // notifications.showError({
        //     title: 'multiple pickers were opened, only the last will be considered',
        // });
    } else {
        throw error;
    }
};

const FilePicker = <T extends FieldValues>({
    label,
    style,
    control,
    name,
}: FilePickerProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const { value, onChange } = field;

    const handleDocumentPick = (): void => {
        DocumentPicker.pick({
            type: [types.doc, types.docx, types.pdf],
        })
            .then((response) => {
                const [document] = response;
                onChange({
                    name: document.name,
                    size: document.size,
                    uri: document.uri,
                });
            })
            .catch(handleError);
    };

    return (
        <>
            <Button
                label={label}
                style={style}
                buttonType={ButtonType.OUTLINE}
                iconName={IconName.ADD}
                onPress={handleDocumentPick}
            />
            {value?.name && (
                <Text category={TextCategory.BODY1} style={globalStyles.pt5}>
                    {value.name}
                </Text>
            )}
        </>
    );
};

export { FilePicker };
