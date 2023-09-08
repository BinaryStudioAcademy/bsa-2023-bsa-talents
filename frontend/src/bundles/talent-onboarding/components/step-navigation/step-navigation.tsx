import { useParameters } from '~/bundles/common/hooks/hooks.js';

import { STEP_ROUTES } from '../../constants/constants.js';
import {
    BadgesStep,
    CandidateProfile,
    ContactsCVStep,
    ProfileStep,
    SkillsStep,
} from '../components.js';

const StepNavigation: React.FC = () => {
    const { step } = useParameters();

    switch (step) {
        case STEP_ROUTES.STEP_01: {
            return <ProfileStep />;
        }
        case STEP_ROUTES.STEP_02: {
            return <BadgesStep />;
        }
        case STEP_ROUTES.STEP_03: {
            return <SkillsStep />;
        }
        case STEP_ROUTES.STEP_04: {
            return <ContactsCVStep />;
        }
        case STEP_ROUTES.STEP_05: {
            return <CandidateProfile isFifthStep />;
        }
    }
};

export { StepNavigation };
