import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

function transformDataToMultiSelector(
    data: Record<string | number, string>,
): AutocompleteMultiSelectorValue[] {
    return Object.entries(data).map(([id, name]) => ({
        id,
        name,
    }));
}

export { transformDataToMultiSelector };
