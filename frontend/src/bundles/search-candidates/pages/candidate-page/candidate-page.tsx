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

    const { candidateDetails, companyId, candidateId } = useAppSelector(
        ({ searchCandidates, auth }) => ({
            candidateDetails: searchCandidates.currentCandidateDetails,
            companyId: auth.currentUser?.id,
            candidateId: searchCandidates.currentCandidateDetails?.userId,
        }),
    );

    useEffect(() => {
        const fetchInitialData = async (): Promise<void> => {
            await dispatch(
                candidateSearchActions.getCandidateDetails({
                    userId: userId as string,
                }),
            );
        };

        void fetchInitialData();
    }, [userId, dispatch]);
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (userId !== candidateId) {
                await dispatch(
                    candidateActions.getContactWithTalent({
                        talentId: userId ?? '',
                        companyId: companyId ?? '',
                    }),
                );
            }
        };

        void fetchData();
    }, [candidateDetails?.userId, companyId, dispatch, userId, candidateId]);
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
