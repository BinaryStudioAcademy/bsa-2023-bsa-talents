import React from 'react';
import { NotConsidered } from 'shared/build/index';

import {
    Button,
    Checkbox,
    FormField,
    Input,
    ScrollView,
    Selector,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, IconName } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import {
    ENGLISH_LEVEL,
    PREFERRED_LANGUAGES_ARRAY,
    SKILLS_AND_PROJECTS_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: () => void;
};

const SkillsAndProjectsForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: SKILLS_AND_PROJECTS_DEFAULT_VALUES,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
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
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
                />
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
                label="Level of English"
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
                    placeholder="Start typing and select skills"
                    marker="www."
                />
                <Button
                    label="Add more links"
                    buttonType={ButtonType.GHOST}
                    iconName={IconName.PLUS}
                    iconSize={20}
                    style={globalStyles.alignSelfFlexStart}
                />
            </FormField>

            <View style={globalStyles.flexDirectionRow}>
                <Button label="Back" disabled style={globalStyles.mr10} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { SkillsAndProjectsForm };
