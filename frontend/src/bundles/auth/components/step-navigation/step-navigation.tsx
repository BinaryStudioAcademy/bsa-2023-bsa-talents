import { useParameters } from '~/bundles/common/hooks/hooks.js';

import { StepRoutes } from '../sign-up-content/constants/constants.js';

const StepNavigation: React.FC = () => {
    const { step } = useParameters();

    // these components only for example how to use it
    // remove them when our real tab components are ready
    const Profile: React.FC = () => <button>Profile</button>;
    const BSABadges: React.FC = () => <button>BSABadges</button>;
    const Skills: React.FC = () => <button>Skills and projects</button>;
    const CV: React.FC = () => <button>CV and contacts</button>;
    const Preview: React.FC = () => <button>Preview</button>;

    switch (step) {
        case StepRoutes.STEP_01: {
            return <Profile />;
        }
        case StepRoutes.STEP_02: {
            return <BSABadges />;
        }
        case StepRoutes.STEP_03: {
            return <Skills />;
        }
        case StepRoutes.STEP_04: {
            return <CV />;
        }
        case StepRoutes.STEP_05: {
            return <Preview />;
        }
    }
};

export { StepNavigation };
