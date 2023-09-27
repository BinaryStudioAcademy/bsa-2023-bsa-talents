import { type ChatParticipantDto } from '~/bundles/chat/types/types';

type Partners = {
    sender: ChatParticipantDto;
    receiver: ChatParticipantDto;
};

type PartnerInfo = {
    partnerName: string;
    partnerAvatar: string;
    partnerId: string;
};

const getPartnerInfo = (
    currentUserId: string,
    partners: Partners,
): PartnerInfo => {
    const { sender, receiver } = partners;

    const isCurrentUserReceiver = currentUserId === receiver.id;
    const targetUser = isCurrentUserReceiver ? sender : receiver;

    const partnerName = targetUser.companyName ?? targetUser.profileName ?? '';
    const partnerAvatar = targetUser.avatarUrl;
    const partnerId = targetUser.id;

    return { partnerName, partnerAvatar, partnerId };
};

export { getPartnerInfo };
