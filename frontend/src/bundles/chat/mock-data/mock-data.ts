const imageAvatar =
    'https://cdn.pixabay.com/photo/2023/07/27/13/37/cottage-8153413_1280.jpg';

const items = [
    { userId: '1', username: 'only apple and id' },
    {
        userId: '2',
        username: 'regular broccoli',
        lastMessage: 'hello again, and again',
        lastMessageDate: '2h',
    },
    {
        userId: '3',
        username: 'Long name dates long name long name',
        lastMessage:
            'long message long message long message long message long message long message long message ',
        lastMessageDate: '21m',
        avatar: imageAvatar,
    },
    { userId: '4', username: 'only name and id4' },
    { userId: '5', username: 'only name and id5' },
    { userId: '6', username: 'only name and id6' },
    { userId: '7', username: 'only name and id7' },
    { userId: '8', username: 'only name and id8' },
];

const messages = [
    {
        id: '1',
        userId: '11',
        value: 'hello',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
    {
        id: '2',
        userId: '11',
        value: 'without avatar',
        avatarUrl: '',
        userFullName: 'lala meme fsdsdf ',
    },
    {
        id: '3',
        userId: 'id',
        value: 'broken avatar link',
        avatarUrl:
            'https://cdn.pixabay.com/phot/2023/07/27/13/37/cottage-8153413_1280.jpg',
        userFullName: 'what?',
    },
    {
        id: '4',
        userId: '11',
        value: 'hello again',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
    {
        id: '5',
        userId: '11',
        value: 'hello again 2567',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
    {
        id: '6',
        userId: '11',
        value: 'hello again 2567567',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
    {
        id: '7',
        userId: '11',
        value: 'hello again 2',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
    {
        id: '8',
        userId: '11',
        value: 'hello again 2',
        avatarUrl: imageAvatar,
        userFullName: 'lala meme',
    },
];

export { items, messages };
