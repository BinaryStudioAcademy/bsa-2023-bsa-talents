import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useParameters } from '~/bundles/common/hooks/hooks.js';

import { STEP_ROUTES } from '../../constants/constants.js';
import {
    BadgesStep,
    ContactsCVStep,
    ProfileStep,
    SkillsStep,
} from '../components.js';

const StepNavigation: React.FC = () => {
    const { step } = useParameters();

    const Preview: React.FC = () => <button>Preview</button>;

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
            return <Preview />;
        }
        default: {
            return <Navigate to={AppRoute.NOT_FOUND} replace />;
        }
    }
};

export { StepNavigation };
