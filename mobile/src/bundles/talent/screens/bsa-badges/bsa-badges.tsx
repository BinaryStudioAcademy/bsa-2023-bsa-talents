import { type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { type BadgeStepDto } from 'shared/build/bundles/talent-onboarding/types/badge-step-dto';

import {
    DEFAULT_VALUE_IS_CHECKED,
    DEFAULT_VALUE_IS_DISABLED,
} from '~/bundles/common/components/badge/constants/constants';
import {
    Badge,
    Button,
    Checkbox,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TalentOnboardingStepState,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppForm,
    useAppRoute,
    useAppSelector,
    useCallback,
    useNavigation,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import {
    type TalentOnboardingNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import { NewAccountHeader } from '~/bundles/talent/components/components';
import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';
import { actions as talentActions } from '~/bundles/talent/store';

import { styles } from './styles';

const values = Object.values(BsaBadgeStepBadgesTitle);

const BsaBadges: React.FC = () => {
    const { badgesStepData } = useAppSelector(({ talents }) => talents);

    const { handleSubmit } = useAppForm<BadgeStepDto>({
        defaultValues: badgesStepData ?? DEFAULT_VALUE_IS_CHECKED,
    });
    const dispatch = useAppDispatch();
    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit((payload): void => {
            void dispatch(talentActions.completeBadgesStep(payload));
        })();
        navigate(TalentOnboardingScreenName.SKILLS_AND_PROJECTS, {
            stepState: TalentOnboardingStepState.FOCUSED,
        });
    }, [dispatch, handleSubmit, navigate]);

    const handlePreviousPress = useCallback((): void => {
        void handleSubmit((payload): void => {
            void dispatch(talentActions.completeBadgesStep(payload));
        })();
        navigate(TalentOnboardingScreenName.PROFILE, {
            stepState: TalentOnboardingStepState.FOCUSED,
        });
    }, [handleSubmit, navigate, dispatch]);

    const [checkedBadges, setCheckedBadges] = useState(
        DEFAULT_VALUE_IS_CHECKED,
    );
    const handleToggleBadge = (
        badge: ValueOf<typeof BsaBadgeStepBadgesTitle>,
    ): void => {
        setCheckedBadges((previousChecked) => ({
            ...previousChecked,
            [badge]: !previousChecked[badge],
        }));
    };

    const renderBadges = values.map((badge) => (
        <View
            key={badge}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
            ]}
        >
            <Checkbox
                isChecked={checkedBadges[badge]}
                onChange={(): void => {
                    handleToggleBadge(badge);
                }}
                disabled={DEFAULT_VALUE_IS_DISABLED[badge]}
            />
            <Badge badgeType={badge} />
        </View>
    ));

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ScrollView style={globalStyles.ph25}>
                <Text
                    category={TextCategory.BODY1}
                    style={[globalStyles.pv15, styles.description]}
                >
                    Choose BSA badges you want to show in your profile
                </Text>
                <View>{renderBadges}</View>
                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.mv20]}
                >
                    <Button
                        style={globalStyles.mr10}
                        label="Back"
                        buttonType={ButtonType.OUTLINE}
                        onPress={handlePreviousPress}
                    />
                    <Button label="Next" onPress={handleFormSubmit} />
                </View>
            </ScrollView>
        </View>
    );
};

export { BsaBadges };
