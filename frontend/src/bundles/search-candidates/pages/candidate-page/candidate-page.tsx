import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParameters,
} from '~/bundles/common/hooks/hooks.js';
import { actions as candidateSearchActions } from '~/bundles/search-candidates/store/search-candidates.js';

import { CandidateProfile } from '../../../talent-onboarding/components/components.js';
import { BreadCrumbs } from '../../components/components.js';

const CandidatePage: React.FC = () => {
    const { userId } = useParameters();

    const dispatch = useAppDispatch();

    const { candidateDetails, companyId } = useAppSelector(
        ({ searchCandidates, auth }) => ({
            candidateDetails: searchCandidates.currentCandidateDetails,
            companyId: auth.currentUser?.id,
        }),
    );

    useEffect(() => {
        if (userId !== candidateDetails?.userId) {
            void dispatch(
                candidateSearchActions.getCandidateDetails({
                    userId: userId ?? '',
                }),
            );
            void dispatch(
                candidateActions.getContactWithTalent({
                    talentId: userId ?? '',
                    companyId: companyId ?? '',
                }),
            );
        }
    }, [candidateDetails, companyId, dispatch, userId]);
    return (
        <>
            <BreadCrumbs profileName={candidateDetails?.profileName} />
            {candidateDetails && (
                <CandidateProfile
                    isProfileOpen={candidateDetails.hasSharedContacts}
                    candidateData={candidateDetails}
                />
            )}
        </>
    );
};

export { CandidatePage };
