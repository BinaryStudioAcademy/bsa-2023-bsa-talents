import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import { Button, Text } from '~/bundles/common/components/components';
import {
    ButtonType,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { fileSizeValidation } from '~/bundles/talent/helpers/file-size-validation';

//import { notifications } from '~/framework/notifications/notifications';
import { getErrorMessage } from '../../helpers/helpers';
import { ACCEPTED_DOCUMENT_TYPE } from './constants/constants';

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

    const handleDocumentPick = async (): Promise<void> => {
        try {
            const pickerResult = await DocumentPicker.pick({
                type: [
                    ACCEPTED_DOCUMENT_TYPE.DOC,
                    ACCEPTED_DOCUMENT_TYPE.DOCX,
                    ACCEPTED_DOCUMENT_TYPE.PDF,
                ],
            });

            const [document] = pickerResult;

            if (document.size !== null) {
                fileSizeValidation(name, document.size);
            }
            onChange({
                name: document.name,
                size: document.size,
                uri: document.uri,
            });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(name, {
                type: 'fileSize',
                message: errorMessage,
            });
        }
    };

    return (
        <>
            <Button
                label={label}
                style={style}
                buttonType={ButtonType.OUTLINE}
                iconName={IconName.ADD}
                onPress={void handleDocumentPick}
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
