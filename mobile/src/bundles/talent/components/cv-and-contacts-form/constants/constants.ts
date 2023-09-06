import { type ContactsCVStepDto } from 'shared/build/bundles/talent-onboarding/talent-onboarding';

const CV_AND_CONTACTS_DEFAULT_VALUES: ContactsCVStepDto = {
    fullName: '',
    phoneNumber: '',
    linkedinProfile: '',
    cv: {
        name: '',
        size: 0,
    },
};

export { CV_AND_CONTACTS_DEFAULT_VALUES };
