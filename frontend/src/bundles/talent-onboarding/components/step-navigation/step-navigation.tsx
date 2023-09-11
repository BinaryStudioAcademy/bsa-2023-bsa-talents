import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useParameters } from '~/bundles/common/hooks/hooks.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

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
        case StepsRoute.STEP_01: {
            return <ProfileStep />;
        }
        case StepsRoute.STEP_02: {
            return <BadgesStep />;
        }
        case StepsRoute.STEP_03: {
            return <SkillsStep />;
        }
        case StepsRoute.STEP_04: {
            return <ContactsCVStep />;
        }
        case StepsRoute.STEP_05: {
            return <Preview />;
        }
        default: {
            return <Navigate to={AppRoute.NOT_FOUND} replace />;
        }
    }
};

export { StepNavigation };
