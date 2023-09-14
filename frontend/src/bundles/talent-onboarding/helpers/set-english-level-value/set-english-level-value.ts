import { type ValueOf } from '~/bundles/common/types/types.js';
import { type EnglishLevel } from '~/bundles/talent-onboarding/enums/enums.js';

function setEnglishLevelValue(
    englishLevel: ValueOf<typeof EnglishLevel> | undefined,
): string | undefined {
    return englishLevel ?? '';
}

export { setEnglishLevelValue };
