import React from 'react';

import { Loader, Text, View } from '~/bundles/common/components/components';
import {
    DataStatus,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppRoute,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/use-common-data/use-common-data';
import { BadgesFormData } from '~/bundles/talent/components/badges-form-data/badges-form-data';
import { NewAccountHeader } from '~/bundles/talent/components/components';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import {
    type BadgesFormDto,
    type BsaBadgesStepTypes,
} from '~/bundles/talent/types/types';
import { bsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    BADGES_STEP_DEFAULT_VALUES,
    UNCONTROLLED_BADGES,
} from './constants/constants';
import { styles } from './styles';

const BsaBadges: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData } = useAppSelector(({ common }) => common);
    const { badgesData, dataStatus } = useCommonData();
    const onboardingDataValues: BadgesFormDto | undefined = useMemo(() => {
        if (onboardingData?.badges) {
            return { badges: onboardingData.badges };
        }
    }, [onboardingData]);

    const badgesDataValues: BadgesFormDto = useMemo(() => {
        if (badgesData?.items) {
            const badges = badgesData.items.map((badge) => ({
                ...badge,
                isChecked: UNCONTROLLED_BADGES.includes(badge.name),
            }));
            return { badges };
        }
        return BADGES_STEP_DEFAULT_VALUES;
    }, [badgesData]);

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const isDataLoading = dataStatus === DataStatus.PENDING;

    const badgesFormData: BadgesFormDto =
        onboardingDataValues ?? badgesDataValues;

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleBadgesSubmit = (payload: BsaBadgesStepTypes): void => {
        // TODO: update handleSubmit after knowing dto from backend
        void handleSubmit(payload);
    };

    return (
        <View style={[globalStyles.flex1, styles.container]}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <Text style={[globalStyles.p15, styles.description]}>
                Choose BSA badges you want to show in your profile
            </Text>
            {isDataLoading ? (
                <Loader />
            ) : (
                <WithProfileForm
                    validationSchema={bsaBadgesStepValidationSchema}
                    defaultValue={BADGES_STEP_DEFAULT_VALUES}
                    value={badgesFormData}
                    onSubmit={handleBadgesSubmit}
                    formType={TalentFormType.ONBOARDING}
                    renderedForm={BadgesFormData}
                    currentStep={stepNumber}
                />
            )}
        </View>
    );
};

export { BsaBadges };
