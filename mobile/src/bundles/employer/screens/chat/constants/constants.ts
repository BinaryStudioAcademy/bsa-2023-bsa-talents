import { type ChatListItemType } from '~/bundles/employer/types/types';

const imageAvatar =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1695064264~exp=1695064864~hmac=eb1d12fc35d9099271c9530148d45aa9301b83fa2b54c615a3739f8025a4cd95';

const listItems: ChatListItemType[] = [
    {
        userId: 'u1',
        username: 'User1',
        avatar: imageAvatar,
        lastMessage: 'Message from u1',
        lastMessageDate: '2023-09-19 20:17:00.284+03',
    },
    {
        userId: 'u2',
        username: 'User2long long longu2 long long long User2long',
        avatar: imageAvatar,
        lastMessage: 'Message from u2 Message from u2 Message from u2',
        lastMessageDate: '2023-09-19 20:12:00.357Z',
    },
    {
        userId: 'u3',
        username: 'User3',
        lastMessage: 'Message from u3',
        lastMessageDate: '2023-09-19 19:44:00.284',
    },
    {
        userId: 'u4',
        username: 'User4',
        avatar: imageAvatar,
        lastMessage: 'Message from u4 - u2',
        lastMessageDate: '2023-09-17 09:20:40.546+03',
    },
    {
        userId: 'u5',
        username: 'User5',
        avatar: imageAvatar,
        lastMessage: 'Message from u5',
        lastMessageDate: '2023-08-10 23:30:00.546+03',
    },
];

export { listItems };
