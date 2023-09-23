import React from 'react';

import { View } from '~/bundles/common/components/components';
import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { getBadgesData } from '~/bundles/common-data/store/actions';
import {
    BsaBadgesForm,
    NewAccountHeader,
} from '~/bundles/talent/components/components';
import { useOnboardingFormSubmit } from '~/bundles/talent/hooks/hooks';
import { type BsaBadgesStepTypes } from '~/bundles/talent/types/types';

const BsaBadges: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();

    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleSubmit = useOnboardingFormSubmit({ stepTitle, stepNumber });

    const handleBadgesSubmit = (payload: BsaBadgesStepTypes): void => {
        // TODO: update handleSubmit after knowing dto from backend
        void handleSubmit(payload);
    };

    useEffect(() => {
        void dispatch(getBadgesData());
    }, [dispatch]);

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <BsaBadgesForm
                onSubmit={handleBadgesSubmit}
                currentStep={stepNumber}
            />
        </View>
    );
};

export { BsaBadges };
