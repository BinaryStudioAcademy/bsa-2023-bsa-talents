import React from 'react';

import { Button, View } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type ProfileScreenButtonsProperties = {
    isEditable: boolean;
    isPublished: boolean;
    onFormSubmit: () => void;
    onFormEdit: () => void;
    onFormReset: () => void;
    onPublish: () => void;
};

const ProfileScreenButtons: React.FC<ProfileScreenButtonsProperties> = ({
    isEditable,
    isPublished,
    onFormEdit,
    onFormReset,
    onFormSubmit,
    onPublish,
}) => {
    return (
        <>
            <View style={[globalStyles.flexDirectionRow, styles.container]}>
                {isEditable ? (
                    <Button label="Save" onPress={onFormSubmit} />
                ) : (
                    <Button label="Edit" onPress={onFormEdit} />
                )}

                {isEditable && (
                    <Button
                        label="Cancel"
                        onPress={onFormReset}
                        buttonType={ButtonType.GHOST}
                    />
                )}
                {!isPublished && (
                    <Button
                        label="Publish"
                        style={globalStyles.ml25}
                        onPress={onPublish}
                    />
                )}
            </View>
        </>
    );
};

export { ProfileScreenButtons };
