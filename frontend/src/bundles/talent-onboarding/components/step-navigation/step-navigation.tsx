import { useParameters } from '~/bundles/common/hooks/hooks.js';

import { STEP_ROUTES } from '../../constants/constants.js';
import { BsaBadgesStep } from '../components.js';

const StepNavigation: React.FC = () => {
    const { step } = useParameters();

    // these components only for example how to use it
    // remove them when our real tab components are ready
    const Profile: React.FC = () => <button>Profile</button>;
    const Skills: React.FC = () => <button>Skills and projects</button>;
    const CV: React.FC = () => <button>CV and contacts</button>;
    const Preview: React.FC = () => <button>Preview</button>;

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
            return <CV />;
        }
        case STEP_ROUTES.STEP_05: {
            return <Preview />;
        }
    }
};

export { StepNavigation };
