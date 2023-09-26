import React from 'react';
import { type BsaBadgesStepTypes } from 'shared/build/bundles/talent-onboarding/types/bsa-badges-step/bsa-badges-step-types';

import { Loader, View } from '~/bundles/common/components/components';
import { useAppDispatch, useMemo } from '~/bundles/common/hooks/hooks';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { useCommonData } from '~/bundles/common-data/hooks/use-common-data/use-common-data';
import { BadgesFormData } from '~/bundles/talent/components/badges-form-data/badges-form-data';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/talent-form-type/talent-form-type.enum';
import { UNCONTROLLED_BADGES } from '~/bundles/talent/screens/bsa-badges/constants/constants';
import { type BadgesFormDto } from '~/bundles/talent/types/badges-form-dto/badges-form-dto';
import { bsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { BADGES_STEP_DEFAULT_VALUES } from './constants/constants';

const ProfileScreenBadges: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);
    const { badgesData } = useCommonData();

    const dispatch = useAppDispatch();
    const handleSubmit = (payload: BsaBadgesStepTypes): void => {
        // TODO: update handleSubmit after knowing dto from backend
        void dispatch(
            updateOnboardingData({
                ...payload,
                userId: onboardingData?.userId,
            }),
        );
    };

    // TODO: refactor to take values from backend

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

    const badgesFormData: BadgesFormDto =
        onboardingDataValues ?? badgesDataValues;

    return (
        <View>
            {onboardingData?.badges ? (
                <WithProfileForm
                    validationSchema={bsaBadgesStepValidationSchema}
                    defaultValue={badgesFormData}
                    value={badgesFormData}
                    onSubmit={handleSubmit}
                    formType={TalentFormType.PROFILE_SCREEN}
                    renderedForm={BadgesFormData}
                    isFormEditable={false}
                />
            ) : (
                <Loader />
            )}
        </View>
    );
};

export { ProfileScreenBadges };
