import { type ChatResponseDto } from '~/bundles/chat/types/types';

type Partners = Record<string, string>;

const setPartnerAvatar = (
    chats: ChatResponseDto[],
    existingPartners: Partners,
): Partners => {
    const partners: Partners = { ...existingPartners };

    chats.map((chat) => {
        const participants = [
            chat.participants.sender,
            chat.participants.receiver,
        ];
        participants.map((participant) => {
            if (!partners[participant.id]) {
                partners[participant.id] = participant.avatarUrl;
            }
        });
    });

    return partners;
};

export { setPartnerAvatar };
