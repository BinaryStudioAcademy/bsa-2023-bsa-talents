import { type NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NotConsidered } from 'shared/build/index';

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
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';

import {
    ENGLISH_LEVEL,
    JOB_TITLES,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Skill = {
    label: string;
};

type Properties = {
    onSubmit: () => void;
};

const SkillsAndProjectsForm: React.FC<Properties> = ({ onSubmit }) => {
    const { navigate, goBack } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: SKILLS_AND_PROJECTS_DEFAULT_VALUES,
    });
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const maxLinks = 3;

    const handleLinkAdd = (): void => {
        if (links.length > maxLinks) {
            return;
        }
        setLinks([...links, '']);
    };

    const handleLinkDelete = (indexToRemove: number): void => {
        setLinks((previousLinks) => {
            const updatedLinks = [...previousLinks];
            const numberToDelete = 1;
            updatedLinks.splice(indexToRemove, numberToDelete);
            return updatedLinks;
        });
    };

    const handleSkillSelect = (skill: Skill): void => {
        if (selectedSkills.includes(skill.label)) {
            return;
        }
        setSelectedSkills([...selectedSkills, skill.label]);
    };

    const handleSkillDelete = (skillLabel: string): void => {
        setSelectedSkills((previousSkills) =>
            previousSkills.filter((skill) => skill != skillLabel),
        );
    };

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
        // setParams({ stepState: TalentOnboardingStepState.COMPLETED });
        navigate(TalentOnboardingScreenName.CV_AND_CONTACTS, {
            stepState: TalentOnboardingStepState.FOCUSED,
        });
    }, [handleSubmit, navigate, onSubmit]);

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
                name="levelOfEnglish"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector options={ENGLISH_LEVEL} />
            </FormField>

            <FormField
                errors={errors}
                label="I do not consider"
                name="notConsider"
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
                    <View style={globalStyles.flex1}>
                        <Checkbox
                            label={NotConsidered.GAMBLING}
                            name="notConsider.gambling"
                            control={control}
                        />
                        <Checkbox
                            label={NotConsidered.GAMEDEV}
                            name="notConsider.gameDev"
                            control={control}
                        />
                    </View>
                    <View style={globalStyles.flex1}>
                        <Checkbox
                            label={NotConsidered.DATING}
                            name="notConsider.dating"
                            control={control}
                        />
                        <Checkbox
                            label={NotConsidered.CRYPTO}
                            name="notConsider.crypto"
                            control={control}
                        />
                    </View>
                </View>
            </FormField>

            <FormField
                errors={errors}
                label="Preferred language of communication"
                name="levelOfEnglish"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector options={PREFERRED_LANGUAGES_ARRAY} />
            </FormField>

            <FormField
                errors={errors}
                label="Project links"
                name="projectLinks"
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="projectLinks"
                    placeholder="link to your project"
                    marker="www."
                />

                <View style={[globalStyles.mt5, styles.links]}>
                    {links.map((_, index) => (
                        <View key={index}>
                            <Input
                                control={control}
                                name="projectLinks2"
                                placeholder="link to your project"
                                marker="www."
                            />
                            <Pressable
                                style={styles.linksBtn}
                                onPress={(): void => {
                                    handleLinkDelete(index);
                                }}
                            >
                                <Icon
                                    name={IconName.CLOSE}
                                    size={20}
                                    color={Color.ERROR}
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
                <Button
                    label="Add more links"
                    buttonType={ButtonType.GHOST}
                    iconName={IconName.PLUS}
                    iconSize={20}
                    style={globalStyles.alignSelfFlexStart}
                    onPress={handleLinkAdd}
                />
            </FormField>

            <View style={globalStyles.flexDirectionRow}>
                <Button
                    label="Back"
                    style={globalStyles.mr10}
                    buttonType={ButtonType.OUTLINE}
                    onPress={(): void => {
                        goBack();
                    }}
                />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { SkillsAndProjectsForm };
