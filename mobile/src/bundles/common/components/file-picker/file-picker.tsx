import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';
import DocumentPicker, {
    isCancel,
    isInProgress,
    types,
} from 'react-native-document-picker';

import { Button, Text } from '~/bundles/common/components/components';
import {
    ButtonType,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import { fileSizeValidation } from '~/bundles/talent/components/cv-and-contacts-form/helpers/file-size-validation';
import { notifications } from '~/framework/notifications/notifications';

import { getErrorMessage } from '../../helpers/helpers';

type FilePickerProperties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    label: string;
    style: StyleProp<ViewStyle>;
    setError: UseFormSetError<T>;
};

const FilePicker = <T extends FieldValues>({
    label,
    style,
    control,
    name,
    setError,
}: FilePickerProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const { value, onChange } = field;

    const handleError = (error: unknown): void => {
        if (isCancel(error)) {
            notifications.showError({ title: 'cancelled' });
        } else if (isInProgress(error)) {
            notifications.showError({
                title: 'multiple pickers were opened, only the last will be considered',
            });
        } else {
            const errorMessage = getErrorMessage(error);
            setError(name, {
                type: 'fileSize',
                message: errorMessage,
            });
        }
    };

    const handleDocumentPick = (): void => {
        DocumentPicker.pick({
            type: [types.doc, types.docx, types.pdf],
        })
            .then((response) => {
                const [document] = response;

                if (document.size !== null) {
                    fileSizeValidation(name, document.size);
                }

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
