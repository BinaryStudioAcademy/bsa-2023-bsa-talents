import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Button,
    Checkbox,
    FormField,
    Input,
    Pressable,
    ScrollView,
    SearchableDropdown,
    Selector,
    Tag,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, Color, IconName } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useFieldArray,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type UserSignUpStep3Dto } from '~/bundles/talent/types/types';
import { signUpStep3ValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    ENGLISH_LEVEL,
    JOB_TITLES,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Item = {
    label: string;
    value: string;
};

type Properties = {
    onSubmit: (payload: UserSignUpStep3Dto) => void;
};

const SkillsAndProjectsForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit, setValue, resetField } = useAppForm({
        defaultValues: SKILLS_AND_PROJECTS_DEFAULT_VALUES,
        validationSchema: signUpStep3ValidationSchema,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'projectLinks',
        control,
    });

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSkillSelect = (skill: Item): void => {
        if (selectedSkills.includes(skill.label)) {
            return;
        }
        setSelectedSkills((previousSkills) => {
            return [...previousSkills, skill.label];
        });
        setValue('hardSkills', [...selectedSkills, skill.label]);
    };

    const handleSkillDelete = (skillLabel: string): void => {
        setSelectedSkills((previousSkills) =>
            previousSkills.filter((skill) => skill != skillLabel),
        );
        resetField('hardSkills');
    };

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();

        // setParams({ stepState: TalentOnboardingStepState.COMPLETED });
        // navigate(TalentOnboardingScreenName.CV_AND_CONTACTS, {
        //     stepState: TalentOnboardingStepState.FOCUSED,
        // });
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <FormField
                errors={errors}
                label="Hard Skills"
                name="hardSkills"
                required
            >
                <SearchableDropdown
                    items={JOB_TITLES}
                    onItemSelect={handleSkillSelect}
                    control={control}
                    name="hardSkills"
                />
                <View
                    style={[
                        globalStyles.mt15,
                        globalStyles.flexDirectionRow,
                        styles.tagContainer,
                    ]}
                >
                    {selectedSkills.map((skill) => (
                        <Tag
                            key={skill}
                            skill={skill}
                            onPress={handleSkillDelete}
                        />
                    ))}
                </View>
            </FormField>

            <FormField
                errors={errors}
                label="Level of English"
                name="englishLevel"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={ENGLISH_LEVEL}
                    control={control}
                    name="englishLevel"
                />
            </FormField>

            <FormField
                errors={errors}
                label="I do not consider"
                name="notConsidered"
                required
                containerStyle={globalStyles.pb25}
            >
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                        styles.notConsiderContainer,
                    ]}
                >
                    {NOT_CONSIDERED.map((option, index) => (
                        <Checkbox
                            key={option.label}
                            label={option.label}
                            name={`notConsidered.${index}`}
                            control={control}
                        />
                    ))}
                </View>
            </FormField>

            <FormField
                errors={errors}
                label="Preferred language of communication"
                name="preferredLanguages"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={PREFERRED_LANGUAGES_ARRAY}
                    control={control}
                    name="preferredLanguages"
                    multiSelect={true}
                />
            </FormField>

            <FormField
                errors={errors}
                label="Project links"
                name="projectLinks"
                containerStyle={globalStyles.pb25}
            >
                <View style={styles.links}>
                    {fields.map((field, index) => {
                        // console.log(field);

                        return (
                            <View key={field.id}>
                                <Input
                                    control={control}
                                    name={`projectLinks.${index}`}
                                    placeholder="link to your project"
                                    marker="www."
                                />
                                <Pressable
                                    style={styles.linksBtn}
                                    onPress={(): void => {
                                        remove(index);
                                    }}
                                >
                                    <Icon
                                        name={IconName.CLOSE}
                                        size={20}
                                        color={Color.ERROR}
                                    />
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
                <Button
                    label="Add more links"
                    buttonType={ButtonType.GHOST}
                    iconName={IconName.PLUS}
                    iconSize={20}
                    style={globalStyles.alignSelfFlexStart}
                    onPress={(): void => {
                        append({ projectLink: '' });
                    }}
                />
            </FormField>

            <View style={globalStyles.flexDirectionRow}>
                <Button
                    label="Back"
                    style={globalStyles.mr10}
                    buttonType={ButtonType.OUTLINE}
                />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { SkillsAndProjectsForm };
