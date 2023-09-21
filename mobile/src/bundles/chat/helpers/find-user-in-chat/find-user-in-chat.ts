//TODO delete when information about the conversation partner is known
import {
    type ChatDataRequestDto,
    type UserInformation,
} from '~/bundles/chat/types/types';

const findUserInChat = (
    chatMessages: ChatDataRequestDto[],
    currentUserId: string,
): UserInformation => {
    const user = chatMessages.find(
        (message) =>
            message.senderId !== currentUserId ||
            message.receiverId !== currentUserId,
    );

    let id: string | undefined,
        avatar: string | undefined,
        name: string | undefined;

    if (user) {
        if (user.senderId === currentUserId) {
            id = user.receiverId;
            avatar = user.receiverAvatar;
            name = user.receiverName;
        } else {
            id = user.senderId;
            avatar = user.senderAvatar;
            name = user.senderName;
        }

        return {
            id,
            avatar,
            name,
        };
    }

    return null;
};

export { findUserInChat };
