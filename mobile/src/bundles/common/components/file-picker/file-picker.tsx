import React from 'react';

import {
    Button,
    DocumentPicker,
    Text,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { useCallback, useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';
import {
    ERROR_MESSAGE,
    MAX_FILE_SIZE,
} from '~/bundles/talent/helpers/constants/constants';
import { checkIfFileSizeValid } from '~/bundles/talent/helpers/helpers';
import { notifications } from '~/framework/notifications/notifications';

import { ACCEPTED_DOCUMENT_TYPES } from './constants/constants';

type FilePickerProperties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    label: string;
    style: StyleProp<ViewStyle>;
};

const FilePicker = <T extends FieldValues>({
    label,
    style,
    control,
    name,
}: FilePickerProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const { value, onChange } = field;

    const handleDocumentPick = useCallback(async () => {
        try {
            const pickerResult = await DocumentPicker.pick({
                type: ACCEPTED_DOCUMENT_TYPES,
            });

            const [document] = pickerResult;

            const isSizeValid = checkIfFileSizeValid(document.size);

            if (isSizeValid) {
                onChange({
                    name: document.name,
                    type: document.type,
                    uri: document.uri,
                });
            } else {
                notifications.showError({ title: ERROR_MESSAGE.SIZE });
                onChange(null);
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
        }
    }, [onChange]);

    const fileLoadHandler = useCallback((): void => {
        void handleDocumentPick();
    }, [handleDocumentPick]);

    return (
        <>
            <Button
                label={label}
                style={style}
                buttonType={ButtonType.OUTLINE}
                iconName={IconName.PLUS}
                onPress={fileLoadHandler}
            />
            <Text category={TextCategory.BODY1} style={globalStyles.pt5}>
                {value?.name ??
                    `File size < ${MAX_FILE_SIZE.mb} MB, allowed: doc, docx, pdf`}
            </Text>
        </>
    );
};

export { FilePicker };
