import { type NavigationProp } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Button,
    FormField,
    Input,
    Pressable,
    ScrollView,
    SearchableDropdown,
    Selector,
    Tag,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    Color,
    IconName,
    TalentOnboardingScreenName,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useFieldArray,
    useNavigation,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { SkillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { CheckboxTypes } from '../components';
import {
    ENGLISH_LEVEL,
    JOB_TITLES,
    NOT_CONSIDERED,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    skillsStepData: SkillsStepDto | null;
    onSubmit: (payload: SkillsStepDto) => void;
};

const SkillsAndProjectsForm: React.FC<Properties> = ({
    onSubmit,
    skillsStepData,
}) => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const { control, errors, handleSubmit, setValue, resetField } = useAppForm({
        defaultValues: skillsStepData ?? SKILLS_AND_PROJECTS_DEFAULT_VALUES,
        validationSchema: SkillsStepValidationSchema,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'projectLinks',
        control,
    });

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleSkillSelect = (skill: string): void => {
        if (selectedSkills.includes(skill)) {
            return;
        }
        setSelectedSkills((previousSkills) => {
            return [...previousSkills, skill];
        });
        setValue('hardSkills', [...selectedSkills, skill]);
    };

    const handleSkillDelete = (skillName: string): void => {
        setSelectedSkills((previousSkills) =>
            previousSkills.filter((skill) => skill != skillName),
        );
        resetField('hardSkills');
    };

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            onSubmit(data);
            navigate(TalentOnboardingScreenName.CV_AND_CONTACTS, {
                stepState: TalentOnboardingStepState.FOCUSED,
            });
        })();
    }, [handleSubmit, navigate, onSubmit]);

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
                <SearchableDropdown
                    items={JOB_TITLES}
                    onItemSelect={handleSkillSelect}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
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
                            value={skill}
                            onPress={handleSkillDelete}
                            iconName={IconName.CLOSE}
                            iconSize={15}
                        />
                    ))}
                </View>
            </FormField>

            <FormField
                errorMessage={errors.englishLevel?.message?.toString()} // message has strange type and I do not how to fix it for now
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
                errorMessage={errors.notConsidered?.message}
                label="I do not consider"
                name="notConsidered"
                required
                containerStyle={globalStyles.pb25}
            >
                <CheckboxTypes
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
                />
            </FormField>

            <FormField
                errorMessage={errors.projectLinks?.message}
                label="Project links"
                name="projectLinks"
                containerStyle={globalStyles.pb25}
            >
                <View style={styles.links}>
                    {fields.map((field, index) => {
                        return (
                            <View key={field.id}>
                                <Input
                                    control={control}
                                    name={`projectLinks.${index}.url`}
                                    placeholder="link to your project"
                                    marker="www."
                                    value={undefined}
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
                        append({ url: '' });
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
