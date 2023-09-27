import React from 'react';

import {
    Button,
    CommunityIcon,
    Divider,
    FormField,
    Input,
    MaterialIcon,
    Pressable,
    Switch,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    Color,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useFieldArray,
    useWatch,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ContactCandidateValidationRule } from '~/bundles/employer/enums/enums';
import { type ContactCandidateDto } from '~/bundles/employer/types/types';
import { contactCandidateValidationSchema } from '~/bundles/employer/validation-schemas/validation-schemas';

import { DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type ContactCandidateFormProperties = {
    onSubmit: (dto: ContactCandidateDto) => void;
    onContactClose: () => void;
};

const ContactCandidateForm: React.FC<ContactCandidateFormProperties> = ({
    onContactClose,
    onSubmit,
}) => {
    const { control, errors, handleSubmit } = useAppForm<ContactCandidateDto>({
        defaultValues: DEFAULT_VALUES,
        validationSchema: contactCandidateValidationSchema,
    });

    const isSaveTemplate = useWatch({
        control,
        name: 'isSaveTemplate',
        defaultValue: DEFAULT_VALUES.isSaveTemplate,
    });

    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsFlexStart,
                    styles.container,
                ]}
            >
                <Text
                    category={TextCategory.H5}
                    style={[globalStyles.pb25, globalStyles.alignSelfCenter]}
                >
                    Contact candidate
                </Text>
                <MaterialIcon
                    name={IconName.CLOSE}
                    size={25}
                    color={Color.PRIMARY}
                    onPress={onContactClose}
                />
            </View>
            <Divider containerStyle={globalStyles.mb25} />
            <Text
                category={TextCategory.H5}
                style={[globalStyles.pb25, globalStyles.alignSelfCenter]}
            >
                Send the first message to the candidate
            </Text>

            <FormField
                errorMessage={errors.links?.message}
                label="Add link to the vacancy"
                name="links"
            >
                <View style={styles.links}>
                    {fields.map((field, index) => {
                        const error = errors.links?.[index]?.value;
                        return (
                            <FormField
                                key={field.id}
                                name={`links.${index}.value`}
                                errorMessage={error?.message}
                            >
                                <Input
                                    control={control}
                                    name={`links.${index}.value`}
                                    placeholder="link"
                                    marker="www."
                                />
                                {index && (
                                    <Pressable
                                        style={styles.linksBtn}
                                        onPress={(): void => {
                                            remove(index);
                                        }}
                                    >
                                        <CommunityIcon
                                            name={IconName.CLOSE}
                                            size={20}
                                            color={Color.ERROR}
                                        />
                                    </Pressable>
                                )}
                            </FormField>
                        );
                    })}
                </View>
            </FormField>
            {fields.length < ContactCandidateValidationRule.MAX_LINK_AMOUNT && (
                <Button
                    label="Add more links"
                    buttonType={ButtonType.GHOST}
                    iconName={IconName.PLUS}
                    iconSize={20}
                    style={[
                        globalStyles.alignSelfFlexStart,
                        globalStyles.mv10,
                        styles.linkBtn,
                    ]}
                    onPress={(): void => {
                        append({ value: '' });
                    }}
                />
            )}

            <FormField
                errorMessage={errors.message?.message}
                label="Briefly tell employers about your experience"
                name="message"
                required
                containerStyle={globalStyles.pv15}
            >
                <Input
                    control={control}
                    name="message"
                    placeholder="Text"
                    numberOfLines={5}
                    multiline={true}
                />
            </FormField>
            <FormField containerStyle={globalStyles.pb15} name="isSaveTemplate">
                <Switch
                    name="isSaveTemplate"
                    control={control}
                    label="Save as template"
                />
            </FormField>
            {isSaveTemplate && (
                <FormField
                    errorMessage={errors.templateName?.message}
                    label="Enter template name"
                    name="templateName"
                    required
                    containerStyle={globalStyles.pb25}
                >
                    <Input
                        control={control}
                        name="templateName"
                        placeholder="Name"
                        numberOfLines={2}
                        multiline={true}
                    />
                </FormField>
            )}
            <Button
                style={globalStyles.mb25}
                label="Sent message"
                onPress={handleFormSubmit}
            />
        </>
    );
};

export { ContactCandidateForm };
