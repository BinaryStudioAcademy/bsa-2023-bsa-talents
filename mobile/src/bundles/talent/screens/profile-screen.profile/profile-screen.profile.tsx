import React from 'react';

import { Loader } from '~/bundles/common/components/components';
import {
    useAppDispatch,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { ProfileScreenProfileForm } from '~/bundles/talent/components/components';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

const ProfileScreenProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (payload: ProfileStepDto): void => {
        void dispatch(
            updateOnboardingData({
                ...payload,
                userId: onboardingData?.userId,
            }),
        );
    };

    const { onboardingData } = useAppSelector(({ common }) => common);

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
                <ProfileScreenProfileForm
                    userData={profileValues}
                    onSubmit={handleSubmit}
                />
            ) : (
                <Loader />
            )}
        </>
    );
};

export { ProfileScreenProfile };
