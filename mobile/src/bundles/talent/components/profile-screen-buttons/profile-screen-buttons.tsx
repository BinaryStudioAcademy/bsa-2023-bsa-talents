import React from 'react';

import { Button, View } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type ProfileScreenButtonsProperties = {
    isEditable: boolean;
    onFormSubmit: () => void;
    onFormEdit: () => void;
    onFormReset: () => void;
};

const ProfileScreenButtons: React.FC<ProfileScreenButtonsProperties> = ({
    isEditable,
    onFormEdit,
    onFormReset,
    onFormSubmit,
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
            </View>
        </>
    );
};

export { ProfileScreenButtons };
