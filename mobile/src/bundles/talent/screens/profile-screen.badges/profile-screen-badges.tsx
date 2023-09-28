import React from 'react';

import { Loader, View } from '~/bundles/common/components/components';
import {
    useAppDispatch,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type BsaBadgesStepTypes } from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import {
    BadgesFormData,
    WithProfileForm,
} from '~/bundles/talent/components/components';
import {
    BsaBadgesStepUncontrolledBadges,
    TalentFormType,
} from '~/bundles/talent/enums/enums';
import { type BadgesFormDto } from '~/bundles/talent/types/types';
import { bsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { BADGES_STEP_DEFAULT_VALUES } from './constants/constants';

const uncontrolledBadges = Object.values(BsaBadgesStepUncontrolledBadges);

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
                isChecked: uncontrolledBadges.includes(badge.name),
            }));
            return { badges };
        }
        return BADGES_STEP_DEFAULT_VALUES;
    }, [badgesData]);

    const badgesFormData: BadgesFormDto =
        onboardingDataValues ?? badgesDataValues;

    return (
        <View style={globalStyles.flex1}>
            {onboardingData ? (
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
