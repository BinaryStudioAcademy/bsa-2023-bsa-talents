import React from 'react';

import {
    ActiveModal,
    Button,
    Image,
    Linking,
    RadioButtons,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useMemo,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type RadioButtonProps } from '~/bundles/common/types/types';
import { type CompanyInfoDto } from '~/bundles/talent/types/types';

import { styles } from './styles';

type Properties = {
    companyInfo: CompanyInfoDto;
};

const CompanyInfo: React.FC<Properties> = ({
    companyInfo: {
        logoUrl,
        companyName,
        employerName,
        employerPosition,
        about = 'No information provided.',
        companyWebsite,
    },
}) => {
    const { isVisible, toggleVisibility } = useVisibility(false);

    const { control, handleSubmit } = useAppForm({
        defaultValues: {
            hired: 'No',
        },
    });

    //TODO handle submit form
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(toggleVisibility)();
    }, [handleSubmit, toggleVisibility]);

    const radioButtons: RadioButtonProps[] = useMemo(
        () => [
            {
                id: 'Yes',
                label: 'Yes',
            },
            {
                id: 'No',
                label: 'No',
            },
        ],
        [],
    );

    const openUrl = (): void => {
        companyWebsite && void Linking.openURL(`https://www.${companyWebsite}`);
    };

    return (
        <View style={[globalStyles.flex1]}>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.p25,
                    globalStyles.alignItemsCenter,
                    styles.header,
                ]}
            >
                <Image source={{ uri: logoUrl }} style={styles.logo} />
                <View>
                    <Text category={TextCategory.H3}>{companyName}</Text>
                    <Text
                        category={TextCategory.INPUT}
                        style={styles.supportingText}
                    >
                        {employerName}, {employerPosition}
                    </Text>
                </View>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
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
            <View style={[globalStyles.alignItemsCenter, styles.hiredForm]}>
                <Text category={TextCategory.H6}>
                    Has the employer already hired you?
                </Text>
                <View>
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
                    onPress={toggleVisibility}
                />
            </View>
            <ActiveModal
                visible={isVisible}
                onClose={toggleVisibility}
                title="Are you sure you want to confirm this action?"
                onAccept={handleFormSubmit}
            />
        </View>
    );
};

export { CompanyInfo };
