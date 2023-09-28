import React from 'react';

import { Loader, ScrollView } from '~/bundles/common/components/components';
import {
    useAppDispatch,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import {
    ContactsFormData,
    WithProfileForm,
} from '~/bundles/talent/components/components';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { styles } from '~/bundles/talent/screens/profile-screen.profile/styles';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';
import { cvAndContactsFormValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

const ProfileScreenContacts: React.FC = () => {
    const { onboardingData } = useAppSelector(({ common }) => common);

    const dispatch = useAppDispatch();

    const handleSubmit = (payload: CvAndContactsFormDto): void => {
        void dispatch(
            updateOnboardingData({
                ...payload,
                userId: onboardingData?.userId,
            }),
        );
    };

    const cvAndContactsStepData = useMemo(() => {
        return {
            photo: onboardingData?.photo,
            fullName: onboardingData?.fullName,
            phone: onboardingData?.phone,
            linkedinLink: onboardingData?.linkedinLink,
            cv: onboardingData?.cv,
        } as CvAndContactsFormDto;
    }, [onboardingData]);

    return (
        <>
            {onboardingData ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                >
                    <WithProfileForm
                        defaultValue={cvAndContactsStepData}
                        value={cvAndContactsStepData}
                        onSubmit={handleSubmit}
                        validationSchema={cvAndContactsFormValidationSchema}
                        formType={TalentFormType.PROFILE_SCREEN}
                        renderedForm={ContactsFormData}
                        isFormEditable={false}
                    />
                </ScrollView>
            ) : (
                <Loader />
            )}
        </>
    );
};

export { ProfileScreenContacts };
