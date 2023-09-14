import { type ValueOf } from '~/bundles/common/types/types.js';

import { type StepsRoute } from '../../enums/enums.js';

const formatStepLabels = (step: ValueOf<typeof StepsRoute>): string => {
    const UPPERCASE_WORDS = ['bsa', 'cv'];
    const words = new RegExp(UPPERCASE_WORDS.join('|'), 'i');

    return step
        .replaceAll('-', ' ')
        .replace(/^[a-z]/, (m) => m.toUpperCase())
        .replace(words, (m) => m.toUpperCase());
};

export { formatStepLabels };
