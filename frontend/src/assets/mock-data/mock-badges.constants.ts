import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';

const mockBadges = [
    {
        id: '1',
        score: 2,
        maxScore: 10,
        description: 'Your average project score',
        type: 'service',
        color: BadgeColors.DARK_BLUE,
    },
    {
        id: '2',
        score: 1.5,
        maxScore: 5,
        description: 'Your average lectures score',
        type: 'service',
        color: BadgeColors.RED,
    },
    {
        id: '3',
        score: 2.1,
        maxScore: 4,
        description: 'Communication score',
        type: 'custom',
        color: BadgeColors.YELLOW,
    },
    {
        id: '4',
        score: 1,
        maxScore: 5,
        description: 'Working with team score',
        type: 'custom',
        color: BadgeColors.PURPLE,
    },
    {
        id: '5',
        level: 'B+',
        description: 'Level of English',
        type: 'service',
        color: BadgeColors.GREEN,
    },
    {
        id: '6',
        score: 4,
        maxScore: 5,
        description: 'Punctuality',
        type: 'custom',
        color: BadgeColors.ORANGE,
    },
];

export { mockBadges };
