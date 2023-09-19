import React from 'react';

import {
    AutocompleteMultiSelector,
    Button,
    CheckboxGroup,
    CommunityIcon,
    FormField,
    Input,
    Pressable,
    ScrollView,
    Selector,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    Color,
    DataStatus,
    IconName,
} from '~/bundles/common/enums/enums';
import { transformDtoValuesToMultiSelector } from '~/bundles/common/helpers/helpers';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useFieldArray,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { getHardSkillsData } from '~/bundles/gather-selected-data/store/actions';
import { OnboardingBackButton } from '~/bundles/talent/components/components';
import { type SkillsStepDto } from '~/bundles/talent/types/types';
import { SkillsStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    ENGLISH_LEVEL,
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
    const dispatch = useAppDispatch();
    const { hardSkillsData, dataStatus } = useAppSelector(
        ({ gatherSelectedData }) => gatherSelectedData,
    );
    const { fields, append, remove } = useFieldArray({
        name: 'projectLinks',
        control,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    useEffect(() => {
        void dispatch(getHardSkillsData());
    }, [dispatch]);

    const isHardSkillLoading = dataStatus === DataStatus.PENDING;
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
                    items={transformDtoValuesToMultiSelector(hardSkillsData)}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
                    isValuesLoading={isHardSkillLoading}
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

            <View style={globalStyles.flexDirectionRow}>
                <OnboardingBackButton currentStep={currentStep} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { SkillsAndProjectsForm };
