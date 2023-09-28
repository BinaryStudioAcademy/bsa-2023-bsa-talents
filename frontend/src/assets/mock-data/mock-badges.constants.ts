import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { BSABadgeType } from '~/bundles/lms/enums/enums.js';

const mockBadges = [
    {
        id: '1',
        score: 2,
        maxScore: 5,
        description: 'Your average project score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.YELLOW,
    },
    {
        id: '2',
        score: 1.5,
        maxScore: 10,
        description: 'Your average lectures score',
        type: BSABadgeType.SERVICE,
        color: BadgeColors.YELLOW,
    },
    {
        id: '3',
        score: 2.1,
        maxScore: 5,
        description: 'Communication score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.YELLOW,
    },
    {
        id: '4',
        score: 1,
        maxScore: 5,
        description: 'Working with team score',
        type: BSABadgeType.CUSTOM,
        color: BadgeColors.YELLOW,
    },
    {
        id: '5',
        level: 'B+',
        description: 'Level of English',
        type: BSABadgeType.SERVICE,
        color: BadgeColors.YELLOW,
    },
];

export { mockBadges };
