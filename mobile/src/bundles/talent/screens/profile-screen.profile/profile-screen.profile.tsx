import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    Button,
    Loader,
    ScrollView,
} from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ProfileFormData } from '~/bundles/talent/components/profile-form-data/profile-form-data';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { profileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { styles } from './styles';

const ProfileScreenProfile: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);

    const dispatch = useAppDispatch();

    const handleSubmit = (payload: ProfileStepDto): void => {
        void dispatch(
            updateOnboardingData({
                ...payload,
                userId: onboardingData?.userId,
            }),
        );
    };

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    const profileValues = useMemo(() => {
        return {
            profileName: onboardingData?.profileName,
            salaryExpectation: onboardingData?.salaryExpectation,
            jobTitle: onboardingData?.jobTitle,
            location: onboardingData?.location,
            experienceYears: onboardingData?.experienceYears,
            employmentType: onboardingData?.employmentType,
            description: onboardingData?.description,
        } as ProfileStepDto;
    }, [onboardingData]);

    return (
        <>
            {onboardingData ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                >
                    <WithProfileForm
                        validationSchema={profileStepValidationSchema}
                        defaultValue={profileValues}
                        value={profileValues}
                        onSubmit={handleSubmit}
                        isFormEditable={false}
                        formType={TalentFormType.PROFILE_SCREEN}
                        renderedForm={ProfileFormData}
                    />

                    <Button
                        label="Logout"
                        buttonType={ButtonType.OUTLINE}
                        style={[globalStyles.m25, styles.logout]}
                        onPress={handleLogout}
                    />
                </ScrollView>
            ) : (
                <Loader />
            )}
        </>
    );
};

export { ProfileScreenProfile };
