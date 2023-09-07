import { useParameters } from '~/bundles/common/hooks/hooks.js';

import { STEP_ROUTES } from '../../constants/constants.js';
import {
    BsaBadgesStep,
    CandidateProfile,
    ContactsCVStep,
} from '../components.js';

const StepNavigation: React.FC = () => {
    const { step } = useParameters();

    // these components only for example how to use it
    //TODO: remove them when our real tab components are ready
    const Profile: React.FC = () => <button>Profile</button>;
    const Skills: React.FC = () => <button>Skills and projects</button>;

    switch (step) {
        case STEP_ROUTES.STEP_01: {
            return <Profile />;
        }
        case STEP_ROUTES.STEP_02: {
            return <BsaBadgesStep />;
        }
        case STEP_ROUTES.STEP_03: {
            return <Skills />;
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
