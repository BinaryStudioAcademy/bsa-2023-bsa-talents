import {
    EMPLOYER_AVATAR,
    TALENT_AVATAR,
} from '~/bundles/chat/constants/constants';
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
        let index = 0;
        participants.map((participant) => {
            if (!partners[participant.id]) {
                const avatarList = participant.companyName
                    ? EMPLOYER_AVATAR
                    : TALENT_AVATAR;

                const randomIndex = Math.floor(
                    Math.random() * avatarList.length,
                );
                const avatarUrl =
                    index++ < avatarList.length
                        ? avatarList[index]
                        : avatarList[randomIndex];

                partners[participant.id] = avatarUrl;
            }
        });
    });

    return partners;
};

export { setPartnerAvatar };
