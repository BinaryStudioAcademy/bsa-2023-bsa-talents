import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useAppRoute, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    ContactsFormData,
    NewAccountHeader,
    WithProfileForm,
} from '~/bundles/talent/components/components';
import { styles } from '~/bundles/talent/components/cv-and-contacts-form/styles';
import { TalentFormType } from '~/bundles/talent/enums/enums';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';
import { cvAndContactsFormValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { CV_AND_CONTACTS_DEFAULT_VALUES } from './constants/constants';

const CVAndContacts: React.FC = () => {
    const { name } = useAppRoute();
    const { onboardingData } = useAppSelector(({ common }) => common);

    const cvAndContactsStepData: CvAndContactsFormDto | null = onboardingData
        ? {
              photo: onboardingData.photo ?? null,
              fullName: onboardingData.fullName ?? '',
              phone: onboardingData.phone ?? '',
              linkedinLink: onboardingData.linkedinLink ?? '',
              cv: onboardingData.cv ?? null,
          }
        : null;

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleCVAndContactsSubmit = (payload: CvAndContactsFormDto): void => {
        void handleSubmit(payload);
    };

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <WithProfileForm
                defaultValue={CV_AND_CONTACTS_DEFAULT_VALUES}
                value={cvAndContactsStepData}
                onSubmit={handleCVAndContactsSubmit}
                validationSchema={cvAndContactsFormValidationSchema}
                formType={TalentFormType.ONBOARDING}
                renderedForm={ContactsFormData}
                currentStep={stepNumber}
            />
            <View
                style={[
                    globalStyles.p15,
                    globalStyles.mb25,
                    globalStyles.borderRadius5,
                    styles.captionContainer,
                ]}
            >
                <Text category={TextCategory.CAPTION}>
                    Job search is anonymous. This information will be seen only
                    in case you share it.
                </Text>
            </View>
        </View>
    );
};

export { CVAndContacts };
