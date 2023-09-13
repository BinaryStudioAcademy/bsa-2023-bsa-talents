import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    AutocompleteMultiSelector,
    Button,
    FormField,
    Input,
    Pressable,
    ScrollView,
    Selector,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, Color, IconName } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useFieldArray,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    BackFormButton,
    CheckboxGroup,
} from '~/bundles/talent/components/components';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { SkillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    ENGLISH_LEVEL,
    HARD_SKILLS,
    MAX_LINKS,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    skillsStepData: SkillsStepDto | null;
    onSubmit: (payload: SkillsStepDto) => void;
    currentStep: number;
};

const SkillsAndProjectsForm: React.FC<Properties> = ({
    onSubmit,
    skillsStepData,
    currentStep,
}) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: skillsStepData ?? SKILLS_AND_PROJECTS_DEFAULT_VALUES,
        validationSchema: SkillsStepValidationSchema,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'projectLinks',
        control,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <FormField
                errorMessage={errors.hardSkills?.message}
                label="Hard Skills"
                name="hardSkills"
                required
            >
                <AutocompleteMultiSelector
                    items={HARD_SKILLS}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
                />
            </FormField>

            <FormField
                errorMessage={errors.englishLevel?.message?.toString()}
                label="Level of English"
                name="englishLevel"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={ENGLISH_LEVEL}
                    control={control}
                    name="englishLevel"
                    placeholder="Option"
                />
            </FormField>

            <FormField
                errorMessage={errors.notConsidered?.message}
                label="I do not consider"
                name="notConsidered"
                required
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="notConsidered"
                    options={NOT_CONSIDERED}
                />
            </FormField>

            <FormField
                errorMessage={errors.preferredLanguages?.message}
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
                    placeholder="Option"
                />
            </FormField>

            <FormField
                errorMessage={errors.projectLinks?.message}
                label="Project links"
                name="projectLinks"
            >
                <View style={styles.links}>
                    {fields.map((field, index) => {
                        return (
                            <View key={field.id}>
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
                                        <Icon
                                            name={IconName.CLOSE}
                                            size={20}
                                            color={Color.ERROR}
                                        />
                                    </Pressable>
                                )}
                            </View>
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

            <View style={globalStyles.flexDirectionRow}>
                <BackFormButton currentStep={currentStep} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { SkillsAndProjectsForm };
