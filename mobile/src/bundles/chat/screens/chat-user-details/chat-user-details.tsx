import React from 'react';

import { ChatBackButton } from '~/bundles/chat/components/components';
import {
    ActiveModal,
    Button,
    Divider,
    Image,
    Linking,
    RadioButtons,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useAppSelector,
    useCallback,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type RadioButtonProps } from '~/bundles/common/types/types';

import { styles } from './styles';

const radioButtons: RadioButtonProps[] = [
    {
        id: 'Yes',
        label: 'Yes',
    },
    {
        id: 'No',
        label: 'No',
    },
];

const ChatUserDetails: React.FC = () => {
    const { employerDetails } = useAppSelector(({ chat }) => chat.current);
    const {
        companyWebsite,
        logoUrl,
        employerName,
        employerPosition,
        about,
        companyName,
    } = employerDetails;
    const { isVisible, handleToggleVisibility } = useVisibility(false);

    const { control, handleSubmit } = useAppForm({
        defaultValues: {
            hired: 'No',
        },
    });

    //TODO handle submit form
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(handleToggleVisibility)();
    }, [handleSubmit, handleToggleVisibility]);

    const openUrl = (): void => {
        companyWebsite && void Linking.openURL(`https://www.${companyWebsite}`);
    };

    return (
        <View style={globalStyles.flex1}>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.p25,
                    globalStyles.alignItemsCenter,
                ]}
            >
                {logoUrl ? (
                    <Image source={{ uri: logoUrl }} style={styles.logo} />
                ) : (
                    <View
                        style={[
                            styles.logoPlaceholder,
                            globalStyles.borderRadius10,
                        ]}
                    />
                )}
                <View style={globalStyles.ml10}>
                    <Text category={TextCategory.H3}>{companyName}</Text>
                    <Text
                        category={TextCategory.INPUT}
                        style={styles.supportingText}
                    >
                        {employerName}, {employerPosition}
                    </Text>
                </View>
                <View style={styles.backButton}>
                    <ChatBackButton />
                </View>
            </View>
            <Divider />
            <View style={[globalStyles.p25]}>
                <Text category={TextCategory.H5} style={globalStyles.pb10}>
                    About {companyName}
                </Text>
                <Text category={TextCategory.H6} style={styles.supportingText}>
                    {about}
                </Text>
                <View style={globalStyles.pv25}>
                    <Text category={TextCategory.H5}>Company Website</Text>
                    <Text
                        onPress={openUrl}
                        style={styles.link}
                        category={TextCategory.BUTTON}
                    >
                        {companyWebsite}
                    </Text>
                </View>
                {/* TODO add functionality to share CV */}
                <Button
                    label="Share your contact and CV"
                    style={globalStyles.mv25}
                />
            </View>
            <View style={[globalStyles.alignItemsCenter]}>
                <Text category={TextCategory.H6} style={globalStyles.mb10}>
                    Has the employer already hired you?
                </Text>
                <View style={globalStyles.mb10}>
                    <RadioButtons
                        radioButtons={radioButtons}
                        control={control}
                        layout="row"
                        name="hired"
                        containerStyle={styles.radioButtons}
                    />
                </View>
                <Button
                    label="Submit"
                    buttonType={ButtonType.OUTLINE}
                    style={styles.hiredButton}
                    onPress={handleToggleVisibility}
                />
            </View>
            <ActiveModal
                visible={isVisible}
                onClose={handleToggleVisibility}
                title="Are you sure you want to confirm this action?"
                onAccept={handleFormSubmit}
            />
        </View>
    );
};

export { ChatUserDetails };
