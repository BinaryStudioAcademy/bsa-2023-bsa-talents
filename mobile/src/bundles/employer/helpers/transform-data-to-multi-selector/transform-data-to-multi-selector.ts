import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

function transformDataToMultiSelector(
    data: Record<string | number, string>,
): AutocompleteMultiSelectorValue[] {
    return Object.entries(data).map(([value, label]) => ({
        value,
        label,
    }));
}

export { transformDataToMultiSelector };
