import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

const transformMultiSelectorToDto = (
    selectorValues: AutocompleteMultiSelectorValue[],
): string[] => {
    return selectorValues.map((selector) => selector.value);
};

export { transformMultiSelectorToDto };
