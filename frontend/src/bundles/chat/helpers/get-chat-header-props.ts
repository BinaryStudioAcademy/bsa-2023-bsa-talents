import { UserRole } from 'shared/build/index.js';

import { type ChatResponseDto } from '../types/types.js';

type Return = {
    chatHeaderAvatar: string;
    chatHeaderName: string;
};

const getChatHeaderProperties = ({
    chats,
    selectedId,
    userId,
    userRole,
}: {
    chats: ChatResponseDto[];
    selectedId: string | null;
    userId: string | undefined;
    userRole: string | undefined;
}): Return => {
    const match = chats.find((it) => it.chatId === selectedId);
    const returnObject: Return = {
        chatHeaderAvatar: '',
        chatHeaderName: '',
    };

    if (match) {
        const { receiver, sender } = match.participants;
        const isUserSender = userId === sender.id;
        const partner = isUserSender ? receiver : sender;

        returnObject.chatHeaderAvatar = partner.avatarUrl;
        returnObject.chatHeaderName =
            userRole === UserRole.EMPLOYER
                ? (partner.profileName as string)
                : (partner.fullName as string);
    }

    return returnObject;
};

export { getChatHeaderProperties as getChatHeaderProps };
