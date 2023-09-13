const imageAvatar =
    'https://cdn.pixabay.com/photo/2023/07/27/13/37/cottage-8153413_1280.jpg';

const currentUser = {
    id: '3',
    userId: 'id',
    value: 'initial',
    avatarUrl:
        'https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_960_720.jpg',
    userFullName: 'Coconut',
};

const items = [
    {
        userId: '1',
        username: 'only apple and id',
        avatar: 'https://cdn.pixabay.com/photo/2023/09/10/00/49/lovebird-8244066_1280.jpg',
    },
    {
        userId: '2',
        username: 'regular broccoli',
        lastMessage: 'hello again, and again',
        lastMessageDate: '2h',
        avatar: 'https://cdn.pixabay.com/photo/2023/09/10/09/50/squirrel-8244590_1280.jpg',
    },
    {
        userId: '3',
        username: 'Long name dates long name long name',
        lastMessage:
            'long message long message long message long message long message long message long message ',
        lastMessageDate: '21m',
        avatar: imageAvatar,
    },
    {
        userId: '4',
        username: 'only name and id4',
        avatar: 'https://cdn.pixabay.com/photo/2023/08/27/08/20/hiking-8216486_1280.jpg',
    },
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
        userFullName: 'Apple',
    },
    {
        id: '2',
        userId: '11',
        value: 'without avatar',
        avatarUrl: '',
        userFullName: 'Broccoli',
    },
    currentUser,
    {
        id: '4',
        userId: '11',
        value: 'hello again',
        avatarUrl: imageAvatar,
        userFullName: 'Dates Dates',
    },
    {
        id: '5',
        userId: '11',
        value: 'hello again 2567',
        avatarUrl: imageAvatar,
        userFullName: 'Elderberry',
    },
    {
        id: '6',
        userId: '11',
        value: 'hello again 2567567',
        avatarUrl: imageAvatar,
        userFullName: 'Grapefruit',
    },
    {
        id: '7',
        userId: '11',
        value: 'hello again 2',
        avatarUrl: imageAvatar,
        userFullName: 'Kiwi Kiwi',
    },
    {
        id: '8',
        userId: '11',
        value: 'broken avatar image link',
        avatarUrl:
            'https://cdn.pixabay.com/photo/2023/08/27/08/20/hiking6_1280.jpg',
        userFullName: 'Lime Lime',
    },
];

export { currentUser, items, messages };
