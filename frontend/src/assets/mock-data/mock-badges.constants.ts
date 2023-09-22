import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { BsaBadgeType } from '~/bundles/common/enums/badge-types.enum.js';

const mockBadges = [
    {
        id: '1',
        score: 2,
        maxScore: 5,
        description: 'Your average project score',
        type: BsaBadgeType.SERVICE,
        color: BadgeColors.DARK_BLUE,
    },
    {
        id: '2',
        score: 1.5,
        maxScore: 10,
        description: 'Your average lectures score',
        type: BsaBadgeType.SERVICE,
        color: BadgeColors.RED,
    },
    {
        id: '3',
        score: 2.1,
        maxScore: 5,
        description: 'Communication score',
        type: BsaBadgeType.CUSTOM,
        color: BadgeColors.YELLOW,
    },
    {
        id: '4',
        score: 1,
        maxScore: 5,
        description: 'Working with team score',
        type: BsaBadgeType.CUSTOM,
        color: BadgeColors.PURPLE,
    },
    {
        id: '5',
        level: 'B+',
        description: 'Level of English',
        type: BsaBadgeType.SERVICE,
        color: BadgeColors.GREEN,
    },
    {
        id: '6',
        score: 4,
        maxScore: 5,
        description: 'Punctuality',
        type: BsaBadgeType.CUSTOM,
        color: BadgeColors.ORANGE,
    },
];

export { mockBadges };
