import React from 'react';

import { Loader, ScrollView } from '~/bundles/common/components/components';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { useAppDispatch } from '~/bundles/common/hooks/use-app-dispatch/use-app-dispatch.hook';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { updateOnboardingData } from '~/bundles/common/store/actions';
import { ContactsFormData } from '~/bundles/talent/components/contacts-form-data/contacts-form-data';
import { WithProfileForm } from '~/bundles/talent/components/with-profile-form/with-profile-form';
import { TalentFormType } from '~/bundles/talent/enums/talent-form-type/talent-form-type.enum';
import { styles } from '~/bundles/talent/screens/profile-screen.profile/styles';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/cv-and-contacts-form/cv-and-contacts-form-dto.type';
import { cvAndContactsFormValidationSchema } from '~/bundles/talent/validation-schemas/cv-and-contacts-form/cv-and-contacts-form-validation.schema';

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
