import React from 'react';

import {
    AutocompleteMultiSelector,
    Button,
    CheckboxGroup,
    CommunityIcon,
    FormField,
    Input,
    Pressable,
    Selector,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    Color,
    EnglishLevel,
    IconName,
    NotConsidered,
    PreferredLanguage,
} from '~/bundles/common/enums/enums';
import { useFieldArray } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldErrors } from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import { type SkillsStepDto } from '~/bundles/talent/types/types';

import { MAX_LINKS } from './constants/constants';
import { styles } from './styles';

type Properties = {
    control: Control<SkillsStepDto>;
    errors: FieldErrors<SkillsStepDto>;
    isEditable: boolean;
};

const englishLevels = Object.values(EnglishLevel);
const preferredLanguages = Object.values(PreferredLanguage);
const notConsidered = Object.values(NotConsidered);

const SkillsFormData: React.FC<Properties> = ({
    control,
    errors,
    isEditable,
}) => {
    const { hardSkillsData } = useCommonData();
    const { fields, append, remove } = useFieldArray({
        name: 'projectLinks',
        control,
    });

    return (
        <>
            <FormField
                errorMessage={errors.hardSkills?.message}
                label="Hard Skills"
                name="hardSkills"
                required={isEditable}
            >
                <AutocompleteMultiSelector
                    items={hardSkillsData?.items}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
                />
            </FormField>

            <FormField
                errorMessage={errors.englishLevel?.message?.toString()}
                label="Level of English"
                name="englishLevel"
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={englishLevels}
                    control={control}
                    name="englishLevel"
                    placeholder="Option"
                    isIconShown={isEditable}
                />
            </FormField>

            <FormField
                errorMessage={errors.notConsidered?.message}
                label="I do not consider"
                name="notConsidered"
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="notConsidered"
                    options={notConsidered}
                />
            </FormField>

            <FormField
                errorMessage={errors.preferredLanguages?.message}
                label="Preferred language of communication"
                name="preferredLanguages"
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={preferredLanguages}
                    control={control}
                    name="preferredLanguages"
                    isMultiSelect={true}
                    placeholder="Option"
                    isIconShown={isEditable}
                />
            </FormField>

            <FormField
                errorMessage={errors.projectLinks?.message}
                label="Project links"
                name="projectLinks"
            >
                <View style={styles.links}>
                    {fields.map((field, index) => {
                        const error = errors.projectLinks?.[index]?.url;
                        return (
                            <FormField
                                key={field.id}
                                name={`projectLinks.${index}.url`}
                                errorMessage={error?.message}
                            >
                                <Input
                                    control={control}
                                    name={`projectLinks.${index}.url`}
                                    placeholder={
                                        index === 0
                                            ? 'link to BSA project'
                                            : 'link to your project'
                                    }
                                    marker="www."
                                />
                                {index !== 0 && (
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
            {fields.length < MAX_LINKS && (
                <Button
                    label="Add more links"
                    buttonType={ButtonType.GHOST}
                    iconName={IconName.PLUS}
                    iconSize={20}
                    style={[globalStyles.alignSelfFlexStart, globalStyles.mb25]}
                    onPress={(): void => {
                        append({ url: '' });
                    }}
                />
            )}
        </>
    );
};

export { SkillsFormData };
