import { BreadCrumbs, CandidateProfile } from '../../components/components.js';

const CandidatePage: React.FC = () => {
    return (
        <>
            <BreadCrumbs />
            <CandidateProfile isProfileOpen />
        </>
    );
};

export { CandidatePage };
