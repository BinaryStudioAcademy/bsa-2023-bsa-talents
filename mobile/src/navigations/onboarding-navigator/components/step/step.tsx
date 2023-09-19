import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    TalentOnboardingStepState,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

import { styles } from './styles';

type StepState = ValueOf<typeof TalentOnboardingStepState>;
type Properties = {
    stepNumber: number;
    stepState: StepState;
    routeName: string;
    onPress: () => void;
};

const Step: React.FC<Properties> = ({
    stepNumber,
    onPress,
    routeName,
    stepState,
}) => {
    const stepIcon = useMemo(() => {
        switch (stepState) {
            case TalentOnboardingStepState.COMPLETED: {
                return {
                    name: IconName.CHECK_CIRCLE,
                    color: Color.PRIMARY,
                    style: styles.activeIcon,
                };
            }
            case TalentOnboardingStepState.FOCUSED: {
                return {
                    name: IconName.CIRCLE_OUTLINE,
                    color: Color.PRIMARY,
                    style: styles.activeIcon,
                };
            }
            default: {
                return {
                    name: IconName.CIRCLE,
                    color: Color.INPUT,
                };
            }
        }
    }, [stepState]);

    const disabled = stepState === TalentOnboardingStepState.DISABLED;

    return (
        <Pressable
            key={stepNumber}
            onPress={onPress}
            disabled={disabled}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.m25,
                styles.singleStep,
            ]}
        >
            <Icon
                name={stepIcon.name}
                color={stepIcon.color}
                size={30}
                style={stepIcon.style}
            />
            <View style={[globalStyles.mr15, styles.textCon]}>
                <Text category={TextCategory.STEP} style={styles.step}>
                    Step 0{stepNumber}
                </Text>
                <Text
                    category={TextCategory.MENU}
                    style={[
                        styles.screenName,
                        (stepState === TalentOnboardingStepState.FOCUSED ||
                            stepState ===
                                TalentOnboardingStepState.COMPLETED) &&
                            styles.activeScreenName,
                    ]}
                >
                    {routeName}
                </Text>
            </View>
        </Pressable>
    );
};

export { Step };
