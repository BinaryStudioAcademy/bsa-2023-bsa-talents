import { BadgeColors } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

function getRandomBadgeColor(): ValueOf<typeof BadgeColors> {
    const colors = Object.values(BadgeColors);
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export { getRandomBadgeColor };
