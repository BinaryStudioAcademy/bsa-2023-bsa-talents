import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { BSABadgeType } from '~/bundles/lms/enums/enums.js';

const mockBadges = [
    {
        id: '1',
        score: 2,
        level: null,
        maxScore: 5,
        name: 'Your average project score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.DARK_BLUE,
    },
    {
        id: '2',
        score: 1.5,
        level: null,
        maxScore: 10,
        name: 'Your average lectures score',
        type: BSABadgeType.SERVICE,
        color: BadgeColors.RED,
    },
    {
        id: '3',
        score: 2.1,
        level: null,
        maxScore: 5,
        name: 'Communication score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.YELLOW,
    },
    {
        id: '4',
        score: 1,
        level: null,
        maxScore: 5,
        name: 'Working with team score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.PURPLE,
    },
    {
        id: '5',
        score: null,
        level: 'B+',
        maxScore: null,
        name: 'Level of English',
        type: BSABadgeType.SERVICE,
        color: BadgeColors.GREEN,
    },
];

export { mockBadges };
