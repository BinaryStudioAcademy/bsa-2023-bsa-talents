//TODO delete mock-data
import { type ChatData } from '~/bundles/employer/types/types';

const imageAvatar1 =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1695064264~exp=1695064864~hmac=eb1d12fc35d9099271c9530148d45aa9301b83fa2b54c615a3739f8025a4cd95';
const imageAvatar2 =
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=1380&t=st=1695169984~exp=1695170584~hmac=9091c0e95eb97e5335a9384e2d77016ed9ed1d3c6777c082bb8dc1a5c5e7abcd';

const listItems: ChatData[] = [
    {
        talentId: 'u1',
        talentName: 'Talent Name 1',
        talentAvatar: imageAvatar1,
        data: [
            {
                message: 'Last Message from u1',
                createdAt: '2023-09-20T03:35:45.421Z',
            },
            {
                message: 'Third Message from u1',
                createdAt: '2023-09-20T02:35:45.421Z',
            },
            {
                message: 'Second Message from u1',
                createdAt: '2023-09-20T01:35:45.421Z',
            },
            {
                message: 'First Message from u1',
                createdAt: '2023-09-20T00:35:45.421Z',
            },
        ],
    },
    {
        talentId: 'u2',
        talentName: '2 Talent Full Long Name and Surname',
        talentAvatar: imageAvatar2,
        data: [
            {
                message: 'Last Message from u2',
                createdAt: '2023-09-19T03:35:45.421Z',
            },
            {
                message: 'Third Message from u2',
                createdAt: '2023-09-19T02:35:45.421Z',
            },
            {
                message: 'Second Message from u2',
                createdAt: '2023-09-19T01:35:45.421Z',
            },
            {
                message: 'First Message from u2',
                createdAt: '2023-09-19T00:35:45.421Z',
            },
        ],
    },
    {
        talentId: 'u3',
        talentName: 'Talent Full Name 3',
        data: [
            {
                message: 'Last Message from u3',
                createdAt: '2023-09-19T20:35:45.421Z',
            },
            {
                message: 'Third Message from u3',
                createdAt: '2023-09-19T19:35:45.421Z',
            },
            {
                message: 'Second Message from u3',
                createdAt: '2023-09-19T15:35:45.421Z',
            },
            {
                message: 'First Message from u3',
                createdAt: '2023-09-19T10:35:45.421Z',
            },
        ],
    },
    {
        talentId: 'u4',
        talentName: 'Talent Name 4',
        talentAvatar: imageAvatar2,
        data: [
            {
                message: 'Last Message from u4',
                createdAt: '2023-09-20T00:01:45.421Z',
            },
            {
                message: 'Third Message from u4',
                createdAt: '2023-09-19T10:01:45.421Z',
            },
            {
                message: 'Second Message from u4',
                createdAt: '2023-09-18T10:01:45.421Z',
            },
            {
                message: 'First Message from u4',
                createdAt: '2023-09-17T10:01:45.421Z',
            },
        ],
    },
    {
        talentId: 'u5',
        talentName: 'Talent Name 5',
        talentAvatar: imageAvatar1,
        data: [
            {
                message: 'Last Message from u5',
                createdAt: '2023-08-17T10:01:45.421Z',
            },
            {
                message: 'Third Message from u5',
                createdAt: '2023-08-16T10:01:45.421Z',
            },
            {
                message: 'Second Message from u5',
                createdAt: '2023-08-15T10:01:45.421Z',
            },
            {
                message: 'First Message from u5',
                createdAt: '2023-08-14T10:01:45.421Z',
            },
        ],
    },
];

export { listItems };
