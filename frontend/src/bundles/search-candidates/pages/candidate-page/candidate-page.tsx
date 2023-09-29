import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParameters,
    useState,
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
        if (companyId && !candidateDetails) {
            void dispatch(
                candidateSearchActions.getCandidateDetails({
                    userId: userId as string,
                    companyId: companyId,
                }),
            );
            void dispatch(chatActions.getAllChatsByUserId(companyId));
        }
    }, [candidateDetails, companyId, dispatch, userId]);

    const { chats } = useAppSelector(({ chat }) => ({
        chats: chat.chats,
    }));
    const [hasSentAlreadyFirstMessage, setHasSentAlreadyFirstMessage] =
        useState<boolean>(false);
    useEffect(() => {
        const chatWithCandidate = chats.find(
            (chat) => chat.participants.receiver.id == userId,
        );
        if (chatWithCandidate) {
            setHasSentAlreadyFirstMessage(true);
        }
    }, [chats, hasSentAlreadyFirstMessage, userId]);

    return (
        <>
            <BreadCrumbs profileName={candidateDetails?.profileName} />
            {candidateDetails && (
                <CandidateProfile
                    isProfileOpen={candidateDetails.hasSharedContacts}
                    candidateData={candidateDetails}
                    hasSentAlreadyFirstMessage={hasSentAlreadyFirstMessage}
                />
            )}
        </>
    );
};

export { CandidatePage };
