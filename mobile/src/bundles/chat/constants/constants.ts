//TODO delete mock-data
import { type ChatDataRequestDto } from '~/bundles/chat/types/types';

const FIRST_TALENT_ID = 'talent1';
const FIRST_TALENT_NAME = 'First Talent';
const FIRST_TALENT_AVATAR =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1695064264~exp=1695064864~hmac=eb1d12fc35d9099271c9530148d45aa9301b83fa2b54c615a3739f8025a4cd95';

const SECOND_TALENT_ID = 'talent2';
const SECOND_TALENT_NAME = 'Second Talent';
const SECOND_TALENT_AVATAR =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=1380&t=st=1695169984~exp=1695170584~hmac=9091c0e95eb97e5335a9384e2d77016ed9ed1d3c6777c082bb8dc1a5c5e7abcd';

const EMPLOYER_ID = 'employerId';
const EMPLOYER = 'Facebook';

const chatListItems: Record<string, ChatDataRequestDto[]> | null = {
    'chat1': [
        {
            id: '3',
            senderId: FIRST_TALENT_ID,
            senderName: FIRST_TALENT_NAME,
            senderAvatar: FIRST_TALENT_AVATAR,
            receiverId: EMPLOYER_ID,
            receiverName: EMPLOYER,
            chatId: 'chat1',
            message: `Last message from ${FIRST_TALENT_NAME}`,
            createdAt: '2023-09-19T05:35:45.421Z',
        },
        {
            id: '2',
            senderId: FIRST_TALENT_ID,
            senderName: FIRST_TALENT_NAME,
            senderAvatar: FIRST_TALENT_AVATAR,
            receiverId: EMPLOYER_ID,
            receiverName: EMPLOYER,
            chatId: 'chat1',
            message: `First message from ${FIRST_TALENT_NAME}`,
            createdAt: '2023-09-19T04:35:45.421Z',
        },
        {
            id: '1',
            senderId: EMPLOYER_ID,
            senderName: EMPLOYER,
            receiverId: FIRST_TALENT_ID,
            receiverName: FIRST_TALENT_NAME,
            receiverAvatar: FIRST_TALENT_AVATAR,
            chatId: 'chat1',
            message: `First message from ${EMPLOYER}`,
            createdAt: '2023-09-19T03:35:45.421Z',
        },
    ],
    'chat2': [
        {
            id: '3',
            senderId: EMPLOYER_ID,
            senderName: EMPLOYER,
            receiverId: SECOND_TALENT_ID,
            receiverName: SECOND_TALENT_NAME,
            receiverAvatar: SECOND_TALENT_AVATAR,
            chatId: 'chat2',
            message: `Last message from ${EMPLOYER}`,
            createdAt: '2023-09-20T05:35:45.421Z',
        },
        {
            id: '2',
            senderId: SECOND_TALENT_ID,
            senderName: SECOND_TALENT_NAME,
            senderAvatar: SECOND_TALENT_AVATAR,
            receiverId: EMPLOYER_ID,
            receiverName: EMPLOYER,
            chatId: 'chat2',
            message: `First message from ${SECOND_TALENT_NAME}`,
            createdAt: '2023-09-20T04:35:45.421Z',
        },
        {
            id: '1',
            senderId: EMPLOYER_ID,
            senderName: EMPLOYER,
            receiverId: SECOND_TALENT_ID,
            receiverName: SECOND_TALENT_NAME,
            receiverAvatar: SECOND_TALENT_AVATAR,
            chatId: 'chat2',
            message: `First message from ${EMPLOYER}`,
            createdAt: '2023-09-20T03:35:45.421Z',
        },
    ],
};

const newMessageForChat1 = {
    id: '4',
    senderId: EMPLOYER_ID,
    senderName: EMPLOYER,
    receiverId: FIRST_TALENT_ID,
    receiverName: FIRST_TALENT_NAME,
    receiverAvatar: FIRST_TALENT_AVATAR,
    chatId: 'chat1',
    message: `New message from ${EMPLOYER}`,
};

const newMessageForChat2 = {
    id: '4',
    senderId: SECOND_TALENT_ID,
    senderName: SECOND_TALENT_NAME,
    senderAvatar: SECOND_TALENT_AVATAR,
    receiverId: EMPLOYER_ID,
    receiverName: EMPLOYER,
    chatId: 'chat2',
    message: `New message from ${SECOND_TALENT_NAME}`,
};

export { chatListItems, newMessageForChat1, newMessageForChat2 };
