type MessageData = {
    userId: string;
    userName: string;
    avatar?: { uri: string };
    lastMessage: string;
    lastMessageDate: string;
};

const imageAvatar =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1695064264~exp=1695064864~hmac=eb1d12fc35d9099271c9530148d45aa9301b83fa2b54c615a3739f8025a4cd95';

const messages: MessageData[] = [
    {
        userId: 'u1',
        userName: 'User1',
        avatar: { uri: imageAvatar },
        lastMessage: 'Message from u1',
        lastMessageDate: '2023-09-18 14:34:40.546+03',
    },
    {
        userId: 'u2',
        userName: 'User2long long longu2 long long long User2long',
        avatar: { uri: imageAvatar },
        lastMessage: 'Message from u2 Message from u2 Message from u2',
        lastMessageDate: '2023-09-18T22:21:20.357Z',
    },
    {
        userId: 'u3',
        userName: 'User3',
        lastMessage: 'Message from u3',
        lastMessageDate: '2023-09-15 14:15:40.546+03',
    },
    {
        userId: 'u4',
        userName: 'User4',
        avatar: { uri: imageAvatar },
        lastMessage: 'Message from u4 - u2',
        lastMessageDate: '2023-09-17 09:20:40.546+03',
    },
    {
        userId: 'u5',
        userName: 'User5',
        avatar: { uri: imageAvatar },
        lastMessage: 'Message from u5',
        lastMessageDate: '2023-08-10 23:30:00.546+03',
    },
];

export { type MessageData, messages };
