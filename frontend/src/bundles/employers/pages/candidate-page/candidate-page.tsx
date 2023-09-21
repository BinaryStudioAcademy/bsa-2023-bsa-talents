import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParameters,
} from '~/bundles/common/hooks/hooks.js';
import { actions as candidateSearchActions } from '~/bundles/employers/store/employers.js';
import { type RootReducer } from '~/framework/store/store.js';

import { CandidateProfile } from '../../../talent-onboarding/components/components.js';
import { BreadCrumbs } from '../../components/components.js';

const CandidatePage: React.FC = () => {
    const { userId } = useParameters();

    const dispatch = useAppDispatch();

    const candidateDetails = useAppSelector(
        (state: RootReducer) => state.employer.currentCandidateDetails,
    );
    useEffect(() => {
        if (userId !== candidateDetails?.userId) {
            void dispatch(
                candidateSearchActions.getCandidateDetails({
                    userId,
                }),
            );
        }
    }, [candidateDetails?.userId, dispatch, userId]);
    return (
        <>
            <BreadCrumbs profileName={candidateDetails?.profileName} />
            {candidateDetails && (
                <CandidateProfile
                    isProfileOpen={false}
                    candidateData={candidateDetails}
                />
            )}
        </>
    );
};

export { CandidatePage };
